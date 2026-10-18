export const platformFeatures = [
  { icon: '01', title: 'Reusable AI skills', description: 'Ready-to-adapt workflows for prompts, coding agents, RAG, evaluation, and AI operations.', href: '/marketplace' },
  { icon: '02', title: 'One-to-one guidance', description: 'Get practical help for a project, a career move, an interview, or your next architecture decision.', href: '/mentoring' },
  { icon: '03', title: 'Structured AI courses', description: 'Follow short, outcome-led learning paths instead of collecting disconnected tutorials.', href: '/courses' },
  { icon: '04', title: 'Tool fluency', description: 'Understand Codex, Claude Code, Copilot, Amazon Q, models, and the workflows around them.', href: '/insights' },
];

export const learningPaths = [
  { number: '01', title: 'Explore', description: 'Find a skill pack, course, or guided path that matches the work you want to do.' },
  { number: '02', title: 'Apply', description: 'Read the workflow, download the reusable assets, and use them on a real project.' },
  { number: '03', title: 'Accelerate', description: 'Bring a question to a mentor and turn your prototype into a confident next step.' },
];

export type Course = {
  slug: string;
  type: string;
  title: string;
  description: string;
  level: string;
  price: string;
  duration: string;
  syllabus: string[];
  outcomes: string[];
  references: { label: string; href: string }[];
};

export const careerSupport = [
  'Resume and ATS positioning for AI engineering roles',
  'Naukri, LinkedIn, and other job-portal profile structure',
  'Project portfolio case studies with measurable outcomes',
  'Python, DSA, GenAI system design, and behavioral interview practice',
  'Mock interview feedback, job-search plan, and offer communication guidance',
];

