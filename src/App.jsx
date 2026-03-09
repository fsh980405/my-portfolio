import React from 'react';
import Hero from './components/Hero/index.jsx';
import SelectedWorks from './components/SelectedWorks/index.jsx';
import About from './components/About/index.jsx';
import Contact from './components/Contact/index.jsx';
import StickyNavbar from './components/StickyNavbar/index.jsx';
import ResponsiveWrapper from './components/ResponsiveWrapper.jsx';
import ClickSpark from './components/ClickSpark.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <ResponsiveWrapper>
          <StickyNavbar />
          <Hero />
          <SelectedWorks />
          <About />
          <Contact />
        </ResponsiveWrapper>
      </ClickSpark>
    </div>
  );
}

export default App;
