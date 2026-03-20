import React, { useState } from 'react';
import DropZone from './DropZone';
import { SAMPLE_RESULT, SAMPLE_RESUME, SAMPLE_JD } from '../data/sampleData';
import '../styles/UploadPanel.css';

export default function UploadPanel({ onAnalyze, onSample }) {
  const [resumeText, setResumeText] = useState('');
  const [jdText,     setJdText]     = useState('');
  const [error,      setError]      = useState('');

  const handleAnalyze = () => {
    setError('');
    if (!resumeText.trim()) return setError('Please provide your resume content.');
    if (!jdText.trim())     return setError('Please provide the job description.');
    onAnalyze({ resumeText, jdText });
  };

  const handleSample = () => {
    setResumeText(SAMPLE_RESUME);
    setJdText(SAMPLE_JD);
    onSample(SAMPLE_RESULT);
  };

  return (
    <div>
      <div className="upload-grid">
        <div className="card">
          <div className="card-title">Resume</div>
          <div className="card-sub">Upload your CV or paste experience below</div>
          <DropZone icon="📄" title="Drop file here" hint="PDF, DOC, or TXT · click to browse" onRead={setResumeText} />
          <div className="divider-or">or paste text</div>
          <textarea className="text-area" placeholder="Paste your resume / work experience here..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
        </div>
        <div className="card">
          <div className="card-title">Job Description</div>
          <div className="card-sub">Paste the target role's requirements</div>
          <DropZone icon="💼" title="Drop file here" hint="PDF, DOC, or TXT · click to browse" onRead={setJdText} />
          <div className="divider-or">or paste text</div>
          <textarea className="text-area" placeholder="Paste the job description here..." value={jdText} onChange={(e) => setJdText(e.target.value)} />
        </div>
      </div>

      <div className="action-bar">
        <button className="btn-primary" onClick={handleAnalyze}>Analyze my profile →</button>
        <button className="sample-link" onClick={handleSample}>or load sample data</button>
      </div>

      {error && <div className="error-box"><span>⚠</span><div>{error}</div></div>}
    </div>
  );
}
