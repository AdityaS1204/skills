"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, arc } from "motion/react";
import {
  Close,
  Copy,
  Check,
  Github,
  GitPullRequest,
  FileCode,
  ExternalLink,
} from "@honeyicons/react";

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerOffset?: { x: number; y: number };
}

const TEMPLATE_SNIPPET = `{
  slug: "your-skill",
  name: "Your Skill Name",
  category: "Productivity",
  repo: "username/skill-repo",
  repoUrl: "https://github.com/username/skill-repo",
  skillPath: "skills/your-skill/SKILL.md",
  image: "https://github.com/username.png?size=160",
  description: "A concise summary of what this skill enables.",
  version: "1.0.0",
  tags: ["agents", "productivity"],
  author: {
    name: "Your Name",
    handle: "username",
    avatar: "https://github.com/username.png?size=160"
  },
  installCommand: "npx skills add username/skill-repo"
},`;

export function PublishModal({ isOpen, onClose, triggerOffset }: PublishModalProps) {
  const [copied, setCopied] = useState(false);

  // Compute exact center of the trigger button relative to viewport center
  const offset = useMemo(() => {
    if (triggerOffset) return triggerOffset;
    if (typeof window !== "undefined") {
      const btn = document.getElementById("publish-skill-btn");
      if (btn) {
        const rect = btn.getBoundingClientRect();
        return {
          x: Math.round(rect.left + rect.width / 2 - window.innerWidth / 2),
          y: Math.round(rect.top + rect.height / 2 - window.innerHeight / 2),
        };
      }
    }
    return { x: 340, y: -220 };
  }, [triggerOffset, isOpen]);

  // Motion arc path: curved trajectory swooping out from and back to the button
  const arcIn = useMemo(
    () =>
      arc({
        strength: 0.38,
        peak: 0.5,
        direction: "cw",
      }),
    []
  );

  const arcOut = useMemo(
    () =>
      arc({
        strength: 0.38,
        peak: 0.5,
        direction: "ccw",
      }),
    []
  );

  // Close on Escape key & lock scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TEMPLATE_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="publish-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Modal Container animated along an arc curve directly from/to the button */}
          <motion.div
            id="publish-skill-modal"
            style={{ transformOrigin: "center center" }}
            initial={{
              opacity: 0,
              scale: 0.05,
              x: offset.x,
              y: offset.y,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [offset.x, 0],
              y: [offset.y, 0],
              transition: {
                path: arcIn,
                duration: 0.44,
                ease: [0.16, 1, 0.3, 1],
                scale: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.28 },
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.05,
              x: [0, offset.x],
              y: [0, offset.y],
              transition: {
                path: arcOut,
                duration: 0.36,
                ease: [0.22, 1, 0.36, 1],
                scale: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.24 },
              },
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-[12px] border border-(--border-subtle) bg-surface text-primary shadow-2xl"
          >
            {/* Header - clean, uncluttered, no specification badge */}
            <div className="flex items-center justify-between border-b border-(--border-subtle) px-5 py-3.5">
              <h2
                id="publish-modal-title"
                className="text-[15px] font-semibold tracking-tight text-primary"
              >
                Publish a Skill
              </h2>

              <button
                id="close-publish-modal-btn"
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] text-tertiary transition-colors hover:bg-hover hover:text-primary active:scale-95 cursor-pointer"
              >
                <Close size={16} />
              </button>
            </div>

            {/* Content Body - concise, no clutter, no overflow */}
            <div className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden p-5 text-[12px] scrollbar-thin">
              {/* Instructions list */}
              <ol className="space-y-2 text-secondary">
                <li className="flex items-baseline gap-2">
                  <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-subtle font-mono text-[10px] font-medium text-primary border border-(--border-subtle)">
                    1
                  </span>
                  <span>
                    Fork{" "}
                    <a
                      href="https://github.com/AdityaS1204/skills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 font-mono text-primary underline underline-offset-2 hover:text-(--text-accent)"
                    >
                      <span>AdityaS1204/skills</span>
                      <ExternalLink size={10} />
                    </a>{" "}
                    on GitHub.
                  </span>
                </li>

                <li className="flex items-baseline gap-2">
                  <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-subtle font-mono text-[10px] font-medium text-primary border border-(--border-subtle)">
                    2
                  </span>
                  <span>
                    Add your repository info to the <code className="font-mono text-primary font-medium">SKILLS</code> array in{" "}
                    <code className="rounded-[4px] border border-(--border-subtle) bg-subtle px-1 py-0.5 font-mono text-[11px] text-primary">
                      src/lib/skills-data.ts
                    </code>:
                  </span>
                </li>
              </ol>

              {/* Code snippet block with integrated copy button */}
              <div className="w-full min-w-0 overflow-hidden rounded-[8px] border border-(--border-subtle) bg-(--gray-900) text-(--gray-200)">
                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-1.5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-(--gray-400)">
                    <FileCode size={12} />
                    <span>skills-data.ts</span>
                  </div>

                  <button
                    id="copy-template-btn"
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 rounded-[4px] bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white transition-colors hover:bg-white/20 active:scale-95 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={11} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy Template</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="max-h-[190px] overflow-x-auto overflow-y-auto p-3 font-mono text-[11px] leading-snug text-(--gray-200) scrollbar-thin">
                  <code>{TEMPLATE_SNIPPET}</code>
                </pre>
              </div>

              {/* Step 3 */}
              <div className="flex items-baseline gap-2 text-secondary pt-0.5">
                <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-subtle font-mono text-[10px] font-medium text-primary border border-(--border-subtle)">
                  3
                </span>
                <span>
                  Submit a Pull Request to <code className="font-mono text-primary font-medium">main</code>. Your skill will automatically be indexed.
                </span>
              </div>
            </div>

            {/* Footer with Links */}
            <div className="flex items-center justify-between border-t border-(--border-subtle) bg-subtle/50 px-5 py-3">
              <a
                href="https://github.com/AdityaS1204/skills/blob/main/src/lib/skills-data.ts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[6px] border border-(--border-subtle) bg-surface px-2.5 py-1 font-mono text-[11px] text-secondary transition-colors hover:border-(--border-default) hover:text-primary"
              >
                <GitPullRequest size={12} />
                <span>Open skills-data.ts</span>
                <ExternalLink size={10} className="text-tertiary" />
              </a>

              <a
                href="https://github.com/AdityaS1204/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[6px] bg-primary px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90 active:scale-98"
              >
                <Github size={13} />
                <span>View Repository</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
