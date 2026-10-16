import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";
import { getSkillBySlug, type Skill } from "./skills-data";

export interface CachedSkill {
  slug: string;
  name: string;
  description: string;
  version: string;
  repo: string;
  repoUrl: string;
  sourceUrl: string;
  sourceRevision: string;
  frontmatter: Record<string, unknown>;
  content: string; // Markdown content without frontmatter
  updatedAt?: string;
}

// ponytail: single supabase client instance, skip extra wrapper class
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

/**
 * Fetches SKILL.md directly from GitHub with intelligent path discovery.
 */
async function fetchSkillFromGithub(
  repo: string,
  slug: string,
  customPath?: string
): Promise<{ rawText: string; sourceUrl: string; revision: string } | null> {
  const branches = ["main", "master"];
  const repoName = repo.includes("/") ? repo.split("/")[1] : repo;

  // 1. Direct candidate paths to try first
  const candidatePaths: string[] = [];
  if (customPath) candidatePaths.push(customPath);
  candidatePaths.push(
    "SKILL.md",
    `skills/${repoName}/SKILL.md`,
    `skills/${slug}/SKILL.md`,
    "skills/SKILL.md"
  );

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3.raw",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  for (const branch of branches) {
    for (const path of candidatePaths) {
      const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
      try {
        const res = await fetch(url, { headers, next: { revalidate: 3600 } });
        if (res.ok) {
          const rawText = await res.text();
          return {
            rawText,
            sourceUrl: `https://github.com/${repo}/blob/${branch}/${path}`,
            revision: branch,
          };
        }
      } catch {
        // continue to next candidate
      }
    }
  }

  // 2. Dynamic discovery: search repository tree for any SKILL.md
  for (const branch of branches) {
    try {
      const treeUrl = `https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=1`;
      const treeRes = await fetch(treeUrl, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
        next: { revalidate: 3600 },
      });

      if (treeRes.ok) {
        const treeData = (await treeRes.json()) as { tree?: Array<{ path: string; type: string }> };
        const found = treeData.tree?.find(
          (item) => item.type === "blob" && /(?:^|\/)SKILL\.md$/i.test(item.path)
        );

        if (found) {
          const rawUrl = `https://raw.githubusercontent.com/${repo}/${branch}/${found.path}`;
          const rawRes = await fetch(rawUrl, { headers, next: { revalidate: 3600 } });
          if (rawRes.ok) {
            const rawText = await rawRes.text();
            return {
              rawText,
              sourceUrl: `https://github.com/${repo}/blob/${branch}/${found.path}`,
              revision: branch,
            };
          }
        }
      }
    } catch {
      // continue to next branch or fallback
    }
  }

  // 3. Fallback to README.md
  for (const branch of branches) {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/README.md`;
    try {
      const res = await fetch(url, { headers, next: { revalidate: 3600 } });
      if (res.ok) {
        const rawText = await res.text();
        return {
          rawText,
          sourceUrl: `https://github.com/${repo}/blob/${branch}/README.md`,
          revision: branch,
        };
      }
    } catch {
      // continue
    }
  }

  return null;
}

/**
 * Generates fallback markdown for local mock skills if repo is inaccessible.
 */
function generateFallbackMarkdown(localSkill: Skill): string {
  return `---
name: ${localSkill.name}
description: "${localSkill.description}"
version: ${localSkill.version}
license: ${localSkill.license}
author: "${localSkill.author.name} (@${localSkill.author.handle})"
---

# ${localSkill.name}

${localSkill.overview}

## Key Capabilities
${(localSkill.features ?? []).map((f) => `- ${f}`).join("\n")}

## Installation
\`\`\`bash
${localSkill.installCommand}
\`\`\`

## Usage Example
\`\`\`typescript
${localSkill.codeSample}
\`\`\`

## Declared Agent Permissions
${(localSkill.permissions ?? []).map((p) => `- \`${p}\``).join("\n")}
`;
}

/**
 * Main skill loader: Supabase Cache -> GitHub Fetcher -> Local Fallback.
 */
export async function getSkillWithMarkdown(slug: string): Promise<CachedSkill | null> {
  const localSkill = getSkillBySlug(slug);

  // 1. Try reading from Supabase Cache
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        return {
          slug: data.slug,
          name: data.name,
          description: data.description,
          version: data.version,
          repo: data.repo,
          repoUrl: data.repo_url,
          sourceUrl: data.source_url,
          sourceRevision: data.source_revision,
          frontmatter: data.frontmatter || {},
          content: data.content,
          updatedAt: data.updated_at,
        };
      }
    } catch {
      // Supabase connection or table error; gracefully continue
    }
  }

  // 2. Fetch from GitHub if repo is defined
  const repo = localSkill?.repo || slug;
  const githubResult = await fetchSkillFromGithub(repo, slug, localSkill?.skillPath);

  let rawMarkdown = "";
  let sourceUrl = localSkill?.repoUrl || `https://github.com/${repo}`;
  let revision = "main";

  if (githubResult) {
    rawMarkdown = githubResult.rawText;
    sourceUrl = githubResult.sourceUrl;
    revision = githubResult.revision;
  } else if (localSkill) {
    // 3. Fallback to synthetic SKILL.md from local skill data
    rawMarkdown = generateFallbackMarkdown(localSkill);
  } else {
    return null;
  }

  // Parse YAML frontmatter using gray-matter
  const { data: frontmatter, content } = matter(rawMarkdown);

  const skillRecord: CachedSkill = {
    slug,
    name: (frontmatter.name as string) || localSkill?.name || slug,
    description: (frontmatter.description as string) || localSkill?.description || "",
    version: (frontmatter.version as string) || localSkill?.version || "1.0.0",
    repo,
    repoUrl: localSkill?.repoUrl || `https://github.com/${repo}`,
    sourceUrl,
    sourceRevision: revision,
    frontmatter,
    content,
  };

  // 4. Cache to Supabase in background / inline if connected
  if (supabase) {
    try {
      await supabase.from("skills").upsert({
        slug: skillRecord.slug,
        name: skillRecord.name,
        description: skillRecord.description,
        version: skillRecord.version,
        repo: skillRecord.repo,
        repo_url: skillRecord.repoUrl,
        source_url: skillRecord.sourceUrl,
        source_revision: skillRecord.sourceRevision,
        frontmatter: skillRecord.frontmatter,
        content: skillRecord.content,
        updated_at: new Date().toISOString(),
      });
    } catch {
      // Non-blocking cache write failure
    }
  }

  return skillRecord;
}
