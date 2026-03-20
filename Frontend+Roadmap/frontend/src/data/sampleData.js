export const SAMPLE_RESUME = `Jane Smith — Senior Software Engineer
5 years experience. Proficient in Python, JavaScript, React, REST APIs, SQL, Git.
Experience with AWS (EC2, S3), Docker. Some exposure to machine learning with scikit-learn.
Built and maintained microservices at scale. Led a team of 3 engineers.`;

export const SAMPLE_JD = `Machine Learning Engineer — AI Platform Team
Required: Python, TensorFlow or PyTorch, MLOps, Kubernetes, CI/CD, Data pipelines (Spark/Airflow).
Nice to have: LLMOps, vector databases, Rust, distributed systems.
You will deploy and monitor production ML models at scale, build training infrastructure, and collaborate with research teams.`;

export const SAMPLE_RESULT = {
  candidate_name: 'Jane Smith',
  role_title: 'Machine Learning Engineer',
  years_experience: 5,
  match_percent: 52,
  skills_have: [
    { name: 'Python',    level: 'advanced' },
    { name: 'REST APIs', level: 'advanced' },
    { name: 'Docker',    level: 'intermediate' },
    { name: 'AWS',       level: 'intermediate' },
    { name: 'SQL',       level: 'intermediate' },
    { name: 'React',     level: 'advanced' },
    { name: 'Git',       level: 'advanced' },
    { name: 'CI/CD',     level: 'intermediate' },
  ],
  skills_partial: [
    { name: 'scikit-learn', note: 'Basic ML exposure, needs deepening' },
  ],
  skills_gap: [
    { name: 'PyTorch',          priority: 'high' },
    { name: 'TensorFlow',       priority: 'high' },
    { name: 'MLOps',            priority: 'high' },
    { name: 'Kubernetes',       priority: 'medium' },
    { name: 'Apache Spark',     priority: 'medium' },
    { name: 'Airflow',          priority: 'medium' },
    { name: 'LLMOps',           priority: 'low' },
    { name: 'Vector databases', priority: 'low' },
  ],
  roadmap: [
    {
      title: 'Deep Learning Foundations',
      description: 'Build solid foundations in neural networks using PyTorch. Cover backpropagation, CNNs, RNNs, and transformer architectures through hands-on projects. Complete the fast.ai Practical Deep Learning course.',
      priority: 'high',
      duration_weeks: 4,
      tags: ['PyTorch', 'Neural networks', 'Transformers', 'fast.ai'],
    },
    {
      title: 'MLOps & Model Deployment',
      description: 'Learn to package, version, and serve ML models in production. Study MLflow for experiment tracking, model registry, and deployment. Build a mini end-to-end pipeline from training to serving.',
      priority: 'high',
      duration_weeks: 3,
      tags: ['MLflow', 'Model serving', 'CI/CD for ML', 'Docker'],
    },
    {
      title: 'Kubernetes for ML Workloads',
      description: 'Extend your Docker knowledge to Kubernetes orchestration. Learn Helm charts, resource limits, autoscaling, and GPU scheduling. Deploy a model inference server on a local k8s cluster.',
      priority: 'medium',
      duration_weeks: 3,
      tags: ['Kubernetes', 'Helm', 'GPU scheduling', 'Kubeflow'],
    },
    {
      title: 'Data Pipelines with Airflow & Spark',
      description: 'Learn Apache Airflow for workflow orchestration and PySpark for large-scale data processing. Build a feature engineering pipeline that feeds a training job automatically.',
      priority: 'medium',
      duration_weeks: 3,
      tags: ['Apache Airflow', 'PySpark', 'Feature engineering', 'ETL'],
    },
    {
      title: 'LLMOps & Vector Databases',
      description: 'Explore the emerging LLMOps stack: prompt versioning, evaluation, and monitoring. Get hands-on with Pinecone or Weaviate for semantic search. Build a small RAG pipeline.',
      priority: 'low',
      duration_weeks: 2,
      tags: ['LangChain', 'Pinecone', 'RAG', 'Prompt eval'],
    },
  ],
};
