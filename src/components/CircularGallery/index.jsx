
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { playMechanicalSound } from '../../utils/audio';
import styles from './index.module.scss';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(gl, text, font = 'bold 30px monospace', color = 'black') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.01) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.1;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true
    });
    this.program = new Program(this.gl, {
      depthTest: true,
      depthWrite: false, // Set to false for transparent objects
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform float uOpacity;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) { 
           vec2 d = abs(p) - b; 
           return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r; 
         } 

        void main() {
          // No more cover logic, we want the full image
          vec4 color = texture2D(tMap, vUv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius); 
          float edgeSmooth = 0.002; 
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d); 
          
          if (alpha < 0.01) discard; // Discard fully transparent pixels
           
          gl_FragColor = vec4(color.rgb, alpha * uOpacity);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
        uOpacity: { value: 1.0 }
      },
      transparent: true
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      this.onResize(); // Adjust scale when image loads
    };
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    });
  }
  update(scroll, direction) {
    // Calculate angle based on scroll position (treating scroll as distance along circumference)
    // angle = baseAngle - (scroll / radius)
    // We add a small offset to align the first item correctly if needed
    const scrollAngle = scroll.current / this.radius;
    const angle = this.baseAngle - scrollAngle;

    // Cylindrical coordinates
    // x = R * sin(theta)
    // z = R * cos(theta) - R (offset to bring front to z=0 if desired, or just center at 0)
    // Let's center the cylinder at z = 0, so items revolve around (0,0,0)
    // But we want the "front" item to be closer to camera?
    // Camera is at z=20.
    // If we use standard: x = R*sin(a), z = R*cos(a).
    // At a=0, z=R (Closest). At a=PI, z=-R (Farthest).
    
    this.plane.position.x = this.radius * Math.sin(angle);
    this.plane.position.z = this.radius * Math.cos(angle);
    this.plane.position.y = 0; // Keep vertically centered

    // Rotate plane to face outward (or inward)
    // Normal of plane is +Z. 
    // At angle 0, we want normal pointing to +Z.
    // So rotation.y = angle?
    // If angle=0, rot=0. Normal=+Z. Correct.
    this.plane.rotation.y = angle;
    this.plane.rotation.z = 0; // Reset z rotation (no tilt)

    // Opacity logic to prevent overlap
    // Calculate normalized angle in range [0, 2PI] or [-PI, PI]
    // The item at the "back" (farthest z) should be invisible or lower opacity if overlapping
    // Cos(angle) gives us the z-depth relative to radius.
    // Cos(0) = 1 (Front), Cos(PI) = -1 (Back)
    const zDepth = Math.cos(angle);
    // If zDepth is less than some threshold (e.g., -0.5), it's in the back half
    // But OGL handles depth testing usually.
    // The issue might be transparency sorting or draw order if alpha is involved.
    // We can manually adjust opacity based on z-depth to fade out back items.
    
    // Simple fade out at the back
    // Map zDepth [-1, 1] to opacity [0, 1] maybe?
    // Or just let depth buffer handle it if opaque.
    // Since we use transparency (alpha < 0.01 discard), depth write is false.
    // So sorting matters.
    
    // Force opacity fade for items at the back
     // const opacity = (zDepth + 1) / 2; // 0 at back, 1 at front // Removed duplicate
     // Apply to uniform if we had one for opacity, but we can't easily without modifying shader.
     // Alternatively, move back items WAY back or disable them?
    
    // Actually, simply shifting the Z position of the back items slightly more might help z-fighting?
    // Or, ensure the loop doesn't overlap exactly?
    // If it's a perfect circle, they shouldn't overlap unless the radius is too small for the width.
    
    // Let's check radius calculation.
    // radius = circumference / 2PI. circumference = width * length.
    // So they should just touch edges.
    // If we want a gap, we added padding.
    
    // If they overlap visually in 2D projection, the one in front (higher z) should win.
    // With depthWrite: false, the order of drawing matters.
    // OGL/WebGL draws in order of the scene graph usually unless sorted.
    // We can manually set `renderOrder` or `z-index`? OGL has `renderOrder`.
    // Let's set renderOrder based on Z position.
    
    // Use a larger multiplier for renderOrder to ensure distinct sorting values
    // Also update opacity based on depth to fade out back items
    this.plane.renderOrder = this.plane.position.z * 100;
    
    // Calculate normalized depth from -1 (back) to 1 (front)
     // cos(angle) ranges from -1 to 1
     // const zDepth = Math.cos(angle); // Removed duplicate declaration
     
     // Set opacity: full opacity at front, partial opacity at back
     // range: 0.2 (back) to 1.0 (front)
     const opacity = 0.2 + 0.8 * ((zDepth + 1) / 2);
     this.plane.program.uniforms.uOpacity.value = opacity;

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    // Infinite loop is handled by sin/cos naturally
  }
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    
    // Size calculation
    this.scale = this.screen.height / 1500;
    let planeWidth = 280 * this.scale;
    let planeHeight = 460 * this.scale;

    const imgSize = this.program.uniforms.uImageSizes.value;
    if (imgSize[0] > 0 && imgSize[1] > 0) {
      const imgAspect = imgSize[0] / imgSize[1];
      if (imgAspect > 1) { // Landscape
         planeWidth = planeHeight * imgAspect;
         if (planeWidth > this.screen.width * 0.25) {
            planeWidth = this.screen.width * 0.25;
            planeHeight = planeWidth / imgAspect;
         }
      } else { // Portrait
         planeHeight = planeWidth / imgAspect;
         if (planeHeight > this.screen.height * 0.45) {
            planeHeight = this.screen.height * 0.45;
            planeWidth = planeHeight * imgAspect;
         }
      }
    }

    this.plane.scale.y = (this.viewport.height * planeHeight) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * planeWidth) / this.screen.width;
    
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    
    // Calculate Circumference and Radius for uniform distribution
    // We want some gap. Let's define the width allocation per item.
    // User wants "4 items on screen". 
    // So 4 * allocatedWidth = viewport.width (roughly).
    // Let's rely on the item width + padding.
    
    this.padding = this.plane.scale.x * 0.5; // Reduce padding to 0.5x width (reasonable gap)
    this.width = this.plane.scale.x + this.padding;
    
    // Total circumference for ALL items
    // If we want them to form a COMPLETE circle:
    this.circumference = this.width * this.length;
    
    // Radius of the cylinder
    this.radius = this.circumference / (2 * Math.PI);
    
    // Base angle for this item
    this.baseAngle = (this.index / this.length) * 2 * Math.PI;
    
    // Adjust Text Position (move it out in Z slightly so it doesn't clip?)
    // Title class handles local position. It should be fine as child of plane.
  }
}

