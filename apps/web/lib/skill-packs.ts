export type SkillPack = {
  slug: string;
  directory: string;
  module: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
};

export const skillPacks: SkillPack[] = [
  {
    slug: 'skill-pack-ai-agents', directory: 'skill-ai-agent', module: 'ai_agent_skill', title: 'AI Agent Skill Pack', category: 'AI Agents',
    description: 'Prompt optimization, tool routing, multi-agent planning, workflows, knowledge bases, and reasoning.',
    skills: ['prompt-optimizer', 'tool-router', 'multi-agent-planner', 'workflow-coordinator', 'knowledge-base-curator', 'reasoning-assistant'],
  },
  {
    slug: 'skill-pack-analytics', directory: 'skill-analytics', module: 'analytics_skill', title: 'Analytics Skill Pack', category: 'Analytics',
    description: 'KPI analysis, forecasting, anomaly detection, executive summaries, and market insights.',
    skills: ['dashboard-analysis', 'trend-analysis', 'anomaly-detector', 'kpi-reporting', 'executive-summary', 'market-insight-generator'],
  },
  {
    slug: 'skill-pack-automation', directory: 'skill-automation', module: 'automation_skill', title: 'Automation Skill Pack', category: 'Automation',
    description: 'Workflow automation, approvals, notifications, scheduling, routing, and integrations.',
    skills: ['workflow-automation', 'approval-router', 'notification-engine', 'task-scheduler', 'document-routing', 'integration-orchestrator'],
  },
  {
    slug: 'skill-pack-business', directory: 'skill-business', module: 'business_skill', title: 'Business Skill Pack', category: 'Business',
    description: 'Business analytics, CRM workflows, reporting, document extraction, and process optimization.',
    skills: ['business-analytics', 'sales-forecasting', 'crm-automation', 'financial-analysis', 'document-extraction', 'workflow-optimization', 'sentiment-analysis', 'inventory-forecasting'],
  },
  {
    slug: 'skill-pack-customer-success', directory: 'skill-customer-success', module: 'customer_success_skill', title: 'Customer Success Skill Pack', category: 'Customer Success',
    description: 'Onboarding, health analysis, retention planning, renewal risk, journey insights, and forecasting.',
    skills: ['onboarding-planner', 'health-analysis', 'retention-plan', 'renewal-risk-review', 'customer-journey-insights', 'success-forecasting'],
  },
  {
    slug: 'skill-pack-customer-support', directory: 'skill-customer-support', module: 'support_skill', title: 'Customer Support Skill Pack', category: 'Customer Support',
    description: 'Ticket triage, service automation, response drafting, issue resolution, and customer health.',
    skills: ['ticket-triage', 'helpdesk-automation', 'response-drafter', 'issue-resolution-guide', 'feedback-classifier', 'customer-health-summary'],
  },
  {
    slug: 'skill-pack-data-engineering', directory: 'skill-data-engineering', module: 'data_engineering_skill', title: 'Data Engineering Skill Pack', category: 'Data Engineering',
    description: 'Pipeline design, schema review, ETL optimization, data quality, warehouse planning, and streaming architecture.',
    skills: ['pipeline-design', 'schema-review', 'etl-optimizer', 'data-quality-check', 'warehouse-planning', 'streaming-architecture'],
  },
  {
    slug: 'skill-pack-development', directory: 'skill-dev', module: 'dev_skill', title: 'Development Skill Pack', category: 'Development',
    description: 'Coding, architecture, UI design, testing, and repository automation workflows.',
    skills: ['refactor', 'frontend-design', 'web-design-reviewer', 'diagram-generator', 'webapp-testing', 'code-change-verification', 'mcp-builder', 'repo-contribution'],
  },
  {
    slug: 'skill-pack-devops', directory: 'skill-devops', module: 'devops_skill', title: 'DevOps Skill Pack', category: 'DevOps',
    description: 'Deployment planning, CI/CD, incident response, infrastructure audits, cloud cost, and system health.',
    skills: ['deployment-planning', 'ci-cd-review', 'incident-response', 'infra-audit', 'cloud-cost-review', 'system-health-check'],
  },
  {
    slug: 'skill-pack-finance', directory: 'skill-finance', module: 'finance_skill', title: 'Finance Skill Pack', category: 'Finance',
    description: 'Budget analysis, cash-flow forecasting, ROI reviews, expense optimization, and financial planning.',
    skills: ['budget-analysis', 'cashflow-forecasting', 'roi-review', 'expense-optimizer', 'variance-analysis', 'financial-planning'],
  },
  {
    slug: 'skill-pack-hr', directory: 'skill-hr', module: 'hr_skill', title: 'HR Skill Pack', category: 'HR',
    description: 'Hiring, onboarding, performance reviews, engagement insights, and policy support.',
    skills: ['hiring-assistant', 'onboarding-planner', 'performance-review-analyzer', 'employee-engagement-insights', 'talent-pipeline-review', 'policy-clarifier'],
  },
  {
    slug: 'skill-pack-legal', directory: 'skill-legal', module: 'legal_skill', title: 'Legal Skill Pack', category: 'Legal',
    description: 'Contract review, policy support, risk due diligence, regulatory mapping, and litigation summaries.',
    skills: ['contract-review', 'policy-extraction', 'risk-due-diligence', 'legal-research-assistant', 'regulatory-mapping', 'litigation-summary'],
  },
  {
    slug: 'skill-pack-marketing', directory: 'skill-marketing', module: 'marketing_skill', title: 'Marketing Skill Pack', category: 'Marketing',
    description: 'Campaign planning, audience segmentation, content strategy, SEO, and lead nurturing.',
    skills: ['campaign-planner', 'content-strategy', 'seo-audit', 'audience-segmentation', 'brand-positioning', 'lead-nurture-planner'],
  },
  {
    slug: 'skill-pack-operations', directory: 'skill-operations', module: 'operations_skill', title: 'Operations Skill Pack', category: 'Operations',
    description: 'Process mapping, resource planning, vendor management, capacity, service levels, and incidents.',
    skills: ['process-mapping', 'resource-planning', 'vendor-management', 'capacity-analysis', 'service-level-review', 'incident-prioritization'],
  },
  {
    slug: 'skill-pack-procurement', directory: 'skill-procurement', module: 'procurement_skill', title: 'Procurement Skill Pack', category: 'Procurement',
    description: 'Vendor evaluation, sourcing, contract optimization, supplier risk, purchasing, and negotiation.',
    skills: ['vendor-evaluation', 'sourcing-plan', 'contract-optimizer', 'supplier-risk-review', 'purchase-analysis', 'negotiation-support'],
  },
  {
    slug: 'skill-pack-product', directory: 'skill-product', module: 'product_skill', title: 'Product & Strategy Skill Pack', category: 'Product',
    description: 'Roadmaps, prioritization, competitive analysis, pricing, interviews, and decision support.',
    skills: ['roadmap-builder', 'feature-prioritizer', 'competitive-analysis', 'pricing-strategy', 'customer-interview-summarizer', 'decision-support-assistant'],
  },
  {
    slug: 'skill-pack-sales', directory: 'skill-sales', module: 'sales_skill', title: 'Sales Skill Pack', category: 'Sales',
    description: 'Lead prioritization, sales forecasting, proposals, pipeline review, and enablement.',
    skills: ['lead-prioritization', 'sales-forecast', 'proposal-generator', 'pipeline-review', 'renewal-risk-analyzer', 'sales-enablement'],
  },
  {
    slug: 'skill-pack-security', directory: 'skill-security', module: 'security_skill', title: 'Security & Compliance Skill Pack', category: 'Security',
    description: 'Threat modeling, vulnerability reviews, secure coding, access audits, privacy, and compliance.',
    skills: ['threat-modeling', 'vulnerability-review', 'secure-code-checker', 'access-audit', 'privacy-risk-assessment', 'policy-compliance-check'],
  },
];

export function getSkillPack(slug: string): SkillPack | undefined {
  return skillPacks.find((pack) => pack.slug === slug);
}
