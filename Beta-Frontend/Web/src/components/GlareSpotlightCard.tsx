import React, { useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface GlareSpotlightCardProps {
  children?: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  // Spotlight props
  spotlightColor?: string;
  spotlightOpacity?: number;
  // Glare props
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  style?: React.CSSProperties;
}

const GlareSpotlightCard: React.FC<GlareSpotlightCardProps> = ({
  children,
  className = '',
  width = 'auto',
  height = 'auto',
  background = 'rgba(0, 0, 0, 0.4)',
  borderRadius = '16px',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  spotlightOpacity = 0.6,
  glareColor = '#ffffff',
  glareOpacity = 0.3,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 800,
  playOnce = false,
  style = {}
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // Convert hex color to rgba for glare
  const hex = glareColor.replace('#', '');
  let glareRgba = glareColor;
  
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    glareRgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    glareRgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  // Spotlight mouse tracking
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(spotlightOpacity);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(spotlightOpacity);
    animateGlareIn();
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    animateGlareOut();
  };

  // Glare animation functions
  const animateGlareIn = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%, 0 0';
    setTimeout(() => {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = '100% 100%, 0 0';
    }, 10);
  };

  const animateGlareOut = () => {
    const el = overlayRef.current;
    if (!el) return;
    if (playOnce) {
      el.style.transition = 'none';
      el.style.backgroundPosition = '-100% -100%, 0 0';
    } else {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = '-100% -100%, 0 0';
    }
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width,
    height,
    background,
    borderRadius,
    border: `1px solid ${borderColor}`,
    overflow: 'hidden',
    ...style
  };

  const spotlightStyle: React.CSSProperties = {
    opacity,
    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
    position: 'absolute',
    inset: 0,
    borderRadius,
    pointerEvents: 'none',
    transition: 'opacity 500ms'
  };

  const glareStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(${glareAngle}deg,
      hsla(0,0%,0%,0) 60%,
      ${glareRgba} 70%,
      hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-100% -100%, 0 0',
    pointerEvents: 'none',
    borderRadius
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  };

  return (
    <div
      ref={divRef}
      className={className}
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={spotlightStyle} />

      <div ref={overlayRef} style={glareStyle} />

      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default GlareSpotlightCard;
