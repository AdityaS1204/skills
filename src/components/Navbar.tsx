"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github } from "@honeyicons/react";
import { PublishModal } from "@/components/PublishModal";

export function Navbar() {
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [triggerOffset, setTriggerOffset] = useState<{ x: number; y: number } | undefined>(undefined);

  const calculateOffset = () => {
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
    return undefined;
  };

  const handleOpen = () => {
    setTriggerOffset(calculateOffset());
    setIsPublishOpen(true);
  };

  useEffect(() => {
    const handleEvent = () => handleOpen();
    window.addEventListener("open-publish-modal", handleEvent);
    return () => window.removeEventListener("open-publish-modal", handleEvent);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-(--border-subtle) bg-page/85 backdrop-blur-sm">
        <div className="mx-auto flex h-[48px] max-w-[1120px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-[14px] font-semibold tracking-tight text-primary transition-opacity hover:opacity-80"
            >
              <span>UI-Skills</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/AdityaS1204/skills"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-tertiary transition-colors hover:bg-hover hover:text-primary"
            >
              <Github size={16} />
            </a>
            <button
              id="publish-skill-btn"
              type="button"
              onClick={handleOpen}
              className="inline-flex h-7 items-center justify-center rounded-[6px] bg-primary px-2.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90 active:scale-98 cursor-pointer"
            >
              Publish skill
            </button>
          </div>
        </div>
      </header>

      <PublishModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        triggerOffset={triggerOffset}
      />
    </>
  );
}
