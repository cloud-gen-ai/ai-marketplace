export type McpServer = {
  slug: string;
  name: string;
  maintainer: string;
  category: string;
  description: string;
  bestFor: string;
  sourceUrl: string;
  docsUrl: string;
  install: string;
  license: string;
  status: string;
  tags: string[];
};

export type McpClient = {
  slug: string;
  name: string;
  maintainer: string;
  category: string;
  description: string;
  bestFor: string;
  sourceUrl: string;
  docsUrl: string;
  setup: string;
  license: string;
  status: string;
  tags: string[];
};

export type AiTopic = {
  slug: string;
  name: string;
  category: string;
  description: string;
  bestFor: string;
  resourceUrl: string;
  sourceLabel: string;
  tags: string[];
};

/** A curated starting set. Links stay upstream so visitors can review current code and security guidance. */
export const mcpServers: McpServer[] = [
  { slug: 'filesystem', name: 'Filesystem', maintainer: 'Model Context Protocol', category: 'Files and documents', description: 'A reference server for controlled file operations with configurable allowed directories.', bestFor: 'Local document workflows, project files, and RAG ingestion prototypes.', sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem', docsUrl: 'https://modelcontextprotocol.io/docs', install: 'npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/files', license: 'MIT / Apache-2.0', status: 'Official reference implementation', tags: ['local files', 'RAG', 'stdio'] },
  { slug: 'fetch', name: 'Fetch', maintainer: 'Model Context Protocol', category: 'Web content', description: 'Fetches web pages and converts content into a format that language models can use efficiently.', bestFor: 'Research assistants, URL summarization, and source-grounded workflows.', sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/fetch', docsUrl: 'https://modelcontextprotocol.io/docs', install: 'npx -y @modelcontextprotocol/server-fetch', license: 'MIT / Apache-2.0', status: 'Official reference implementation', tags: ['web', 'research', 'content'] },
  { slug: 'git', name: 'Git', maintainer: 'Model Context Protocol', category: 'Developer tools', description: 'Provides tools to read, search, and inspect Git repositories through an MCP client.', bestFor: 'Code review, repository discovery, release notes, and agent-assisted development.', sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/git', docsUrl: 'https://modelcontextprotocol.io/docs', install: 'uvx mcp-server-git --repository /path/to/repository', license: 'MIT / Apache-2.0', status: 'Official reference implementation', tags: ['Git', 'code', 'developer'] },
  { slug: 'memory', name: 'Memory', maintainer: 'Model Context Protocol', category: 'Knowledge and memory', description: 'A knowledge-graph based persistent memory reference server for multi-session context.', bestFor: 'Personal assistants, project context, and repeatable agent workflows.', sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory', docsUrl: 'https://modelcontextprotocol.io/docs', install: 'npx -y @modelcontextprotocol/server-memory', license: 'MIT / Apache-2.0', status: 'Official reference implementation', tags: ['memory', 'knowledge graph', 'stdio'] },
  { slug: 'sequential-thinking', name: 'Sequential Thinking', maintainer: 'Model Context Protocol', category: 'Reasoning support', description: 'A reference server that exposes structured thought-sequence tools for complex problem solving.', bestFor: 'Planning, decomposition, architecture reviews, and decision logs.', sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking', docsUrl: 'https://modelcontextprotocol.io/docs', install: 'npx -y @modelcontextprotocol/server-sequential-thinking', license: 'MIT / Apache-2.0', status: 'Official reference implementation', tags: ['planning', 'reasoning', 'workflows'] },
  { slug: 'time', name: 'Time', maintainer: 'Model Context Protocol', category: 'Utilities', description: 'Converts time and time zones so agents can work with schedules and localized deadlines.', bestFor: 'Scheduling, calendar assistants, global support, and deadline-aware agents.', sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/time', docsUrl: 'https://modelcontextprotocol.io/docs', install: 'npx -y @modelcontextprotocol/server-time', license: 'MIT / Apache-2.0', status: 'Official reference implementation', tags: ['time zones', 'scheduling', 'utility'] },
  { slug: 'github', name: 'GitHub MCP Server', maintainer: 'GitHub', category: 'Code and collaboration', description: "GitHub's official MCP server for repositories, code, issues, pull requests, and workflow automation.", bestFor: 'Repository assistants, issue triage, code search, and controlled engineering automation.', sourceUrl: 'https://github.com/github/github-mcp-server', docsUrl: 'https://github.com/github/github-mcp-server#readme', install: 'docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=<token> ghcr.io/github/github-mcp-server', license: 'MIT', status: 'Official open-source server', tags: ['GitHub', 'issues', 'pull requests'] },
  { slug: 'playwright', name: 'Playwright MCP', maintainer: 'Microsoft', category: 'Browser automation', description: 'A browser automation MCP server powered by Playwright and accessibility snapshots.', bestFor: 'Web QA, research flows, form testing, and agentic browser tasks.', sourceUrl: 'https://github.com/microsoft/playwright-mcp', docsUrl: 'https://github.com/microsoft/playwright-mcp#readme', install: 'npx @playwright/mcp@latest', license: 'Apache-2.0', status: 'Official open-source server', tags: ['browser', 'testing', 'automation'] },
  { slug: 'everything', name: 'Everything', maintainer: 'Model Context Protocol', category: 'Reference and testing', description: 'A compact reference server exposing prompts, resources, tools, and sampling examples in one place.', bestFor: 'Learning the protocol, integration tests, and client capability checks.', sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/everything', docsUrl: 'https://modelcontextprotocol.io/docs', install: 'npx -y @modelcontextprotocol/server-everything', license: 'MIT / Apache-2.0', status: 'Official reference implementation', tags: ['testing', 'prompts', 'resources'] },
  { slug: 'sqlite', name: 'SQLite', maintainer: 'Model Context Protocol', category: 'Data and databases', description: 'A reference database server for inspecting SQLite files with controlled read and query workflows.', bestFor: 'Local analytics, data exploration, and database-aware prototypes.', sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite', docsUrl: 'https://modelcontextprotocol.io/docs', install: 'uvx mcp-server-sqlite --db-path /path/to/database.db', license: 'MIT / Apache-2.0', status: 'Official reference implementation', tags: ['SQLite', 'SQL', 'data'] },
  { slug: 'postgres', name: 'PostgreSQL', maintainer: 'Model Context Protocol', category: 'Data and databases', description: 'A reference server for connecting an MCP client to a PostgreSQL database with query tools.', bestFor: 'Internal analytics, schema exploration, and read-only data assistants.', sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres', docsUrl: 'https://modelcontextprotocol.io/docs', install: 'npx -y @modelcontextprotocol/server-postgres postgresql://user:password@host/database', license: 'MIT / Apache-2.0', status: 'Official reference implementation', tags: ['Postgres', 'SQL', 'analytics'] },
  { slug: 'puppeteer', name: 'Puppeteer', maintainer: 'Model Context Protocol', category: 'Browser automation', description: 'A reference browser-control server for navigation, screenshots, and page interaction.', bestFor: 'Browser prototypes, smoke tests, and structured web workflows.', sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer', docsUrl: 'https://modelcontextprotocol.io/docs', install: 'npx -y @modelcontextprotocol/server-puppeteer', license: 'MIT / Apache-2.0', status: 'Official reference implementation', tags: ['browser', 'screenshots', 'automation'] },
];

/** Client SDKs and open tools that can discover and call MCP servers. */
export const mcpClients: McpClient[] = [
  { slug: 'typescript-sdk', name: 'MCP TypeScript SDK', maintainer: 'Model Context Protocol', category: 'Client SDK', description: 'Official TypeScript libraries for building MCP clients and servers with stdio and Streamable HTTP transports.', bestFor: 'Node.js, Bun, and Deno applications that need typed MCP integrations.', sourceUrl: 'https://github.com/modelcontextprotocol/typescript-sdk', docsUrl: 'https://ts.sdk.modelcontextprotocol.io/', setup: 'npm install @modelcontextprotocol/client', license: 'MIT', status: 'Official SDK', tags: ['TypeScript', 'Node.js', 'Streamable HTTP'] },
  { slug: 'python-sdk', name: 'MCP Python SDK', maintainer: 'Model Context Protocol', category: 'Client SDK', description: 'Official Python SDK for building MCP clients and servers with stdio, SSE, and Streamable HTTP support.', bestFor: 'Python agents, data workflows, and FastAPI-style MCP services.', sourceUrl: 'https://github.com/modelcontextprotocol/python-sdk', docsUrl: 'https://py.sdk.modelcontextprotocol.io/', setup: 'uv add "mcp[cli]"', license: 'MIT', status: 'Official SDK', tags: ['Python', 'async', 'Streamable HTTP'] },
  { slug: 'rust-sdk', name: 'MCP Rust SDK', maintainer: 'Model Context Protocol', category: 'Client SDK', description: 'Official Rust SDK and client examples for connecting to MCP servers over stdio and Streamable HTTP.', bestFor: 'High-performance, embedded, and strongly typed agent infrastructure.', sourceUrl: 'https://github.com/modelcontextprotocol/rust-sdk', docsUrl: 'https://github.com/modelcontextprotocol/rust-sdk/tree/main/examples/clients', setup: 'Clone the repo and run a client example with cargo.', license: 'MIT', status: 'Official SDK', tags: ['Rust', 'stdio', 'HTTP'] },
  { slug: 'inspector', name: 'MCP Inspector', maintainer: 'Model Context Protocol', category: 'Testing client', description: 'An interactive developer tool for inspecting servers, listing capabilities, and exercising tools and resources.', bestFor: 'Local debugging, contract checks, and safely validating a new server.', sourceUrl: 'https://github.com/modelcontextprotocol/inspector', docsUrl: 'https://github.com/modelcontextprotocol/inspector#readme', setup: 'npx @modelcontextprotocol/inspector', license: 'MIT', status: 'Official developer tool', tags: ['debugging', 'testing', 'developer tool'] },
  { slug: 'goose', name: 'Goose', maintainer: 'Block', category: 'Open-source AI agent', description: 'An open-source desktop and CLI agent that connects models and tools through MCP configuration.', bestFor: 'Local agent workflows, repeatable developer tasks, and team experimentation.', sourceUrl: 'https://github.com/block/goose', docsUrl: 'https://block.github.io/goose/', setup: 'Follow the installation guide for your operating system.', license: 'Apache-2.0', status: 'Active open-source client', tags: ['agent', 'desktop', 'CLI'] },
  { slug: 'mcp-apps', name: 'MCP Apps', maintainer: 'Model Context Protocol', category: 'UI extension', description: 'The official extension pattern for servers that return interactive interfaces rendered inside compatible MCP hosts.', bestFor: 'Rich tool results, approval screens, dashboards, and workflow-specific UI.', sourceUrl: 'https://github.com/modelcontextprotocol/ext-apps', docsUrl: 'https://modelcontextprotocol.io/extensions/apps/build', setup: 'Follow the ext-apps quick start and host compatibility guide.', license: 'Apache-2.0', status: 'Official extension', tags: ['UI', 'apps', 'interactive results'] },
];

/** Short learning paths that connect the directory to broader AI delivery skills. */
export const aiTopics: AiTopic[] = [
  { slug: 'mcp-architecture', name: 'MCP architecture', category: 'Foundations', description: 'Understand hosts, clients, servers, tools, resources, prompts, and transport boundaries before you connect real credentials.', bestFor: 'Anyone starting a safe server or client integration.', resourceUrl: 'https://modelcontextprotocol.io/docs', sourceLabel: 'MCP documentation', tags: ['MCP', 'architecture', 'protocol'] },
  { slug: 'mcp-security', name: 'MCP security and approvals', category: 'Security', description: 'Design least-privilege access, explicit approvals, secret handling, provenance checks, and audit trails for tool use.', bestFor: 'Production pilots and teams handling private data.', resourceUrl: 'https://modelcontextprotocol.io/specification', sourceLabel: 'MCP specification', tags: ['security', 'permissions', 'governance'] },
  { slug: 'rag-and-retrieval', name: 'RAG and retrieval quality', category: 'Applied AI', description: 'Turn documents into grounded answers with ingestion, chunking, retrieval, citations, evaluation, and feedback loops.', bestFor: 'Knowledge assistants and internal search products.', resourceUrl: 'https://docs.llamaindex.ai/en/stable/understanding/rag/', sourceLabel: 'LlamaIndex guide', tags: ['RAG', 'retrieval', 'evaluation'] },
  { slug: 'agent-workflows', name: 'Agentic workflows', category: 'Applied AI', description: 'Compose tools, state, planning, hand-offs, and human checkpoints into workflows that are observable and recoverable.', bestFor: 'Coding agents, operations assistants, and multi-step automation.', resourceUrl: 'https://docs.langchain.com/oss/python/langchain/agents', sourceLabel: 'LangChain docs', tags: ['agents', 'tools', 'orchestration'] },
  { slug: 'ai-security', name: 'AI application security', category: 'Security', description: 'Map prompt injection, insecure tool use, data leakage, and supply-chain risks to practical controls and reviews.', bestFor: 'Security reviews and responsible AI delivery.', resourceUrl: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', sourceLabel: 'OWASP LLM Top 10', tags: ['prompt injection', 'threat modeling', 'security'] },
  { slug: 'llm-observability', name: 'LLM observability', category: 'Operations', description: 'Instrument model calls, tool calls, latency, errors, cost, and quality signals so teams can improve systems over time.', bestFor: 'Reliable pilots moving toward production.', resourceUrl: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/', sourceLabel: 'OpenTelemetry GenAI', tags: ['tracing', 'metrics', 'reliability'] },
  { slug: 'ai-career-tooling', name: 'AI developer tooling', category: 'Career and delivery', description: 'Build practical fluency across coding agents, model APIs, GitHub workflows, IDE assistants, and reusable prompt assets.', bestFor: 'Engineers, interview preparation, and portfolio projects.', resourceUrl: '/courses/agentic-ai-mcp-project-lab', sourceLabel: 'Marketplace course', tags: ['Codex', 'Copilot', 'developer tools'] },
  { slug: 'production-ai', name: 'Production AI delivery', category: 'Operations', description: 'Plan evaluation gates, privacy boundaries, deployment, rollback, cost controls, and human support for AI features.', bestFor: 'Teams turning a prototype into a dependable service.', resourceUrl: '/services', sourceLabel: 'Marketplace services', tags: ['deployment', 'AI ops', 'governance'] },
];