export const courseCatalog: Course[] = [
  { slug: 'ai-engineering-foundations', type: 'Foundation', title: 'AI Engineering Foundations', description: 'Build a dependable foundation across Python, model APIs, embeddings, prompt design, structured outputs, and responsible AI.', level: 'Foundation → practitioner', price: 'Self-paced', duration: '6 weeks', syllabus: ['Python and API fundamentals for AI products', 'Prompt, context, and structured-output patterns', 'Embeddings, tokens, latency, and cost basics', 'Model selection, fallbacks, and safety boundaries', 'Build a small AI feature with tests and documentation'], outcomes: ['Explain the core pieces of an AI application', 'Ship a small, tested model-powered feature', 'Choose the next specialization with confidence'], references: [{ label: 'OpenAI Platform Docs', href: 'https://platform.openai.com/docs' }, { label: 'Hugging Face Tasks', href: 'https://huggingface.co/tasks' }] },
  { slug: 'production-rag-foundations', type: 'Build', title: 'Production RAG Foundations', description: 'Design ingestion, chunking, retrieval, citations, evaluation, and feedback loops for useful knowledge systems.', level: 'Foundation → practitioner', price: 'Self-paced', duration: '8 weeks', syllabus: ['Document ingestion and parsing strategy', 'Chunking, metadata, embeddings, and vector indexes', 'Hybrid retrieval, reranking, filters, and permissions', 'Grounded answers, citations, and abstention behavior', 'Offline evaluation, feedback capture, and production monitoring'], outcomes: ['Design a complete RAG architecture', 'Create a retrieval evaluation set', 'Explain quality, security, and cost trade-offs'], references: [{ label: 'LlamaIndex Documentation', href: 'https://docs.llamaindex.ai/' }, { label: 'MLflow RAG Evaluation', href: 'https://mlflow.org/cookbook/rag-evaluation' }] },
  { slug: 'agentic-ai-mcp-project-lab', type: 'Build', title: 'Agentic AI and MCP Project Lab', description: 'Move from a single prompt to tool use, orchestration, MCP connections, guardrails, observability, and human approval.', level: 'Practitioner', price: 'Self-paced', duration: '8 weeks', syllabus: ['Agent boundaries, state, and task planning', 'Tool schemas, permissions, retries, and fallbacks', 'MCP servers, resources, prompts, and secure connections', 'Human-in-the-loop approvals and audit trails', 'Build and evaluate a multi-step agent workflow'], outcomes: ['Build a tool-using agent with clear boundaries', 'Connect an MCP server safely', 'Demonstrate reliable behavior with trace evidence'], references: [{ label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io/introduction' }, { label: 'LangChain Learn', href: 'https://docs.langchain.com/oss/python/learn' }] },
  { slug: 'llm-evaluation-llmops', type: 'Production', title: 'LLM Evaluation and LLMOps', description: 'Turn subjective AI quality into repeatable tests, traces, scorecards, release gates, and improvement loops.', level: 'Practitioner → production', price: 'Guided cohort', duration: '6 weeks', syllabus: ['Evaluation datasets and golden examples', 'Correctness, relevance, groundedness, safety, and latency metrics', 'Tracing prompts, tools, retrieval, and model calls', 'Red teaming and regression testing', 'Release gates, dashboards, and incident response'], outcomes: ['Create an evaluation plan for an AI feature', 'Trace failures across a multi-step workflow', 'Set practical quality gates before release'], references: [{ label: 'LangSmith Evaluation', href: 'https://docs.langchain.com/langsmith/evaluation' }, { label: 'MLflow Tracing', href: 'https://www.mlflow.org/llm-tracing/' }] },
  { slug: 'coding-agents-at-work', type: 'Tools', title: 'Coding Agents at Work', description: 'Build a safe daily workflow around Codex, Claude Code, GitHub Copilot, Amazon Q Developer, and IDE assistants.', level: 'Tool fluency', price: 'Short course', duration: '4 weeks', syllabus: ['Context files, repository discovery, and task boundaries', 'Plan → implement → test → review loops', 'MCP and tool permissions for coding workflows', 'Debugging, refactoring, and change summaries', 'Team adoption, review policy, and safe automation'], outcomes: ['Choose the right coding agent for a task', 'Create repeatable repository workflows', 'Review agent-generated changes with confidence'], references: [{ label: 'OpenAI Codex Learn', href: 'https://developers.openai.com/learn/codex' }, { label: 'GitHub Copilot Docs', href: 'https://docs.github.com/en/copilot' }, { label: 'Claude Code Guide', href: 'https://docs.anthropic.com/en/docs/claude-code/getting-started' }] },
  { slug: 'multimodal-ai-systems', type: 'Build', title: 'Multimodal AI Systems', description: 'Work with text, images, audio, and documents to design useful multimodal applications with clear evaluation criteria.', level: 'Practitioner', price: 'Self-paced', duration: '6 weeks', syllabus: ['Vision and document understanding fundamentals', 'Audio transcription and conversational interfaces', 'Multimodal prompts and structured extraction', 'Quality, privacy, and accessibility checks', 'Build a multimodal workflow with human review'], outcomes: ['Select an appropriate modality and model', 'Extract structured data from real inputs', 'Design a review path for uncertain outputs'], references: [{ label: 'Hugging Face Tasks', href: 'https://huggingface.co/tasks' }, { label: 'OpenAI Platform Docs', href: 'https://platform.openai.com/docs' }] },
  { slug: 'open-models-finetuning', type: 'Models', title: 'Open Models and Fine-tuning', description: 'Understand model cards, datasets, adapters, fine-tuning decisions, and responsible deployment for open models.', level: 'Practitioner', price: 'Self-paced', duration: '7 weeks', syllabus: ['Model and dataset selection using model cards', 'Data cleaning, licensing, and training splits', 'PEFT, LoRA, evaluation, and checkpoint management', 'Quantization, serving, and cost trade-offs', 'Safety, provenance, and release documentation'], outcomes: ['Choose between prompting, RAG, and fine-tuning', 'Create a small reproducible training run', 'Document model limitations and usage conditions'], references: [{ label: 'Hugging Face Skills', href: 'https://huggingface.co/docs/hub/en/agents-skills' }, { label: 'Hugging Face Datasets', href: 'https://huggingface.co/docs/datasets' }] },
  { slug: 'ai-engineer-interview-career-studio', type: 'Career', title: 'AI Engineer Interview and Career Studio', description: 'Prepare for AI engineering interviews and build the profile, resume, portfolio, and job-search story that represents your real work.', level: 'Interview preparation', price: 'Guided cohort', duration: '6 weeks', syllabus: ['AI project storytelling and impact framing', 'Python, DSA, SQL, and debugging practice', 'RAG, agents, model selection, and system design', 'Resume and ATS keyword positioning', 'Naukri, LinkedIn, and job-portal profile design', 'Mock interviews, feedback, and offer communication'], outcomes: ['Explain your projects clearly to technical interviewers', 'Create a targeted AI engineer resume and profile', 'Practice a repeatable interview preparation system'], references: [{ label: 'GitHub Skills', href: 'https://skills.github.com/' }, { label: 'AI Engineering Roadmap', href: 'https://dataskew.io/roadmaps/ai-engineering/' }] },
  { slug: 'ai-product-automation-ops', type: 'Product', title: 'AI Product, Automation, and Operations', description: 'Translate AI capability into a useful service with product discovery, workflow automation, observability, governance, and measurable adoption.', level: 'Practitioner → production', price: 'Guided cohort', duration: '6 weeks', syllabus: ['Problem framing and user journey mapping', 'Automation opportunities and human handoffs', 'Service contracts, observability, and incident playbooks', 'Security, privacy, and governance readiness', 'Adoption metrics, feedback loops, and roadmap decisions'], outcomes: ['Prioritize AI opportunities by value and risk', 'Design a human-centered workflow', 'Create an operating plan for continuous improvement'], references: [{ label: 'OWASP GenAI Security', href: 'https://genai.owasp.org/' }, { label: 'MLflow AI Platform', href: 'https://mlflow.org/docs/latest/llms/' }] },
];

export const mentoringOffers = [
  { title: 'Project direction', description: 'Turn an idea into a practical architecture, delivery plan, and first milestone.', points: ['RAG and agentic AI architecture', 'Technology and model selection', 'Scope, risks, and next actions'] },
  { title: 'Career guidance', description: 'Clarify your AI engineering path and build a focused plan for the next role or promotion.', points: ['Profile and portfolio review', 'Learning roadmap and priorities', 'Practical project positioning'] },
  { title: 'Interview preparation', description: 'Practice the conversations that matter, with feedback on depth, structure, and clarity.', points: ['Python and DSA practice', 'GenAI system design', 'Mock behavioral and technical rounds'] },
];

export const corporateServices = [
  { title: 'AI adoption workshops', description: 'Role-based sessions for engineering, product, operations, and leadership teams.' },
  { title: 'Coding-agent enablement', description: 'Safe workflows for Codex, Claude Code, GitHub Copilot, Amazon Q Developer, and IDE assistants.' },
  { title: 'RAG and agentic AI delivery', description: 'Architecture, evaluation, observability, security boundaries, and a practical first milestone.' },
  { title: 'Corporate AI / IT support', description: 'Hands-on help with tooling, access, governance, rollout, and support after the workshop.' },
];

export const toolGuides = [
  { name: 'OpenAI Codex', href: 'https://developers.openai.com/learn/codex' },
  { name: 'Claude Code', href: 'https://docs.anthropic.com/en/docs/claude-code/getting-started' },
  { name: 'GitHub Copilot', href: 'https://docs.github.com/en/copilot' },
  { name: 'Amazon Q Developer', href: 'https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/' },
  { name: 'Cursor', href: 'https://docs.cursor.com/' },
  { name: 'MCP', href: 'https://modelcontextprotocol.io/introduction' },
  { name: 'RAG systems', href: '/courses' },
  { name: 'Agent operations', href: '/marketplace' },
];

export const insightCatalog = [
  { type: 'Coding agents', title: 'A calmer way to work with coding agents', description: 'A practical guide to context, task boundaries, review loops, and safe delivery with modern coding agents.', href: 'https://developers.openai.com/learn/codex' },
  { type: 'Agentic AI', title: 'From tool calls to reliable agent workflows', description: 'The building blocks behind useful agents: tools, state, approvals, fallbacks, and observable outcomes.', href: '/courses' },
  { type: 'MCP', title: 'Designing safer tool connections', description: 'Questions to ask about provenance, permissions, input validation, and human approval before connecting a tool server.', href: 'https://modelcontextprotocol.io/introduction' },
  { type: 'AI career', title: 'Build a portfolio that shows judgment', description: 'How to turn a project into a story that makes your engineering decisions easy to understand.', href: '/mentoring' },
];
