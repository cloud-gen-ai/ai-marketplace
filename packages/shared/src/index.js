export const productCatalog = [
  {
    id: 'prod_dev_001',
    slug: 'copilot-shipit-suite',
    title: 'Copilot ShipIt Suite',
    category: 'Development',
    price: 29,
    currency: 'USD',
    rating: 4.9,
    reviews: 128,
    description: 'Reusable GitHub Copilot workflows for engineering teams shipping faster with code review, pull request hygiene, and release checklists.',
    tags: ['github-copilot', 'workflow', 'devops'],
    status: 'featured',
    compatibleWith: ['GitHub Copilot', 'Claude Code', 'Cursor']
  },
  {
    id: 'prod_marketing_002',
    slug: 'growth-launch-kit',
    title: 'Growth Launch Kit',
    category: 'Marketing',
    price: 19,
    currency: 'USD',
    rating: 4.8,
    reviews: 94,
    description: 'Campaign planning, launch messaging, growth experiments, and performance prompts for digital marketing teams.',
    tags: ['marketing', 'growth', 'campaigns'],
    status: 'popular',
    compatibleWith: ['Claude', 'OpenAI', 'ChatGPT']
  },
  {
    id: 'prod_sales_003',
    slug: 'sales-playbook-bundle',
    title: 'Sales Playbook Bundle',
    category: 'Sales',
    price: 24,
    currency: 'USD',
    rating: 4.7,
    reviews: 77,
    description: 'Outbound messaging frameworks, call prep templates, objection handling, and deal review systems for B2B sales teams.',
    tags: ['sales', 'crm', 'outbound'],
    status: 'new',
    compatibleWith: ['GitHub Copilot', 'Claude Code', 'Custom Agents']
  },
  {
    id: 'prod_ai_004',
    slug: 'agentops-blueprint',
    title: 'AgentOps Blueprint',
    category: 'AI Agents',
    price: 39,
    currency: 'USD',
    rating: 5.0,
    reviews: 66,
    description: 'Operational playbooks for building, evaluating, and governing AI agents in teams and product workflows.',
    tags: ['agents', 'operations', 'llm'],
    status: 'featured',
    compatibleWith: ['Claude Code', 'OpenAI', 'Cursor']
  }
];

export const stats = {
  totalProducts: 142,
  activeCreators: 38,
  monthlySubscribers: 4127,
  avgRating: 4.8
};

export function formatPrice(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export default productCatalog;
