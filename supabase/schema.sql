-- Schema for Skill Details Cache in Supabase (PostgreSQL)

create table if not exists skills (
  slug text primary key,
  name text not null,
  description text,
  version text,
  repo text,
  repo_url text,
  source_url text,
  source_revision text, -- Commit SHA, branch, or release tag
  frontmatter jsonb default '{}'::jsonb,
  content text not null, -- Raw markdown content (SKILL.md)
  updated_at timestamptz default now()
);

-- Index for cache freshness lookups
create index if not exists idx_skills_updated_at on skills(updated_at);

-- Enable Row Level Security (RLS)
alter table skills enable row level security;

-- Public can read cached skills
create policy "Allow public read access"
  on skills
  for select
  using (true);

-- Allow server / service role to upsert cached skills
create policy "Allow service role upsert access"
  on skills
  for all
  using (true)
  with check (true);
