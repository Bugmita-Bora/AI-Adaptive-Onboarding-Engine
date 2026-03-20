import React from 'react';
import '../styles/StepsNav.css';

const STEPS = ['Upload', 'Analyze', 'Roadmap'];

export default function StepsNav({ currentStep }) {
  return (
    <div className="steps-nav">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const isDone   = n < currentStep;
        const isActive = n === currentStep;
        return (
          <React.Fragment key={n}>
            <div className={`step-item${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}>
              <div className="step-num">{isDone ? '✓' : n}</div>
              <span>{label}</span>
            </div>
            {i < STEPS.length - 1 && <div className="step-connector" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
