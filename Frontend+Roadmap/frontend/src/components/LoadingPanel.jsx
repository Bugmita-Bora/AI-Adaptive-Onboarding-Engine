import React from 'react';
import '../styles/Results.css';

export default function LoadingPanel({ status, sub }) {
  return (
    <div className="loading-panel">
      <div className="loader-ring" />
      <div className="loader-status">{status || 'Analyzing...'}</div>
      <div className="loader-sub">{sub || 'Please wait'}</div>
    </div>
  );
}
