import React from 'react';
import tools from '../data/tools';
import './ToolPanel.css';

export default function ToolPanel() {
  return (
    <div className="tool-panel">
      {tools.map((tool) => (
        <button key={tool.id} className="tool-btn">{tool.name}</button>
      ))}
    </div>
  );
}