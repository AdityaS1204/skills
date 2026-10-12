"use client";

import Link from "next/link";
import { Github } from "@honeyicons/react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-(--border-subtle) bg-page/85 backdrop-blur-sm">
      <div className="mx-auto flex h-[48px] max-w-[1120px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-[14px] font-semibold tracking-tight text-primary transition-opacity hover:opacity-80"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-primary text-[11px] font-bold text-white">
              S
            </span>
            <span>skills.registry</span>
          </Link>
          <nav className="hidden items-center gap-4 sm:flex">
            <Link
              href="/"
              className="text-[13px] font-medium text-primary transition-colors hover:text-primary"
            >
              Explore
            </Link>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-secondary transition-colors hover:text-primary"
            >
              Docs
            </a>
          </nav>
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
            type="button"
            className="inline-flex h-7 items-center justify-center rounded-[6px] bg-primary px-2.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90 active:scale-98"
          >
            Publish skill
          </button>
        </div>
      </div>
    </header>
  );
}
