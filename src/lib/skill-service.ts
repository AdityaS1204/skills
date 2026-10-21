import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";
import { getSkillBySlug, type Skill, type SkillFile } from "./skills-data.ts";

export interface CachedSkill {
  slug: string;
  name: string;
  description: string;
  version: string;
  repo: string;
  repoUrl: string;
  sourceUrl: string;
  sourceRevision: string;
  folderPath?: string;
  folderUrl?: string;
  otherFiles?: SkillFile[];
  frontmatter: Record<string, unknown>;
  content: string; // Markdown content without frontmatter
  updatedAt?: string;
}

// ponytail: single supabase client instance, skip extra wrapper class
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

async function fetchOtherFilesInFolder(
  repo: string,
  folderPath: string,
  branch: string = "main"
): Promise<SkillFile[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "RankFlow-Skills-Registry",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  // 1. Try GitHub Contents API
  try {
    const contentsUrl = folderPath
      ? `https://api.github.com/repos/${repo}/contents/${folderPath}?ref=${branch}`
      : `https://api.github.com/repos/${repo}/contents?ref=${branch}`;

    const res = await fetch(contentsUrl, { headers, next: { revalidate: 3600 } });
    if (res.ok) {
      const data = (await res.json()) as Array<{
        name: string;
        path: string;
        type: string;
        html_url?: string;
        size?: number;
      }>;
      if (Array.isArray(data)) {
        return data
          .filter((item) => {
            const lower = item.name.toLowerCase();
            return lower !== "skill.md" && !item.name.startsWith(".");
          })
          .map((item) => ({
            name: item.name,
            path: item.path,
            type: (item.type === "dir" ? "dir" : "file") as "file" | "dir",
            htmlUrl: item.html_url || `https://github.com/${repo}/blob/${branch}/${item.path}`,
            size: item.size,
          }));
      }
    }
  } catch {
    // continue to tree fallback
  }

  // 2. Fallback to Git Trees API
  try {
    const treeUrl = `https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=1`;
    const treeRes = await fetch(treeUrl, { headers, next: { revalidate: 3600 } });
    if (treeRes.ok) {
      const treeData = (await treeRes.json()) as { tree?: Array<{ path: string; type: string; size?: number }> };
      if (Array.isArray(treeData.tree)) {
        const prefix = folderPath ? `${folderPath}/` : "";
        return treeData.tree
          .filter((item) => {
            if (prefix && !item.path.startsWith(prefix)) return false;
            const relPath = prefix ? item.path.slice(prefix.length) : item.path;
            if (!relPath || relPath.includes("/")) return false;
            const lower = relPath.toLowerCase();
            return lower !== "skill.md" && !lower.startsWith(".");
          })
          .map((item) => {
            const name = item.path.split("/").pop() || item.path;
            const isDir = item.type === "tree";
            return {
              name,
              path: item.path,
              type: (isDir ? "dir" : "file") as "file" | "dir",
              htmlUrl: isDir
                ? `https://github.com/${repo}/tree/${branch}/${item.path}`
                : `https://github.com/${repo}/blob/${branch}/${item.path}`,
              size: item.size,
            };
          });
      }
    }
  } catch {
    // ignore
  }

  return [];
}

/**
 * Fetches SKILL.md directly from GitHub with intelligent path discovery.
 */
async function fetchSkillFromGithub(
  repo: string,
  slug: string,
  customPath?: string
): Promise<{
  rawText: string;
  sourceUrl: string;
  revision: string;
  folderPath: string;
  folderUrl: string;
  otherFiles: SkillFile[];
} | null> {
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
    "User-Agent": "RankFlow-Skills-Registry",
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
          const folderPath = path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
          const folderUrl = folderPath
            ? `https://github.com/${repo}/tree/${branch}/${folderPath}`
            : `https://github.com/${repo}/tree/${branch}`;
          const otherFiles = await fetchOtherFilesInFolder(repo, folderPath, branch);

          return {
            rawText,
            sourceUrl: `https://github.com/${repo}/blob/${branch}/${path}`,
            revision: branch,
            folderPath,
            folderUrl,
            otherFiles,
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
          "User-Agent": "RankFlow-Skills-Registry",
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
            const folderPath = found.path.includes("/") ? found.path.slice(0, found.path.lastIndexOf("/")) : "";
            const folderUrl = folderPath
              ? `https://github.com/${repo}/tree/${branch}/${folderPath}`
              : `https://github.com/${repo}/tree/${branch}`;
            const otherFiles = await fetchOtherFilesInFolder(repo, folderPath, branch);

            return {
              rawText,
              sourceUrl: `https://github.com/${repo}/blob/${branch}/${found.path}`,
              revision: branch,
              folderPath,
              folderUrl,
              otherFiles,
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
          folderPath: "",
          folderUrl: `https://github.com/${repo}/tree/${branch}`,
          otherFiles: [],
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
  let folderPath = localSkill?.skillPath && localSkill.skillPath.includes("/")
    ? localSkill.skillPath.slice(0, localSkill.skillPath.lastIndexOf("/"))
    : "";
  let folderUrl = folderPath
    ? `https://github.com/${repo}/tree/${revision}/${folderPath}`
    : localSkill?.repoUrl || `https://github.com/${repo}`;
  let otherFiles: SkillFile[] = localSkill?.otherFiles || [];

  if (githubResult) {
    rawMarkdown = githubResult.rawText;
    sourceUrl = githubResult.sourceUrl;
    revision = githubResult.revision;
    folderPath = githubResult.folderPath;
    folderUrl = githubResult.folderUrl;
    if (githubResult.otherFiles.length > 0) {
      otherFiles = githubResult.otherFiles;
    }
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
    folderPath,
    folderUrl,
    otherFiles,
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
