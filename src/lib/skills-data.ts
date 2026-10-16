export interface Skill {
  slug: string;
  name: string;
  repo: string; // Just the repo name e.g. "agent-skills/browser"
  repoUrl: string;
  skillPath?: string; // Optional path to SKILL.md in repo
  image: string;
  description: string;
  version: string;
  downloads: string;
  stars: number | string;
  category: "Browser" | "Runtime" | "Database" | "Productivity" | "DevOps";
  tags: string[];
  verified?: boolean;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  license?: string;
  lastUpdated?: string;
  installCommand?: string;
  overview?: string;
  features?: string[];
  permissions?: string[];
  codeSample?: string;
}

export const SKILLS: Skill[] = [
{
  slug: "github-pr-reviewer",
  name: "GitHub PR Reviewer",
  category: "DevOps",
  repo: "octocat/pr-reviewer-skill",
  repoUrl: "https://github.com/octocat/pr-reviewer-skill",
  image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=120&auto=format&fit=crop&q=80",
  description: "Autonomous code review agent that scans diffs, flags security risks, and comments inline.",
  version: "v1.0.0",
  tags: ["github", "code-review", "devops"],
  verified: true,
  author: {
    name: "Octocat",
    handle: "octocat",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&auto=format&fit=crop&q=80"
  },
  installCommand: "npx agent-skills add github-pr-reviewer",
  downloads: "4.8k",
  stars: "1.2k",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Automated PR review agent integrating with GitHub Actions and branch protection rules.",
  features: ["Static analysis", "Inline line comments", "Automated approval delegation"],
  permissions: ["repo:read", "pull-requests:write"],
  codeSample: `import { Reviewer } from "octocat/pr-reviewer-skill";\nconst agent = new Reviewer();\nawait agent.reviewPR({ prNumber: 42 });`
},
{
  slug: "code-sandbox-sdk",
  name: "Anti AI Sop Writing",
  category: "DevOps",
  repo: "jalaalrd/anti-ai-slop-writing",
  repoUrl: "https://github.com/jalaalrd/anti-ai-slop-writing",
  skillPath: "skills/anti-ai-slop-writing/SKILL.md",
  image: "https://images.unsplash.com/photo-1635776062043-223faf322554?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  description: "Produce human-sounding text that avoids detectable AI patterns with banned vocabulary, structural variety, and voice calibration.",
  version: "v1.0.0",
  tags: ["github", "Anti-ai-writing", "content"],
  verified: true,
  author: {
    name: "jalaalrd",
    handle: "jalaalrd",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&auto=format&fit=crop&q=80"
  },
  installCommand: "npx skills@latest add jalaalrd/anti-ai-slop-writing",
  downloads: "4.8k",
  stars: "0.5k",
  license: "MIT",
  lastUpdated: "Today",
  overview: "AI writing skill that eliminates detectable AI patterns. Works with Claude Code, Codex, Cursor, Gemini CLI, and 8+ other agents.",
  features: ["Banned words filter", "Sentence structure variety", "Voice calibration", "Plagiarism-safe content generation", "Fast & lightweight"],
  permissions: ["repo:read", "pull-requests:write"],
},
{
  slug: "frontend-design",
  name: "Frontend Design",
  category: "Productivity",
  repo: "anthropics/skills",
  repoUrl: "https://github.com/anthropics/skills",
  skillPath: "skills/frontend-design/SKILL.md",
  image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=120&auto=format&fit=crop&q=80",
  description: "Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code and UI design that avoids generic AI aesthetics.",
  version: "v1.0.0",
  tags: ["frontend", "design", "ui", "anthropic", "web"],
  verified: true,
  author: {
    name: "anthropics",
    handle: "anthropics",
    avatar: "https://github.com/anthropics.png?size=160",
  },
  installCommand: "npx skills add https://github.com/anthropics/skills --skill frontend-design",
  downloads: "14.2k",
  stars: "9.8k",
  license: "Complete terms in LICENSE.txt",
  lastUpdated: "Today",
  overview: "Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code and UI design that avoids generic AI aesthetics.",
  features: [
    "Distinct visual identities avoiding cliché or templated looks",
    "Anti-slop typography and layout heuristics",
    "Motion discipline and intentional animations",
    "Writing and copywriting intentionality in design",
    "Production-grade frontend craft and CSS specificity discipline",
  ],
  permissions: ["repo:read"],
},
{
  slug: "Accessibility",                    
  name: "Web Accessibility",
  category: "Productivity",                      
  repo: "addyosmani/web-quality-skills",                  
  repoUrl: "https://github.com/addyosmani/web-quality-skills/tree/main/skills",
  skillPath: "skills/accessibility/SKILL.md",  
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
  description: "Audit and improve web accessibility following WCAG 2.2 guidelines.",
  version: "v1.0.0",
  tags: ["web-accessibility", "web-dev", "a11y"],
  verified: true,
  author: {
    name: "addyosmani",
    handle: "addyosmani",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&auto=format&fit=crop&q=80",
  },
  installCommand: "npx skills@latest add addyosmani/web-quality-skills",
  downloads: "1.5k",
  stars: "850",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Automated accessibility checking and WCAG 2.2 remediation for web projects.",
  features: ["Automated WCAG 2.2 checks", "Screen reader auditing", "Keyboard navigation validation"],
  permissions: ["repo:read"],
}
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

