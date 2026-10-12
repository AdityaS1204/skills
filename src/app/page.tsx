"use client";

import { useState, useMemo, useEffect } from "react";
import { SKILLS } from "@/lib/skills-data";
import { SkillCard } from "@/components/SkillCard";
import { Search } from "@honeyicons/react";
import { motion, type Variants } from "motion/react";

const CATEGORIES = ["All", "Browser", "Runtime", "Database", "Productivity", "DevOps", "AI / ML"] as const;

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const heroItemVariants: Variants = {
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
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (isInitial: boolean) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: isInitial ? 0.48 : 0.04,
    },
  }),
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredSkills = useMemo(() => {
    return SKILLS.filter((skill) => {
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.repo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Minimal Left-Aligned Text Hero Section */}
      <motion.section
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="mb-10 max-w-[680px]"
      >
        <motion.div variants={heroItemVariants} className="inline-flex items-center gap-2 rounded-[4px] border border-(--border-subtle) bg-surface px-2 py-0.5 text-[11px] font-medium text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-(--accent-500)" />
          <span>v0.1 Registry · Open ecosystem</span>
        </motion.div>

        <motion.h1 variants={heroItemVariants} className="mt-4 text-[24px] font-medium tracking-tight text-primary sm:text-[28px] sm:leading-[34px]">
          AI Agent Skills Registry
        </motion.h1>

        <motion.p variants={heroItemVariants} className="mt-2 text-[13px] leading-[22px] text-secondary">
          A minimal, quiet index of verified capability packages and tooling adapters for autonomous LLM runtimes. Browse modular execution environments, data tools, and communication bridges.
        </motion.p>

        {/* Search Bar & Stats */}
        <motion.div variants={heroItemVariants} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-tertiary">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill name, repository, or capability..."
              className="h-[32px] w-full rounded-[8px] border border-(--border-default) bg-(--gray-100) pl-10 pr-16 text-[13px] text-primary placeholder-(--gray-500) transition-colors focus:border-(--border-focus) focus:outline-none focus:ring-2 focus:ring-(--accent-500)/15"
            />
          </div>

          <div className="text-[12px] font-mono text-tertiary shrink-0">
            {filteredSkills.length} {filteredSkills.length === 1 ? "skill" : "skills"} indexed
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div variants={heroItemVariants} className="mt-4 flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex h-8 items-center rounded-[6px] px-3.5 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white shadow-xs"
                    : "border border-(--border-subtle) bg-surface text-secondary hover:bg-hover hover:text-primary"
                }`}
              >
                {category}
              </button>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Skills List */}
      <section>
        {filteredSkills.length > 0 ? (
          <motion.div
            key={selectedCategory}
            custom={!mounted}
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-(--border-subtle) overflow-hidden rounded-[10px] border border-(--border-subtle) bg-surface"
          >
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-(--border-default) bg-surface p-12 text-center"
          >
            <span className="font-mono text-[13px] text-secondary">No skills found</span>
            <p className="mt-1 text-[11px] text-tertiary">
              Try adjusting your query or category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-[12px] font-medium text-accent underline hover:opacity-80"
            >
              Reset filters
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
}
