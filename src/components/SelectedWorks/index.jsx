import React, { useState } from 'react';
import styles from './index.module.scss';
import SpotlightCard from '../SpotlightCard';
import ScrollStack, { ScrollStackItem } from '../ScrollStack';
import CircularGallery from '../CircularGallery';
import Folder from './Folder';

const SelectedWorks = () => {
  const [isWeilanOpen, setIsWeilanOpen] = useState(false);
  const [isHuataiOpen, setIsHuataiOpen] = useState(false);
  const [isXinweiOpen, setIsXinweiOpen] = useState(false);
  const [visualProject, setVisualProject] = useState(null);

  const weilanImages = [
    '/image/projects/weilan/1.png',
    '/image/projects/weilan/2.png',
    '/image/projects/weilan/3.png',
    '/image/projects/weilan/4.png',
    '/image/projects/weilan/5.png',
    '/image/projects/weilan/6.png',
    '/image/projects/weilan/7.png',
    '/image/projects/weilan/8.png',
    '/image/projects/weilan/9.png',
    '/image/projects/weilan/10.png',
    '/image/projects/weilan/11.png',
    '/image/projects/weilan/12.png',
    '/image/projects/weilan/13.png',
  ];

  const huataiImages = [
    { image: '/image/projects/huatai/1.png', text: '全链路提升目标用户购买产品便捷度' },
    { image: '/image/projects/huatai/2.png', text: '放大用户触发点·提升用户购买便捷度' },
    { image: '/image/projects/huatai/3.png', text: '流程和提示词结合驱动用户体验' },
    { image: '/image/projects/huatai/4.png', text: '布局清晰·信息降噪' },
    { image: '/image/projects/huatai/5.png', text: '探索如何打通账户体系' },
    { image: '/image/projects/huatai/6.jpg', text: '项目通览' },
  ];

  const xinweiImages = [
    { image: '/image/projects/xinwei/1.png', text: '芯位蜜线项目概览' },
    { image: '/image/projects/xinwei/2.png', text: '核心功能展示' },
    { image: '/image/projects/xinwei/3.png', text: '用户体验设计' },
    { image: '/image/projects/xinwei/4.png', text: '界面视觉细节' },
    { image: '/image/projects/xinwei/5.png', text: '交互流程演示' },
  ];

  const zhangleImages = [
    { image: '/image/projects/visual/zhangle/1.png', text: '涨乐趣味版' },
    { image: '/image/projects/visual/zhangle/2.png', text: '设计策略' },
    { image: '/image/projects/visual/zhangle/3.png', text: '趣味版内容展示' },
    { image: '/image/projects/visual/zhangle/4.png', text: '视觉强化' },
  ];

  const cainiaoImages = [
    { image: '/image/projects/visual/cainiao/1.png', text: '菜鸟家邮' },
    { image: '/image/projects/visual/cainiao/2.png', text: '玩法策略' },
    { image: '/image/projects/visual/cainiao/3.png', text: '视觉定义' },
    { image: '/image/projects/visual/cainiao/4.png', text: '策略推导' },
    { image: '/image/projects/visual/cainiao/5.png', text: '视觉营造沉浸式活动氛围' },
  ];

  const piliangImages = [
    { image: '/image/projects/visual/piliang/1.png', text: '涨乐批量海报模版' },
    { image: '/image/projects/visual/piliang/2.png', text: '视觉策略' },
    { image: '/image/projects/visual/piliang/3.png', text: '趣味版内容展示' },
    { image: '/image/projects/visual/piliang/4.png', text: '视觉强化' },
    { image: '/image/projects/visual/piliang/5.png', text: '海报模版展示' },
  ];

  const visualProjects = {
    zhangle: zhangleImages,
    cainiao: cainiaoImages,
    piliang: piliangImages,
  };

  return (
    <div className={styles.frame} id="works">
      <ScrollStack 
        isOpen={isWeilanOpen} 
        onClose={() => setIsWeilanOpen(false)}
        itemStackDistance={30}
        itemDistance={600}
        stackPosition="10%"
        baseScale={0.85}
        itemScale={0.03}
      >
        {weilanImages.map((src, index) => (
          <ScrollStackItem key={index}>
            <img src={src} alt={`蔚蓝官网项目详情 ${index + 1}`} />
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <CircularGallery 
        isOpen={isXinweiOpen} 
        onClose={() => setIsXinweiOpen(false)}
        items={xinweiImages}
        bend={1}
        borderRadius={0.05}
        scrollSpeed={2}
        scrollEase={0.05}
        textColor="#ffffff"
      />

      <CircularGallery 
        isOpen={isHuataiOpen} 
        onClose={() => setIsHuataiOpen(false)}
        items={huataiImages}
        bend={1}
        borderRadius={0.05}
        scrollSpeed={2}
        scrollEase={0.05}
        textColor="#ffffff"
      />

      <CircularGallery 
        isOpen={!!visualProject} 
        onClose={() => setVisualProject(null)}
        items={visualProject ? visualProjects[visualProject] : []}
        bend={1}
        borderRadius={0.05}
        scrollSpeed={2}
        scrollEase={0.05}
        textColor="#ffffff"
      />

      <div className={styles.frame24}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: '220px' }}>
          <div>
            <p className={styles.text}>精选作品</p>
            <p className={styles.text2}>
              以设计传递价值，用体验建立信任，创造有温度的数字产品
            </p>
          </div>
          <Folder 
            color="#5227FF" 
            size={1.2} 
            items={[
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="pdf-content" onClick={(e) => e.stopPropagation()}>
                <svg className="pdf-icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span className="pdf-text">简历.pdf</span>
              </a>,
              <a href="/portfolio.pdf" target="_blank" rel="noopener noreferrer" className="pdf-content" onClick={(e) => e.stopPropagation()}>
                <svg className="pdf-icon" viewBox="0 0 24 24">
                  <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
                </svg>
                <span className="pdf-text">作品集.pdf</span>
              </a>
            ]}
          />
        </div>
      </div>
      <div className={styles.frame25} id="experience">
        <div className={styles.rectangle42} />
        <p className={styles.text3}>体验设计</p>
      </div>
      <div className={styles.autoWrapper3}>
        <SpotlightCard 
          className={styles.rectangle43} 
          spotlightColor="rgba(161, 158, 255, 0.2)"
          onClick={() => setIsWeilanOpen(true)}
        >
          <img src="/image/mmaqcz5u-qomtbat.png" className={styles.rectangle46} />
          <div className={styles.frame1940698174}>
            <div className={styles.frame1940697900}>
              <div className={styles.frame1940697901}>
                <p className={styles.kR2}>蔚蓝科技</p>
              </div>
            </div>
            <div className={styles.frame1940697889}>
              <div className={styles.frame1940697897}>
                <div className={styles.rectangle346241347} />
                <div className={styles.rectangle346241348} />
                <div className={styles.rectangle346241348} />
                <div className={styles.rectangle346241348} />
                <div className={styles.rectangle346241347} />
              </div>
              <p className={styles.text4}>蔚蓝官网</p>
              <img src="/image/mmaqcz5p-vljdwrf.svg" className={styles.union} />
              <div className={styles.autoWrapper}>
                <div className={styles.frame1940697898}>
                  <div className={styles.rectangle346241347} />
                  <div className={styles.rectangle346241348} />
                  <div className={styles.rectangle346241348} />
                  <div className={styles.rectangle346241348} />
                  <div className={styles.rectangle346241347} />
                </div>
              </div>
            </div>
            <p className={styles.text5}>
              官网集成了一系列主打产品的入口，构建丰富且高效的品牌体验。品牌核心价值与形象的透出，能让品牌与产品极具传播力和感染力。
            </p>
          </div>
        </SpotlightCard>
        <div className={styles.autoWrapper2}>
          <SpotlightCard 
            className={styles.rectangle44} 
            spotlightColor="rgba(161, 158, 255, 0.2)"
            onClick={() => setIsXinweiOpen(true)}
          >
            <img src="/image/mmaqcz5u-0xd4167.png" className={styles.rectangle47} />
            <div className={styles.frame19406981742}>
              <div className={styles.frame19406979012}>
                <p className={styles.kR2}>芯位科技</p>
              </div>
              <div className={styles.frame19406978892}>
                <div className={styles.frame1940697897}>
                  <div className={styles.rectangle346241347} />
                  <div className={styles.rectangle346241348} />
                  <div className={styles.rectangle346241348} />
                  <div className={styles.rectangle346241348} />
                  <div className={styles.rectangle346241347} />
                </div>
                <p className={styles.text4}>芯位蜜线</p>
                <img src="/image/mmaqcz5p-vljdwrf.svg" className={styles.union} />
                <div className={styles.autoWrapper}>
                  <div className={styles.frame1940697898}>
                    <div className={styles.rectangle346241347} />
                    <div className={styles.rectangle346241348} />
                    <div className={styles.rectangle346241348} />
                    <div className={styles.rectangle346241348} />
                    <div className={styles.rectangle346241347} />
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
          <SpotlightCard 
            className={styles.rectangle45} 
            spotlightColor="rgba(161, 158, 255, 0.2)"
            onClick={() => setIsHuataiOpen(true)}
          >
            <img src="/image/mmaqcz5u-cr4f612.png" className={styles.rectangle48} />
            <div className={styles.frame19406981743}>
              <div className={styles.frame19406979013}>
                <p className={styles.kR2}>华泰证券</p>
              </div>
              <div className={styles.frame19406978892}>
                <div className={styles.frame1940697897}>
                  <div className={styles.rectangle346241347} />
                  <div className={styles.rectangle346241348} />
                  <div className={styles.rectangle346241348} />
                  <div className={styles.rectangle346241348} />
                  <div className={styles.rectangle346241347} />
                </div>
                <p className={styles.text4}>跨境理财通</p>
                <img src="/image/mmaqcz5p-vljdwrf.svg" className={styles.union} />
                <div className={styles.autoWrapper}>
                  <div className={styles.frame1940697898}>
                    <div className={styles.rectangle346241347} />
                    <div className={styles.rectangle346241348} />
                    <div className={styles.rectangle346241348} />
                    <div className={styles.rectangle346241348} />
                    <div className={styles.rectangle346241347} />
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
      <div className={styles.frame1940698176} id="visual">
        <div className={styles.rectangle42} />
        <p className={styles.text3}>视觉设计</p>
      </div>
      <div className={styles.autoWrapper5}>
          <SpotlightCard 
            spotlightColor="rgba(161, 158, 255, 0.25)"
            onClick={() => setVisualProject('zhangle')}
          >
            <img src="/image/mmbyyuxr-yapx8wg.png" className={styles.maskGroup} />
          </SpotlightCard>
          <div className={styles.autoWrapper4}>
            <SpotlightCard 
              spotlightColor="rgba(161, 158, 255, 0.25)"
              onClick={() => setVisualProject('cainiao')}
            >
              <img src="/image/mmbyyuxr-43y2jv4.png" className={styles.maskGroup2} />
            </SpotlightCard>
            <SpotlightCard 
              spotlightColor="rgba(161, 158, 255, 0.25)"
              onClick={() => setVisualProject('piliang')}
            >
              <img src="/image/mmbyyuxr-9ekcal8.png" className={styles.maskGroup3} />
            </SpotlightCard>
          </div>
        </div>
    </div>
  );
}

export default SelectedWorks;
