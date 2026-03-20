import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import TabNav from './components/TabNav';
import StepsNav from './components/StepsNav';
import UploadPanel from './components/UploadPanel';
import LoadingPanel from './components/LoadingPanel';
import ResultsPanel from './components/ResultsPanel';
import { analyzeWithClaude } from './services/claudeApi';
import { SAMPLE_RESULT } from './data/sampleData';

export default function App() {
  const [step,          setStep]         = useState(1);
  const [results,       setResults]      = useState(null);
  const [loaderStatus,  setLoaderStatus] = useState('');
  const [loaderSub,     setLoaderSub]    = useState('');

  const handleAnalyze = async ({ resumeText, jdText }) => {
    setStep(2);
    try {
      const data = await analyzeWithClaude(resumeText, jdText,
        (status, sub) => { setLoaderStatus(status); setLoaderSub(sub); }
      );
      setResults(data);
      setStep(3);
    } catch (err) {
      alert('Error: ' + err.message);
      setStep(1);
    }
  };

  const handleSample = (data) => { setResults(data); setStep(3); };
  const handleReset  = ()     => { setResults(null); setStep(1); };

  const handleTabClick = (tab) => {
    if (tab === 'upload') setStep(step === 3 ? 1 : step);
    if (tab === 'results' && results) setStep(3);
  };

  return (
    <div className="app-shell">
      <Header />

      {step !== 2 && (
        <TabNav step={step} onTabClick={handleTabClick} />
      )}

      {step === 1 && <Hero />}

      {step !== 2 && (
        <StepsNav currentStep={step} />
      )}

      {step === 1 && (
        <UploadPanel onAnalyze={handleAnalyze} onSample={handleSample} />
      )}

      {step === 2 && (
        <LoadingPanel status={loaderStatus} sub={loaderSub} />
      )}

      {step === 3 && results && (
        <ResultsPanel data={results} onReset={handleReset} />
      )}
    </div>
  );
}
