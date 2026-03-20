import React from 'react';
import '../styles/TabNav.css';

export default function TabNav({ step, onTabClick }) {
  const canSeeResults = step === 3;

  return (
    <div className="tab-nav">
      <button
        className={`tab-btn ${step !== 3 ? 'active' : ''}`}
        onClick={() => onTabClick('upload')}
      >
        Upload
      </button>
      <button
        className={`tab-btn ${step === 3 ? 'active' : ''} ${!canSeeResults ? 'disabled' : ''}`}
        onClick={() => canSeeResults && onTabClick('results')}
      >
        Results
        {!canSeeResults && <span className="tab-lock">🔒</span>}
      </button>
    </div>
  );
}