class App {
  constructor(
    container,
    {
      items,
      bend,
      textColor = '#ffffff',
      borderRadius = 0,
      font = 'bold 30px Figtree',
      scrollSpeed = 2,
      scrollEase = 0.05
    } = {}
  ) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }
  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const galleryItems = items && items.length ? items : [];
    this.mediasImages = galleryItems; // Removed .concat(galleryItems)
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
    });
  }
  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }
  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }
  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }
  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }
  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    if (!this.container) return;
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('mousewheel', this.boundOnWheel);
    window.addEventListener('wheel', this.boundOnWheel);
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove', this.boundOnTouchMove);
    window.addEventListener('touchend', this.boundOnTouchUp);
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('mousewheel', this.boundOnWheel);
    window.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  isOpen,
  onClose,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  scrollSpeed = 2,
  scrollEase = 0.05
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const app = new App(containerRef.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase });
    return () => {
      app.destroy();
    };
  }, [isOpen, items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.closeButtonContainer}>
        <div className={styles.frame7} onClick={onClose} onMouseEnter={() => playMechanicalSound()}>
          <div className={styles.overlayButton}>
            <div className={`${styles.corner} ${styles.topLeft}`}>
              <div className={styles.focusLineH} />
              <div className={styles.focusLineV} />
              <div className={styles.accentLineH} />
              <div className={styles.accentLineV} />
            </div>
            <div className={`${styles.corner} ${styles.bottomLeft}`}>
              <div className={styles.focusLineH} />
              <div className={styles.focusLineV} />
              <div className={styles.accentLineH} />
              <div className={styles.accentLineV} />
            </div>
            <div className={`${styles.corner} ${styles.topRight}`}>
              <div className={styles.focusLineH} />
              <div className={styles.focusLineV} />
              <div className={styles.accentLineH} />
              <div className={styles.accentLineV} />
            </div>
            <div className={`${styles.corner} ${styles.bottomRight}`}>
              <div className={styles.focusLineH} />
              <div className={styles.focusLineV} />
              <div className={styles.accentLineH} />
              <div className={styles.accentLineV} />
            </div>
          </div>
          <p className={styles.buttonText}>关闭预览</p>
        </div>
      </div>
      
      <div className={styles.galleryContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.circularGallery} ref={containerRef} />
      </div>
    </div>,
    document.body
  );
}
