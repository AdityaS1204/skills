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
  category: "Browser" | "Productivity" | "Content" | "UI/UX" | "Design";
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
},
{
  slug: "apple-design",
  name: "Apple Design",
  category: "Design",
  repo: "emilkowalski/skills",
  repoUrl: "https://github.com/emilkowalski/skills",
  skillPath: "skills/apple-design/SKILL.md",
  image: "https://github.com/emilkowalski.png?size=160",
  description: "Apple's approach to interface design and fluid, physical motion, translated for the web. Covers gesture-driven UI, spring animations, momentum, and depth.",
  version: "v1.0.0",
  tags: ["apple", "design", "motion", "springs", "gestures", "ui-ux", "fluid-interfaces"],
  verified: true,
  author: {
    name: "Emil Kowalski",
    handle: "emilkowalski",
    avatar: "https://github.com/emilkowalski.png?size=160",
  },
  installCommand: "npx skills add https://github.com/emilkowalski/skills --skill apple-design",
  downloads: "22.4k",
  stars: "12.1k",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Apple's approach to interface design and fluid, physical motion, translated for the web. Covers gesture-driven UI, spring animations, drag/swipe/sheet interactions, momentum and interruptible transitions, translucent materials, and depth.",
  features: [
    "Fluid interface principles distilled from Apple WWDC design talks",
    "Velocity-aware interruptible spring physics and momentum projection",
    "Pointer-down instant response and continuous gesture tracking",
    "Translucent materials, blur layers, and spatial consistency",
  ],
  permissions: ["repo:read"],
  otherFiles: [],
},
{
  slug: "animate-svg",
  name: "Animate SVG",
  category: "Design",
  repo: "AdityaS1204/skills-github",
  repoUrl: "https://github.com/AdityaS1204/skills-github",
  skillPath: "skills/animate-svg/SKILL.md",
  image: "https://github.com/AdityaS1204.png?size=160",
  description: "Create beautiful, performant SVG animations and illustrations. Covers SMIL animations, CSS-driven SVG, path drawing, and shape morphing.",
  version: "v1.0.0",
  tags: ["svg", "animation", "smil", "css-animation", "path-drawing", "design", "ui-ux"],
  verified: true,
  author: {
    name: "Aditya Singh",
    handle: "AdityaS1204",
    avatar: "https://github.com/AdityaS1204.png?size=160",
  },
  installCommand: "npx skills add https://github.com/AdityaS1204/skills-github --skill animate-svg",
  downloads: "1k",
  stars: "0",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Handcraft beautiful, resolution-independent SVG animations — from lightweight micro-interactions and animated UI icons to multi-stage vector illustrations, path-drawing reveals, and shape-morphing transitions.",
  features: [
    "SMIL animations for standalone SVG in <img> or background-image",
    "CSS keyframe and transition-driven SVG animations for inline SVGs",
    "Path-drawing line reveals, checkmarks, and progress outlines",
    "Shape-morphing transitions and helper scripts for SVG geometry",
  ],
  permissions: ["repo:read"],
  otherFiles: [
    {
      name: "examples",
      path: "skills/animate-svg/examples",
      type: "dir",
      htmlUrl: "https://github.com/AdityaS1204/skills-github/tree/main/skills/animate-svg/examples",
    },
    {
      name: "scripts",
      path: "skills/animate-svg/scripts",
      type: "dir",
      htmlUrl: "https://github.com/AdityaS1204/skills-github/tree/main/skills/animate-svg/scripts",
    },
  ],
},
{
  slug: "security-audit",
  name: "Vibe Security Audit",
  category: "Productivity",
  repo: "AdityaS1204/skills-github",
  repoUrl: "https://github.com/AdityaS1204/skills-github",
  skillPath: "skills/security-audit/SKILL.md",
  image: "https://github.com/AdityaS1204.png?size=160",
  description: "Pre-launch security and performance audit for AI-built apps. Audits Supabase/Firebase RLS, leaked API keys, IDOR, auth tokens, and rate limiting.",
  version: "v1.0.0",
  tags: ["security", "audit", "supabase", "rls", "pre-launch", "secrets", "performance"],
  verified: true,
  author: {
    name: "Aditya Singh",
    handle: "AdityaS1204",
    avatar: "https://github.com/AdityaS1204.png?size=160",
  },
  installCommand: "npx skills add https://github.com/AdityaS1204/skills-github --skill security-audit",
  downloads: "2k",
  stars: "0",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Pre-launch security and performance audit for AI-built ('vibe coded') web and mobile apps. Inspects codebases for row-level security, secret leaks, missing authorization, and rate limiting.",
  features: [
    "Automated secret scanner for leaked API keys and service-role tokens",
    "Supabase and PostgreSQL Row Level Security (RLS) validation",
    "API route scanner for missing authorization, IDOR, and rate limiting",
    "Webhook verification checks for Stripe and payment gateways",
  ],
  permissions: ["repo:read"],
  otherFiles: [
    {
      name: "assets",
      path: "skills/security-audit/assets",
      type: "dir",
      htmlUrl: "https://github.com/AdityaS1204/skills-github/tree/main/skills/security-audit/assets",
    },
    {
      name: "references",
      path: "skills/security-audit/references",
      type: "dir",
      htmlUrl: "https://github.com/AdityaS1204/skills-github/tree/main/skills/security-audit/references",
    },
    {
      name: "scripts",
      path: "skills/security-audit/scripts",
      type: "dir",
      htmlUrl: "https://github.com/AdityaS1204/skills-github/tree/main/skills/security-audit/scripts",
    },
  ],
},
{
  slug: "to-issues",
  name: "To Issues",
  category: "Productivity",
  repo: "mattpocock/skills",
  repoUrl: "https://github.com/mattpocock/skills",
  skillPath: "skills/engineering/to-tickets/SKILL.md",
  image: "https://github.com/mattpocock.png?size=160",
  description: "Break a plan, spec, or conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to your issue tracker.",
  version: "v1.0.0",
  tags: ["productivity", "engineering", "tickets", "issues", "specs", "planning", "tracer-bullet"],
  verified: true,
  author: {
    name: "Matt Pocock",
    handle: "mattpocock",
    avatar: "https://github.com/mattpocock.png?size=160",
  },
  installCommand: "npx skills add https://github.com/mattpocock/skills --skill to-tickets",
  downloads: "68.4k",
  stars: "29.9k",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Break a plan, spec, or conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the configured issue tracker (GitHub Issues, Linear, Jira, or markdown files).",
  features: [
    "Drafts tracer-bullet vertical slices rather than horizontal architectural layers",
    "Declares explicit dependency blocking edges between issues and tickets",
    "Supports native GitHub sub-issues, Linear parent-child relationships, or markdown files",
    "Integrates with domain glossary and architectural decision records (ADRs)",
  ],
  permissions: ["repo:read", "issues:write"],
  otherFiles: [
    {
      name: "agents",
      path: "skills/engineering/to-tickets/agents",
      type: "dir",
      htmlUrl: "https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets/agents",
    },
  ],
},
{
  slug: "improve",
  name: "Improve",
  category: "Productivity",
  repo: "shadcn/improve",
  repoUrl: "https://github.com/shadcn/improve",
  skillPath: "skills/improve/SKILL.md",
  image: "https://github.com/shadcn.png?size=160",
  description: "Survey any codebase as a senior advisor and produce prioritized, self-contained implementation plans for other models/agents to execute.",
  version: "v1.0.0",
  tags: ["codebase-audit", "planning", "agent-handoff", "productivity", "architecture"],
  verified: true,
  author: {
    name: "shadcn",
    handle: "shadcn",
    avatar: "https://github.com/shadcn.png?size=160",
  },
  installCommand: "npx skills add https://github.com/shadcn/improve --skill improve",
  downloads: "54.2k",
  stars: "9.2k",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Survey any codebase as a senior advisor and produce prioritized, self-contained implementation plans for other models/agents to execute. Strictly read-only on source code — plans are the product.",
  features: [
    "Comprehensive codebase reconnaissance across architecture, stack, and patterns",
    "Audit findings spanning security, performance, bugs, tech debt, and DX",
    "Self-contained execution plans for dispatching to executor subagents",
    "Strictly read-only on source code with zero unintended mutations",
  ],
  permissions: ["repo:read"],
  otherFiles: [
    {
      name: "references",
      path: "skills/improve/references",
      type: "dir",
      htmlUrl: "https://github.com/shadcn/improve/tree/main/skills/improve/references",
    },
  ],
},
{
  slug: "linkedin-hook",
  name: "LinkedIn Hook Generator",
  category: "Content",
  repo: "AdityaS1204/skills-github",
  repoUrl: "https://github.com/AdityaS1204/skills-github",
  skillPath: "skills/linkedin-hook/SKILL.md",
  image: "https://github.com/AdityaS1204.png?size=160",
  description: "Generate LinkedIn post hooks — the critical first 2 lines that determine whether anyone reads your post.",
  version: "v1.0.0",
  tags: ["linkedin", "content", "copywriting", "hooks", "marketing", "social-media"],
  verified: true,
  author: {
    name: "Aditya Singh",
    handle: "AdityaS1204",
    avatar: "https://github.com/AdityaS1204.png?size=160",
  },
  installCommand: "npx skills add https://github.com/AdityaS1204/skills-github --skill linkedin-hook",
  downloads: "2.8k",
  stars: "1.2k",
  license: "MIT",
  lastUpdated: "Today",
  overview: "Generate targeted, high-converting LinkedIn post hooks — the critical first two lines before '…see more' — from design visuals, carousels, and newsletters.",
  features: [
    "Generates 13 pattern-matched hooks from a proven hook library",
    "Generates 5 original hooks with surprising angles and structures",
    "Analyzes carousel designs and newsletter files for sharp angles",
    "Optimized specifically for high click-through to '…see more'",
  ],
  permissions: ["repo:read"],
  otherFiles: [],
},
{
  slug: "agent-browser",
  name: "Agent Browser",
  category: "Browser",
  repo: "vercel-labs/agent-browser",
  repoUrl: "https://github.com/vercel-labs/agent-browser",
  skillPath: "skills/agent-browser/SKILL.md",
  image: "https://github.com/vercel-labs.png?size=160",
  description: "Fast browser automation CLI for AI agents via CDP with accessibility-tree snapshots and compact element refs.",
  version: "v1.0.0",
  tags: ["browser", "automation", "cdp", "agent-browser", "qa", "testing", "web"],
  verified: true,
  author: {
    name: "Vercel Labs",
    handle: "vercel-labs",
    avatar: "https://github.com/vercel-labs.png?size=160",
  },
  installCommand: "npx skills add https://github.com/vercel-labs/agent-browser --skill agent-browser",
  downloads: "89.2k",
  stars: "44.3k",
  license: "Apache-2.0",
  lastUpdated: "Today",
  overview: "Fast browser automation CLI for AI agents. Controls Chrome/Chromium via CDP with accessibility-tree snapshots and compact @eN element refs for navigating, filling forms, and QA testing.",
  features: [
    "Chrome/Chromium automation via Chrome DevTools Protocol (CDP)",
    "Accessibility-tree snapshots with compact @eN element references",
    "Form filling, button clicking, screenshot capturing, and web app testing",
    "Electron desktop apps and microVM sandbox automation support",
  ],
  permissions: ["browser:control", "shell:execute"],
  otherFiles: [],
},
 {
    "slug": "ui-ux-pro-max",
    "name": "UI/UX Pro Max",
    "category": "UI/UX",
    "repo": "nextlevelbuilder/ui-ux-pro-max-skill",
    "repoUrl": "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
    "skillPath": ".claude/skills/ui-ux-pro-max/SKILL.md",
    "image": "https://github.com/nextlevelbuilder.png?size=160",
    "description": "Comprehensive UI/UX design intelligence system evaluating layout balance, visual hierarchy, touch targets, and responsive interactions.",
    "version": "v1.0.0",
    "downloads": "8.7k",
    "stars": "2.4k",
    "tags": [
      "ui-ux",
      "design-review",
      "heuristics",
      "mobile-web",
      "layout"
    ],
    "verified": true,
    "author": {
      "name": "nextlevelbuilder",
      "handle": "nextlevelbuilder",
      "avatar": "https://github.com/nextlevelbuilder.png?size=160"
    },
    "installCommand": "npx skills@latest add nextlevelbuilder/ui-ux-pro-max-skill",
    "license": "MIT",
    "lastUpdated": "Today",
    "overview": "Injects design audit capabilities into AI coding sessions to prevent cluttered interfaces, poor contrast, and awkward spacing.",
    "features": [
      "Spacing rhythm checks",
      "Visual hierarchy validation",
      "Responsive breakpoint stress-tests",
      "Component state audits"
    ],
    "permissions": [
      "repo:read"
    ]
  },
  {
    "slug": "ux-ui-principles",
    "name": "UX/UI Principles",
    "category": "UI/UX",
    "repo": "uxuiprinciples/agent-skills",
    "repoUrl": "https://github.com/uxuiprinciples/agent-skills",
    "skillPath": "SKILL.md",
    "image": "https://github.com/uxuiprinciples.png?size=160",
    "description": "Enforces foundational human-computer interaction (HCI) laws, including Fitts's Law, Hick's Law, cognitive load, and feedback loops.",
    "version": "v1.0.0",
    "downloads": "6.1k",
    "stars": "1.8k",
    "tags": [
      "hci",
      "ux-principles",
      "usability",
      "fitts-law",
      "interaction"
    ],
    "verified": true,
    "author": {
      "name": "uxuiprinciples",
      "handle": "uxuiprinciples",
      "avatar": "https://github.com/uxuiprinciples.png?size=160"
    },
    "installCommand": "npx skills@latest add uxuiprinciples/agent-skills",
    "license": "MIT",
    "lastUpdated": "Today",
    "overview": "Audits UX patterns against empirical usability laws to eliminate cognitive friction and enhance intuitive user flows.",
    "features": [
      "Fitts's Law touch target audits",
      "Hick's Law decision reduction",
      "Feedback timing verification",
      "Error prevention heuristics"
    ],
    "permissions": [
      "repo:read"
    ]
  },
   {
    "slug": "tailwind-design-system",
    "name": "Tailwind Design System",
    "category": "Design",
    "repo": "wshobson/agents",
    "repoUrl": "https://github.com/wshobson/agents",
    "skillPath": "plugins/frontend-mobile-development/skills/tailwind-design-system/SKILL.md",
    "image": "https://github.com/wshobson.png?size=160",
    "description": "Builds scalable design systems using Tailwind CSS v4, @theme inline blocks, CSS variables, and design tokens.",
    "version": "v1.0.0",
    "downloads": "7.3k",
    "stars": "1.9k",
    "tags": [
      "tailwind-v4",
      "design-tokens",
      "theming",
      "css-variables",
      "design-system"
    ],
    "verified": true,
    "author": {
      "name": "wshobson",
      "handle": "wshobson",
      "avatar": "https://github.com/wshobson.png?size=160"
    },
    "installCommand": "npx skills@latest add wshobson/agents --skill tailwind-design-system",
    "license": "MIT",
    "lastUpdated": "Today",
    "overview": "Provides an architectural blueprint for structuring modern Tailwind v4 themes, semantic color ramps, and reusable component tokens.",
    "features": [
      "Tailwind v4 @theme configuration",
      "CSS variable color ramps",
      "Semantic token aliasing",
      "Dark mode surface rules"
    ],
    "permissions": [
      "repo:read",
      "repo:write"
    ]
  },
   {
    "slug": "playwright-cli",
    "name": "Playwright CLI",
    "category": "Browser",
    "repo": "microsoft/playwright-cli",
    "repoUrl": "https://github.com/microsoft/playwright-cli",
    "skillPath": "skills/playwright-cli/SKILL.md",
    "image": "https://github.com/microsoft.png?size=160",
    "description": "Official Microsoft Playwright CLI skill for AI agents to automate browser navigation, inspect element trees, and record actions.",
    "version": "v1.0.0",
    "downloads": "22.6k",
    "stars": "11.2k",
    "tags": [
      "playwright",
      "browser-testing",
      "automation",
      "e2e",
      "microsoft"
    ],
    "verified": true,
    "author": {
      "name": "Microsoft",
      "handle": "microsoft",
      "avatar": "https://github.com/microsoft.png?size=160"
    },
    "installCommand": "npx skills@latest add microsoft/playwright-cli --skill playwright-cli",
    "license": "Apache-2.0",
    "lastUpdated": "Today",
    "overview": "Gives coding agents a direct browser driver to inspect rendered web pages, check interaction states, and test UI responsiveness.",
    "features": [
      "Live browser automation",
      "Accessibility tree inspection",
      "Element interaction recording",
      "Visual error captures"
    ],
    "permissions": [
      "repo:read",
      "shell:execute"
    ]
  },
  {
    "slug": "design-control-loop",
    "name": "Design Control Loop",
    "category": "Productivity",
    "repo": "humanlayer/skills",
    "repoUrl": "https://github.com/humanlayer/skills",
    "skillPath": "plugins/design-control-loop/skills/design-control-loop/SKILL.md",
    "image": "https://github.com/humanlayer.png?size=160",
    "description": "Structured design interview loop that clarifies user intent, UX edge cases, and technical constraints before coding begins.",
    "version": "v1.0.0",
    "downloads": "8.8k",
    "stars": "3.1k",
    "tags": [
      "design-spec",
      "ux-interview",
      "edge-cases",
      "planning",
      "workflow"
    ],
    "verified": true,
    "author": {
      "name": "HumanLayer",
      "handle": "humanlayer",
      "avatar": "https://github.com/humanlayer.png?size=160"
    },
    "installCommand": "npx skills@latest add humanlayer/skills --skill design-control-loop",
    "license": "MIT",
    "lastUpdated": "Today",
    "overview": "Prevents wasted engineering iterations by systematically interviewing the engineer on empty states, error boundaries, and edge cases.",
    "features": [
      "UX edge case discovery",
      "Component state enumeration",
      "Constraint validation",
      "Implementation roadmap generation"
    ],
    "permissions": [
      "repo:read"
    ]
  },
   {
    "slug": "code-review-and-quality",
    "name": "Code Review & Quality",
    "category": "Productivity",
    "repo": "addyosmani/agent-skills",
    "repoUrl": "https://github.com/addyosmani/agent-skills",
    "skillPath": "skills/code-review-and-quality/SKILL.md",
    "image": "https://github.com/addyosmani.png?size=160",
    "description": "Five-axis senior engineer code quality review from Addy Osmani evaluating maintainability, performance, and accessibility.",
    "version": "v1.0.0",
    "downloads": "24.1k",
    "stars": "9.9k",
    "tags": [
      "code-review",
      "engineering-quality",
      "performance",
      "accessibility",
      "maintainability"
    ],
    "verified": true,
    "author": {
      "name": "Addy Osmani",
      "handle": "addyosmani",
      "avatar": "https://github.com/addyosmani.png?size=160"
    },
    "installCommand": "npx skills@latest add addyosmani/agent-skills --skill code-review-and-quality",
    "license": "MIT",
    "lastUpdated": "Today",
    "overview": "Ensures that newly crafted UI code adheres to production-grade engineering standards with zero technical debt.",
    "features": [
      "Five-axis quality scorecard",
      "Web performance regression detection",
      "Edge-case stress testing",
      "Clean code recommendations"
    ],
    "permissions": [
      "repo:read"
    ]
  },
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug.toLowerCase() === slug.toLowerCase() || (s.slug === "to-issues" && slug.toLowerCase() === "to-tickets"));
}

