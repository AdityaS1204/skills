"use client";

import Link from "next/link";
import Image from "next/image";
import { Skill } from "@/lib/skills-data";
import { Github, VerifiedCheck } from "@honeyicons/react";
import { motion, type Variants } from "motion/react";

export const skillCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface SkillCardProps {
  skill: Skill;
  variants?: Variants;
}

export function SkillCard({ skill, variants }: SkillCardProps) {
  return (
    <motion.div
      variants={variants ?? skillCardVariants}
      className="group relative flex cursor-pointer flex-col gap-3 p-3.5 transition-colors hover:bg-hover/50 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3.5"
    >
      {/* Full card clickable link */}
      <Link
        href={`/skills/${skill.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${skill.name}`}
        tabIndex={-1}
      />

      {/* Left section: Icon, Name, Verified, Repo, Description */}
      <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
        <div className="relative h-[46px] w-[46px] shrink-0 overflow-hidden rounded-[8px] border border-(--border-subtle) bg-subtle">
          <Image
            src={skill.image}
            alt={skill.name}
            fill
            sizes="46px"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
            <Link
              href={`/skills/${skill.slug}`}
              className="relative z-10 text-[15px] font-semibold text-primary transition-colors group-hover:text-accent"
            >
              {skill.name}
            </Link>

            {skill.verified && (
              <span title="Verified Skill" className="relative z-10 inline-flex items-center text-accent">
                <VerifiedCheck size={14} />
              </span>
            )}

            <span className="relative z-10 text-tertiary/50 text-[11px]">·</span>

            <a
              href={skill.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 inline-flex items-center gap-1.5 font-inter tracking-wider text-md text-tertiary transition-colors hover:text-primary hover:underline"
              title={`Open github.com/${skill.repo}`}
            >
              <Github size={16} className="shrink-0 text-tertiary" />
              <span>{skill.author.name}</span>
            </a>
          </div>

          <p className="mt-1 line-clamp-1 text-[13px] leading-[20px] text-secondary">
            {skill.description}
          </p>
        </div>
      </div>

      {/* Right section: Category pill (hidden on mobile, visible on sm and up) */}
      <div className="hidden sm:flex items-center shrink-0 pointer-events-none">
        <span className="inline-flex h-[22px] items-center rounded-[5px] border border-(--border-subtle) bg-subtle px-2 font-mono text-[11px] font-medium text-secondary">
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
}
