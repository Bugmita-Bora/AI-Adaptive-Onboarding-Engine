import React, { useEffect, useState, useRef } from 'react';
import '../styles/Results.css';
import '../styles/UploadPanel.css';

function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return val;
}

const STATUS = ['not started', 'in progress', 'done'];
const STATUS_COLORS = {
  'not started': 'status-idle',
  'in progress': 'status-active',
  'done':        'status-done',
};

function RoadmapNode({ module, index }) {
  const [status, setStatus] = useState('not started');
  const cycle = () => setStatus(STATUS[(STATUS.indexOf(status) + 1) % STATUS.length]);

  return (
    <div className="roadmap-node" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className={`node-num ${module.priority}`}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="node-body">
        <div className="node-header">
          <div className="node-title">{module.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className={`status-pill ${STATUS_COLORS[status]}`} onClick={cycle}>
              {status === 'done' ? '✓ ' : status === 'in progress' ? '▶ ' : '○ '}
              {status}
            </button>
            <div className={`node-pill ${module.priority}`}>{module.priority}</div>
          </div>
        </div>
        <div className="node-desc">{module.description}</div>
        <div className="node-tags">
          {(module.tags || []).map((t) => <span key={t} className="node-tag">{t}</span>)}
        </div>
        <div className="node-duration">
          <span className="dur-dot" />
          {module.duration_weeks} week{module.duration_weeks !== 1 ? 's' : ''} estimated
        </div>
      </div>
    </div>
  );
}

export default function ResultsPanel({ data, onReset }) {
  const [barWidth, setBarWidth] = useState(0);
  const matchCount  = useCountUp(data.match_percent);
  const haveCount   = (data.skills_have    || []).length;
  const gapCount    = (data.skills_gap     || []).length;
  const totalWeeks  = (data.roadmap        || []).reduce((a, m) => a + (m.duration_weeks || 0), 0);
  const haveDisplay = useCountUp(haveCount);
  const gapDisplay  = useCountUp(gapCount, 1200);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(data.match_percent), 120);
    return () => clearTimeout(t);
  }, [data.match_percent]);

  return (
    <div className="panel-anim">

      {/* Candidate + role header */}
      {data.candidate_name && (
        <div className="candidate-header">
          <div className="candidate-avatar">
            {data.candidate_name.split(' ').map(w => w[0]).slice(0, 2).join('')}
          </div>
          <div>
            <div className="candidate-name">{data.candidate_name}</div>
            <div className="candidate-role">→ {data.role_title}</div>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="stats-row">
        <div className="stat-card green">
          <div className="stat-label">Role Match</div>
          <div className="stat-value green">{matchCount}%</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Skills Matched</div>
          <div className="stat-value green">{haveDisplay}</div>
        </div>
        <div className="stat-card red">
          <div className="stat-label">Gaps to Close</div>
          <div className="stat-value red">{gapDisplay}</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-label">Weeks to Readiness</div>
          <div className="stat-value purple">{totalWeeks}</div>
        </div>
      </div>

      {/* Match bar */}
      <div className="match-bar-card">
        <div className="match-bar-header">
          <div className="match-bar-label">Role Readiness</div>
          <div className="match-bar-pct">{matchCount}%</div>
        </div>
        <div className="match-bar-track">
          <div className="match-bar-fill" style={{ width: `${barWidth}%` }} />
        </div>
      </div>

      {/* Skills */}
      <div className="skills-grid">
        <div className="card">
          <div className="card-title">Skills You Have</div>
          <div className="card-sub">Matched against role requirements</div>
          <div>
            {(data.skills_have || []).map((s) => (
              <span key={s.name} className="skill-tag have"><span className="skill-dot" />{s.name}</span>
            ))}
            {(data.skills_partial || []).map((s) => (
              <span key={s.name} className="skill-tag partial" title={s.note}><span className="skill-dot" />{s.name} ↗</span>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Skill Gaps</div>
          <div className="card-sub">What to learn for this role</div>
          <div>
            {(data.skills_gap || []).map((s) => (
              <span key={s.name} className="skill-tag gap"><span className="skill-dot" />{s.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="section-heading">Learning Roadmap</div>
      <div>
        {(data.roadmap || []).map((m, i) => (
          <RoadmapNode key={i} module={m} index={i} />
        ))}
      </div>

      <div className="results-divider" />
      <div className="action-row">
        <button className="btn-primary" onClick={onReset}>← Start Over</button>
      </div>
    </div>
  );
}
