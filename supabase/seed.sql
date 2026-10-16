insert into users (email, name, role, hashed_password)
values ('demo-seller@ai-marketplace.example', 'AI Marketplace Demo Seller', 'seller', 'seeded-demo-user')
on conflict (email) do update set name = excluded.name, role = excluded.role;

insert into plans (name, price, interval, trial_days, features)
values
  ('starter', 0, 'month', 0, '["Public templates", "Community updates"]'::jsonb),
  ('pro', 19, 'month', 30, '["All premium skill packs", "Version updates", "Commercial license", "First month free"]'::jsonb),
  ('team', 49, 'month', 30, '["Everything in Pro", "Team sharing", "Priority support", "First month free"]'::jsonb)
on conflict (name) do update set price = excluded.price, interval = excluded.interval, trial_days = excluded.trial_days, features = excluded.features;

insert into products (seller_id, slug, title, category, short_description, description, price, is_free, status, created_at)
select u.id, p.slug, p.title, p.category, p.short_description, p.description, p.price, p.is_free, 'approved', p.created_at
from users u
cross join (values
  ('promptops-agent-kit', 'PromptOps Agent Kit', 'AI Agents', 'Production prompts and evaluation loops for reliable tool-using agents.', 'A practical starter kit for planner-executor agents, tool schemas, fallback handling, and quality gates. Includes evaluation prompts and rollout checklists.', 29.00, false, now() - interval '2 days'),
  ('rag-evaluation-lab', 'RAG Evaluation Lab', 'RAG & Search', 'Measure retrieval quality, groundedness, and answer usefulness before release.', 'A repeatable evaluation pack with golden datasets, retrieval metrics, citation checks, and regression review templates for enterprise RAG systems.', 39.00, false, now() - interval '5 days'),
  ('mcp-security-guardrails', 'MCP Security Guardrails', 'Security', 'Secure tool servers with provenance checks, least privilege, and audit-ready policies.', 'Reference policies and implementation patterns for MCP servers, sensitive tool calls, approval gates, prompt injection defenses, and security reviews.', 49.00, false, now() - interval '8 days'),
  ('document-intelligence-pipeline', 'Document Intelligence Pipeline', 'Document AI', 'Extract structured knowledge from PDF, DOCX, and spreadsheet workflows.', 'A production workflow for ingestion, OCR handoff, chunking, metadata enrichment, human review, and searchable knowledge-base publishing.', 35.00, false, now() - interval '11 days'),
  ('support-copilot-workflows', 'Support Copilot Workflows', 'Customer Support', 'Turn support tickets into grounded drafts, classifications, and next actions.', 'Reusable workflows for triage, policy retrieval, response drafting, escalation routing, and quality sampling across support operations.', 24.00, false, now() - interval '14 days'),
  ('llm-observability-starter', 'LLM Observability Starter', 'Operations', 'Track latency, cost, tool failures, and answer quality from day one.', 'Dashboards and event schemas for tracing agent runs, monitoring p95 latency, detecting error spikes, and reviewing production feedback.', 0.00, true, now() - interval '18 days')
) as p(slug, title, category, short_description, description, price, is_free, created_at)
where u.email = 'demo-seller@ai-marketplace.example'
on conflict (slug) do update set seller_id = excluded.seller_id, title = excluded.title, category = excluded.category, short_description = excluded.short_description, description = excluded.description, price = excluded.price, is_free = excluded.is_free, status = 'approved';

insert into reviews (product_id, user_id, rating, comment)
select p.id, u.id, r.rating, r.comment
from products p
cross join users u
cross join (values
  ('promptops-agent-kit', 5, 'Clear rollout checklists and useful evaluation prompts.'),
  ('rag-evaluation-lab', 5, 'The retrieval and groundedness scorecards are immediately useful.'),
  ('mcp-security-guardrails', 4, 'Strong starting point for tool approval and provenance controls.'),
  ('document-intelligence-pipeline', 5, 'Good coverage from ingestion through human review.')
) as r(slug, rating, comment)
where p.slug = r.slug and u.email = 'demo-seller@ai-marketplace.example'
  and not exists (select 1 from reviews existing where existing.product_id = p.id and existing.user_id = u.id and existing.comment = r.comment);
