import { useState } from 'react';
import Beams from './components/Background-Beams';
import GooeyNav from './components/Menu';
import './App.css';

function App() {
  const items = [
    { label: "Login", href: "#" },
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];
  return (
    <div className="app-container">
      {/* Background Layer */}
      <div className="background-layer">
        <Beams
          beamWidth={2}
          beamHeight={40}
          beamNumber={15}
          lightColor="#60a5fa"
          speed={7}
          noiseIntensity={0.00}
          scale={0.2}
          rotation={40}
        />
      </div>

      {/* Content Layer */}
      <div className='content-layer'>
        <div className='topbar_container'>
          <GooeyNav
            items={items}
            particleCount={10}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
      </div>
    </div>
  );
}

export default App