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

export const courseCatalog = [
  { type: 'Build', title: 'Production RAG Foundations', description: 'Design ingestion, chunking, retrieval, citations, evaluation, and feedback loops for useful knowledge systems.', level: 'Foundation → practitioner', price: 'Self-paced' },
  { type: 'Build', title: 'Agentic AI Project Lab', description: 'Move from a single prompt to tool use, orchestration, guardrails, observability, and human approval.', level: 'Practitioner', price: 'Self-paced' },
  { type: 'Career', title: 'AI Engineer Interview Studio', description: 'Practice architecture stories, Python and DSA fundamentals, system design, and clear technical communication.', level: 'Interview preparation', price: 'Guided cohort' },
  { type: 'Tools', title: 'Coding Agents at Work', description: 'Build a safe daily workflow around Codex, Claude Code, GitHub Copilot, Amazon Q Developer, and IDE assistants.', level: 'Tool fluency', price: 'Short course' },
];

export const mentoringOffers = [
  { title: 'Project direction', description: 'Turn an idea into a practical architecture, delivery plan, and first milestone.', points: ['RAG and agentic AI architecture', 'Technology and model selection', 'Scope, risks, and next actions'] },
  { title: 'Career guidance', description: 'Clarify your AI engineering path and build a focused plan for the next role or promotion.', points: ['Profile and portfolio review', 'Learning roadmap and priorities', 'Practical project positioning'] },
  { title: 'Interview preparation', description: 'Practice the conversations that matter, with feedback on depth, structure, and clarity.', points: ['Python and DSA practice', 'GenAI system design', 'Mock behavioral and technical rounds'] },
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
