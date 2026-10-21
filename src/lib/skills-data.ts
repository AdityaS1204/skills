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
  image: "https://github.com/jalaalrd.png?size=160",
  description: "Produce human-sounding text that avoids detectable AI patterns with banned vocabulary, structural variety, and voice calibration.",
  version: "v1.0.0",
  tags: ["github", "Anti-ai-writing", "content"],
  verified: true,
  author: {
    name: "jalaalrd",
    handle: "jalaalrd",
    avatar: "https://github.com/jalaalrd.png?size=160"
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
  image: "https://github.com/anthropics.png?size=160",
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
  image: "https://github.com/addyosmani.png?size=160",
  description: "Audit and improve web accessibility following WCAG 2.2 guidelines.",
  version: "v1.0.0",
  tags: ["web-accessibility", "web-dev", "a11y"],
  verified: true,
  author: {
    name: "addyosmani",
    handle: "addyosmani",
    avatar: "https://github.com/addyosmani.png?size=160",
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
  image: "https://github.com/emilkowalski.png?size=160",
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
  image: "https://github.com/emilkowalski.png?size=160",
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
},
{
  slug: "better-accessibility",
  name: "Better Accessibility",
  category: "UI/UX",
  repo: "jakubkrehel/skills",
  repoUrl: "https://github.com/jakubkrehel/skills",
  skillPath: "skills/better-accessibility/SKILL.md",
  image: "https://github.com/jakubkrehel.png?size=160",
  description: "Reviews and fixes keyboard and focus behavior, ARIA, accessible names, forms, screen-reader announcements, motion and zoom against WCAG 2.2.",
  version: "v1.0.0",
  tags: ["accessibility", "a11y", "wcag", "screen-readers", "keyboard-navigation", "ui-ux"],
  verified: true,
  author: {
    name: "Jakub Krehel",
    handle: "jakubkrehel",
    avatar: "https://github.com/jakubkrehel.png?size=160",
  },
  installCommand: "npx skills add https://github.com/jakubkrehel/skills --skill better-accessibility",
  downloads: "9.4k",
  stars: "8.1k",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Reviews and fixes semantics, keyboard and focus behavior, accessible names, forms, announcements, motion and zoom against WCAG 2.2 Level A and AA standards.",
  features: [
    "Keyboard-only navigation audits and focus behavior validation",
    "Screen-reader announcement and ARIA attribute verification",
    "Form inputs, labeling, and error state remediation",
    "Target sizes and hit areas check against WCAG 2.2 criteria",
  ],
  permissions: ["repo:read"],
  otherFiles: [
    {
      name: "focus-and-keyboard.md",
      path: "skills/better-accessibility/focus-and-keyboard.md",
      type: "file",
      htmlUrl: "https://github.com/jakubkrehel/skills/blob/main/skills/better-accessibility/focus-and-keyboard.md",
      size: 6495,
    },
    {
      name: "forms.md",
      path: "skills/better-accessibility/forms.md",
      type: "file",
      htmlUrl: "https://github.com/jakubkrehel/skills/blob/main/skills/better-accessibility/forms.md",
      size: 3491,
    },
    {
      name: "hit-areas.md",
      path: "skills/better-accessibility/hit-areas.md",
      type: "file",
      htmlUrl: "https://github.com/jakubkrehel/skills/blob/main/skills/better-accessibility/hit-areas.md",
      size: 3262,
    },
    {
      name: "motion-and-zoom.md",
      path: "skills/better-accessibility/motion-and-zoom.md",
      type: "file",
      htmlUrl: "https://github.com/jakubkrehel/skills/blob/main/skills/better-accessibility/motion-and-zoom.md",
      size: 2436,
    },
    {
      name: "screen-readers.md",
      path: "skills/better-accessibility/screen-readers.md",
      type: "file",
      htmlUrl: "https://github.com/jakubkrehel/skills/blob/main/skills/better-accessibility/screen-readers.md",
      size: 4633,
    },
    {
      name: "semantics-and-aria.md",
      path: "skills/better-accessibility/semantics-and-aria.md",
      type: "file",
      htmlUrl: "https://github.com/jakubkrehel/skills/blob/main/skills/better-accessibility/semantics-and-aria.md",
      size: 4636,
    },
  ],
},
{
  slug: "react-best-practices",
  name: "React Best Practices",
  category: "UI/UX",
  repo: "vercel-labs/agent-skills",
  repoUrl: "https://github.com/vercel-labs/agent-skills",
  skillPath: "skills/react-best-practices/SKILL.md",
  image: "https://github.com/vercel-labs.png?size=160",
  description: "React and Next.js performance optimization guidelines from Vercel Engineering. Contains 70 rules across 8 categories for optimal patterns.",
  version: "v1.0.0",
  tags: ["react", "nextjs", "performance", "vercel", "ui-ux", "best-practices"],
  verified: true,
  author: {
    name: "Vercel Labs",
    handle: "vercel-labs",
    avatar: "https://github.com/vercel-labs.png?size=160",
  },
  installCommand: "npx skills add https://github.com/vercel-labs/agent-skills --skill react-best-practices",
  downloads: "45.8k",
  stars: "32.7k",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 70 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.",
  features: [
    "Eliminating waterfalls and async dependency optimization",
    "Bundle size reduction and direct module imports",
    "Server-side performance and streaming rendering patterns",
    "Re-render optimization and client data fetching guidelines",
  ],
  permissions: ["repo:read"],
  otherFiles: [
    {
      name: "AGENTS.md",
      path: "skills/react-best-practices/AGENTS.md",
      type: "file",
      htmlUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/AGENTS.md",
      size: 108261,
    },
    {
      name: "README.md",
      path: "skills/react-best-practices/README.md",
      type: "file",
      htmlUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/README.md",
      size: 3360,
    },
    {
      name: "metadata.json",
      path: "skills/react-best-practices/metadata.json",
      type: "file",
      htmlUrl: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/metadata.json",
      size: 921,
    },
    {
      name: "rules",
      path: "skills/react-best-practices/rules",
      type: "dir",
      htmlUrl: "https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices/rules",
    },
  ],
}
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

