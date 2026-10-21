export interface SkillFile {
  name: string;
  path: string;
  type?: "file" | "dir";
  htmlUrl: string;
  size?: number;
}

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
  category: "Browser" | "Database" | "Productivity" | "Content" | "UI/UX" | "Design";
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
  otherFiles?: SkillFile[];
}

export const SKILLS: Skill[] = [
{
  slug: "anti-ai-slop-writing",
  name: "Anti AI Slop Writing",
  category: "Content",
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
  category: "Design",
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
  otherFiles: [
    {
      name: "LICENSE.txt",
      path: "skills/frontend-design/LICENSE.txt",
      htmlUrl: "https://github.com/anthropics/skills/blob/main/skills/frontend-design/LICENSE.txt",
    },
  ],
},
{
  slug: "Accessibility",                    
  name: "Web Accessibility",
  category: "UI/UX",                      
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
},
{
  slug: "improve-animations",
  name: "Improve Animations",
  category: "UI/UX",
  repo: "emilkowalski/skills",
  repoUrl: "https://github.com/emilkowalski/skills",
  skillPath: "skills/improve-animations/SKILL.md",
  image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80",
  description: "Survey a codebase's animation and motion code as a senior motion advisor, then produce prioritized audit and self-contained implementation plans.",
  version: "v1.0.0",
  tags: ["animation", "motion", "ui-ux", "framer-motion", "transitions"],
  verified: true,
  author: {
    name: "Emil Kowalski",
    handle: "emilkowalski",
    avatar: "https://github.com/emilkowalski.png?size=160",
  },
  installCommand: "npx skills add https://github.com/emilkowalski/skills --skill improve-animations",
  downloads: "18.5k",
  stars: "12.1k",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Survey a codebase's animation and motion code as a senior motion advisor, then produce prioritized audit and self-contained implementation plans. Read-only on source code — plans improvements without mutating code directly.",
  features: [
    "Recon scan of existing animation libraries and conventions",
    "Eight-category motion audit (purpose, easing, physicality, performance)",
    "Self-contained execution plans for agents and developers",
    "Verification feel-checks for transitions and gestures",
  ],
  permissions: ["repo:read"],
  otherFiles: [
    {
      name: "AUDIT.md",
      path: "skills/improve-animations/AUDIT.md",
      htmlUrl: "https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/AUDIT.md",
    },
    {
      name: "PLAN-TEMPLATE.md",
      path: "skills/improve-animations/PLAN-TEMPLATE.md",
      htmlUrl: "https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/PLAN-TEMPLATE.md",
    },
  ],
},
{
  slug: "animation-performance",
  name: "Animation Performance",
  category: "UI/UX",
  repo: "emilkowalski/skills",
  repoUrl: "https://github.com/emilkowalski/skills",
  skillPath: "skills/animation-performance/SKILL.md",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
  description: "Keep web animations inside the frame budget — animate composite-only properties, keep motion off the main thread, and diagnose dropped frames.",
  version: "v1.0.0",
  tags: ["animation", "performance", "motion", "ui-ux", "frame-rate", "waapi"],
  verified: true,
  author: {
    name: "Emil Kowalski",
    handle: "emilkowalski",
    avatar: "https://github.com/emilkowalski.png?size=160",
  },
  installCommand: "npx skills add https://github.com/emilkowalski/skills --skill animation-performance",
  downloads: "14.2k",
  stars: "12.1k",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Keep web animations inside the frame budget — animate composite-only properties, keep motion off the main thread when the page is busy, and find the cause when an animation drops frames.",
  features: [
    "Layout/paint/composite pipeline optimizations and property swaps",
    "CSS vs WAAPI vs requestAnimationFrame execution thread analysis",
    "Framer Motion hardware-accelerated path diagnostics",
    "React render cycle animation budget auditing and CSS variable inheritance checks",
  ],
  permissions: ["repo:read"],
  otherFiles: [],
}
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

