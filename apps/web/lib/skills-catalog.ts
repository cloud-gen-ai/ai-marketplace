export type ExpandedSkill = {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  currency: 'USD';
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  status: 'free';
  compatibleWith: string[];
  metadata: {
    skills: string[];
    sessions: { title: string; content: string }[];
    source_url: string;
    source_label: string;
    level: string;
    catalog_kind: 'public-reference';
  };
};

type SkillDomain = { key: string; name: string; sourceLabel: string; sourceUrl: string; tag: string; tools: string[] };

const domains: SkillDomain[] = [
  { key: 'ai-foundations', name: 'AI foundations', sourceLabel: 'Hugging Face Tasks', sourceUrl: 'https://huggingface.co/tasks', tag: 'foundations', tools: ['Python', 'Jupyter', 'Hugging Face'] },
  { key: 'prompt-context', name: 'Prompt and context engineering', sourceLabel: 'Prompt Engineering Guide', sourceUrl: 'https://github.com/dair-ai/prompt-engineering-guide', tag: 'prompting', tools: ['OpenAI', 'Claude', 'Gemini'] },
  { key: 'llm-apps', name: 'LLM application development', sourceLabel: 'OpenAI Platform Docs', sourceUrl: 'https://platform.openai.com/docs', tag: 'llm-apps', tools: ['OpenAI', 'Anthropic', 'Google AI'] },
  { key: 'rag-search', name: 'RAG and knowledge search', sourceLabel: 'LlamaIndex Documentation', sourceUrl: 'https://docs.llamaindex.ai/', tag: 'rag', tools: ['LlamaIndex', 'LangChain', 'pgvector'] },
  { key: 'agentic-ai', name: 'Agentic AI workflows', sourceLabel: 'LangChain Learn', sourceUrl: 'https://docs.langchain.com/oss/python/learn', tag: 'agents', tools: ['LangGraph', 'LangChain', 'OpenAI Agents'] },
  { key: 'mcp-tooling', name: 'MCP and tool integration', sourceLabel: 'Model Context Protocol', sourceUrl: 'https://modelcontextprotocol.io/introduction', tag: 'mcp', tools: ['MCP', 'Codex', 'Claude Code'] },
  { key: 'evals-reliability', name: 'Evaluation and reliability', sourceLabel: 'LangSmith Evaluation Docs', sourceUrl: 'https://docs.langchain.com/langsmith/evaluation', tag: 'evaluation', tools: ['LangSmith', 'RAGAS', 'MLflow'] },
  { key: 'data-document-ai', name: 'Data and document intelligence', sourceLabel: 'Hugging Face Datasets', sourceUrl: 'https://huggingface.co/docs/datasets', tag: 'data', tools: ['Docling', 'Datasets', 'Python'] },
  { key: 'multimodal-ai', name: 'Multimodal AI', sourceLabel: 'Hugging Face Tasks', sourceUrl: 'https://huggingface.co/tasks', tag: 'multimodal', tools: ['Vision', 'Audio', 'OpenAI'] },
  { key: 'open-models', name: 'Open models and fine-tuning', sourceLabel: 'Hugging Face Skills', sourceUrl: 'https://huggingface.co/docs/hub/en/agents-skills', tag: 'open-models', tools: ['Transformers', 'PEFT', 'TRL'] },
  { key: 'mlops-serving', name: 'MLOps and model serving', sourceLabel: 'MLflow AI Platform', sourceUrl: 'https://mlflow.org/docs/latest/llms/', tag: 'mlops', tools: ['MLflow', 'Docker', 'Kubernetes'] },
  { key: 'cloud-ai', name: 'Cloud AI delivery', sourceLabel: 'AWS Amazon Q Developer Docs', sourceUrl: 'https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/', tag: 'cloud', tools: ['AWS', 'Azure', 'GCP'] },
  { key: 'developer-agents', name: 'Coding agents and developer tools', sourceLabel: 'GitHub Copilot Docs', sourceUrl: 'https://docs.github.com/en/copilot', tag: 'developer-tools', tools: ['Codex', 'GitHub Copilot', 'Claude Code'] },
  { key: 'ai-security', name: 'AI security and red teaming', sourceLabel: 'OWASP GenAI Security Project', sourceUrl: 'https://genai.owasp.org/', tag: 'security', tools: ['OWASP', 'Guardrails', 'IAM'] },
  { key: 'ai-product-ops', name: 'AI product and operations', sourceLabel: 'MLflow Tracing', sourceUrl: 'https://www.mlflow.org/llm-tracing/', tag: 'operations', tools: ['Tracing', 'Analytics', 'Product Ops'] },
  { key: 'career-interview', name: 'AI career and interview readiness', sourceLabel: 'GitHub Skills', sourceUrl: 'https://skills.github.com/', tag: 'career', tools: ['Resume', 'Naukri', 'Interview'] },
  { key: 'responsible-ai', name: 'Responsible AI and governance', sourceLabel: 'NIST AI Risk Management Framework', sourceUrl: 'https://www.nist.gov/itl/ai-risk-management-framework', tag: 'governance', tools: ['NIST AI RMF', 'OWASP', 'Policy'] },
];

const workflows = [
  'Architecture mapping', 'Prompt design', 'Context packaging', 'Structured output design',
  'Tool contract design', 'Data preparation', 'Retrieval tuning', 'Workflow orchestration',
  'Evaluation harnesses', 'Quality monitoring', 'Latency optimization', 'Cost optimization',
  'Security review', 'Deployment automation', 'Documentation systems', 'Interview storytelling',
];

const levels = ['Foundation', 'Builder', 'Production', 'Interview Lab'];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function sessionContent(domain: SkillDomain, workflow: string, level: string) {
  return `Outcome: complete a ${level.toLowerCase()} ${workflow.toLowerCase()} workflow for ${domain.name.toLowerCase()}.\n\nPractice: define the input contract, choose the right model or tool boundary, create a small test case, and document what success looks like.\n\nReference: use ${domain.sourceLabel} as the starting point, then adapt the checklist to your own project. Review the linked source's license and terms before redistributing any material.`;
}

export const expandedSkillCatalog: ExpandedSkill[] = domains.flatMap((domain, domainIndex) => workflows.flatMap((workflow, workflowIndex) => levels.map((level, levelIndex) => {
  const slug = `open-${slugify(domain.key)}-${slugify(workflow)}-${slugify(level)}`;
  const skillTitle = `${workflow} for ${domain.name}`;
  return {
    id: `open_skill_${domainIndex + 1}_${workflowIndex + 1}_${levelIndex + 1}`,
    slug,
    title: `${skillTitle} · ${level}`,
    category: domain.name,
    price: 0,
    currency: 'USD' as const,
    rating: 4.9,
    reviews: 0,
    description: `A reusable ${level.toLowerCase()} workflow for ${workflow.toLowerCase()} in ${domain.name.toLowerCase()}, with a practical checklist and a public reference to continue learning.`,
    tags: [domain.tag, slugify(workflow), slugify(level)],
    status: 'free' as const,
    compatibleWith: domain.tools,
    metadata: {
      skills: [slug],
      sessions: [{ title: slug, content: sessionContent(domain, workflow, level) }],
      source_url: domain.sourceUrl,
      source_label: domain.sourceLabel,
      level,
      catalog_kind: 'public-reference' as const,
    },
  };
})));

export const expandedSkillCount = expandedSkillCatalog.length;
