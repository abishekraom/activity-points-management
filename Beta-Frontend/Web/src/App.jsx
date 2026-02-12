import { useState } from "react";
import Beams from "./components/Background-Beams";
import GooeyNav from "./components/Menu";
import BlurText from "./components/BlurText";
import GlassSurface from "./components/GlassSurface";
import GlareHover from "./components/GlareHover";
import SpotlightCard from "./components/SpotlightCard";
import GlareSpotlightCard from "./components/GlareSpotlightCard";
import "./App.css";

function App() {
  const items = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Login", href: "#" },
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
          noiseIntensity={0.0}
          scale={0.2}
          rotation={40}
        />
      </div>

      {/* Content Layer */}
      <div className="topbar_bg">
        <GlassSurface
          width="100%"
          height={80}
          borderRadius={50}
          blur={15}
          opacity={0.7}
          brightness={40}
          displace={0.7}
          backgroundOpacity={0.4}
          className="topbar-glass"
        >
          <div className="topbar_container">
            <BlurText
              text="Activity Points Tracker (Beta)"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-2xl font-bold m-0"
            />
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
        </GlassSurface>
      </div>

      <div className="landing_container">
        <GlareSpotlightCard
          width="600px"
          height="400px"
          background="rgba(0, 0, 0, 0.8)"
          borderRadius="20px"
          spotlightColor="rgba(59, 130, 246, 0.3)"
          spotlightOpacity={1}
          glareColor="#ffffff"
          glareOpacity={0.2}
          glareAngle={-30}
          glareSize={300}
          transitionDuration={1200}
          className="custom-card"
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Welcome to Activity Tracker
          </h2>
          <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
            Track your progress and achievements
          </p>
        </GlareSpotlightCard>
      </div>
    </div>
  );
}

export default App;
