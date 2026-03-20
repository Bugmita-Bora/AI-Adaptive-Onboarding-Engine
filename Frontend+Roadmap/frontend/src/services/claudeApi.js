const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function analyzeWithClaude(resumeText, jdText, onStatus) {
  onStatus('Parsing documents...', 'Extracting skills and experience levels');
  await sleep(300);

  onStatus('Analyzing skill gaps...', 'Comparing your profile against role requirements');

  const response = await fetch(`${API_BASE}/api/analyze/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume_text: resumeText, jd_text: jdText }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Server error: ${response.status}`);
  }

  onStatus('Building your roadmap...', 'Generating personalized learning modules');
  await sleep(400);

  return data;
}
