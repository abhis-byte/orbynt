import React from 'react';
import './Intro.css';

export default function Intro() {
  return (
    <div className="intro-screen">
      <video src="/splash.mp4" autoPlay muted className="intro-video" />
    </div>
  );
}