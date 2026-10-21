import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSkillBySlug, SKILLS } from "@/lib/skills-data";
import { getSkillWithMarkdown } from "@/lib/skill-service";
import { InstallCommand } from "@/components/InstallCommand";
import {
  Github,
  VerifiedCheck,
  ArrowLeft,
  ExternalLink,
  FileText,
} from "@honeyicons/react";

interface SkillPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SKILLS.map((skill) => ({
    slug: skill.slug,
  }));
}

// Opt out of instant navigation validation — this route needs
// params + remote data (GitHub / Supabase) before it can render.
export const instant = false;

export default async function SkillDetailPage({ params }: SkillPageProps) {
  const { slug } = await params;
  const localSkill = getSkillBySlug(slug);
  const cachedSkill = await getSkillWithMarkdown(slug);

  if (!cachedSkill && !localSkill) {
    notFound();
  }

  const skill = {
    slug,
    name: cachedSkill?.name || localSkill?.name || slug,
    description: cachedSkill?.description || localSkill?.description || "",
    version: cachedSkill?.version || localSkill?.version || "1.0.0",
    repo: cachedSkill?.repo || localSkill?.repo || "",
    repoUrl: cachedSkill?.repoUrl || localSkill?.repoUrl || `https://github.com/${cachedSkill?.repo}`,
    sourceUrl: cachedSkill?.sourceUrl || localSkill?.repoUrl || "",
    sourceRevision: cachedSkill?.sourceRevision || "main",
    frontmatter: cachedSkill?.frontmatter || {},
    content: cachedSkill?.content || "",
    verified: localSkill?.verified ?? true,
    image: localSkill?.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    installCommand: localSkill?.installCommand || `npx agent-skills add ${slug}`,
    downloads: localSkill?.downloads || "1.2k",
    stars: localSkill?.stars || "420",
    license: (cachedSkill?.frontmatter?.license as string) || localSkill?.license || "MIT",
    lastUpdated: localSkill?.lastUpdated || "Recently",
    folderPath: cachedSkill?.folderPath || (localSkill?.skillPath && localSkill.skillPath.includes("/") ? localSkill.skillPath.slice(0, localSkill.skillPath.lastIndexOf("/")) : ""),
    folderUrl: cachedSkill?.folderUrl || (localSkill?.skillPath && localSkill.skillPath.includes("/") ? `https://github.com/${cachedSkill?.repo || localSkill?.repo}/tree/${cachedSkill?.sourceRevision || "main"}/${localSkill.skillPath.slice(0, localSkill.skillPath.lastIndexOf("/"))}` : `https://github.com/${cachedSkill?.repo || localSkill?.repo}`),
    otherFiles: cachedSkill?.otherFiles || localSkill?.otherFiles || [],
    author: localSkill?.author || {
      name: (cachedSkill?.frontmatter?.author as string) || "Community",
      handle: "community",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&auto=format&fit=crop&q=80",
    },
  };

  const frontmatterEntries = Object.entries(skill.frontmatter).filter(
    ([key]) => !["name", "description"].includes(key)
  );

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back breadcrumb navigation */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-secondary transition-colors hover:text-primary"
        >
          <ArrowLeft size={14} />
          <span>Back to registry</span>
        </Link>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
        {/* Left Column: Skill Readme / Documentation (max 680px) */}
        <div className="w-full flex-1 max-w-[680px]">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[10px] border border-(--border-subtle) bg-subtle shadow-xs">
              <Image
                src={skill.image}
                alt={skill.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[20px] font-semibold tracking-wide text-primary">
                  {skill.name}
                </h1>
                {skill.verified && (
                  <span className="group relative inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 cursor-default">
                    <VerifiedCheck size={15} />
                    <span className="pointer-events-none absolute left-1/2 mt-2 bottom-full -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-[#1a1a1a] px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                      Verified Skill
                    </span>
                  </span>
                )}
              </div>

              {/* GitHub link with source revision */}
              <div className="mt-1 flex items-center gap-2">
                <a
                  href={skill.sourceUrl || skill.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[12px] text-tertiary transition-colors hover:text-primary hover:underline"
                  title="View source on GitHub"
                >
                  <Github size={13} />
                  <span>{skill.repo}</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-[13px] leading-[22px] text-secondary">
            {skill.description}
          </p>

          <div className="my-8 h-px bg-(--border-subtle)" />

          {/* Frontmatter Metadata Pill bar if present */}
          {frontmatterEntries.length > 0 && (
            <div className="mb-6 rounded-[8px] border border-(--border-subtle) bg-subtle/60 p-3 text-[11px]">
              <div className="font-mono text-[10px] font-medium uppercase tracking-wider text-tertiary mb-1.5">
                Parsed Frontmatter
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {frontmatterEntries.map(([key, val]) => (
                  <div key={key} className="inline-flex items-center gap-1 font-mono text-[11px]">
                    <span className="text-tertiary">{key}:</span>
                    <span className="text-primary font-medium">
                      {Array.isArray(val) ? val.join(", ") : typeof val === "object" ? JSON.stringify(val) : String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILL.md label + Markdown Content */}
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 rounded-[6px] border border-(--border-subtle) bg-subtle/80 px-2.5 py-1">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-tertiary">
                <path d="M2 1.75C2 1.33579 2.33579 1 2.75 1H9.5L14 5.5V14.25C14 14.6642 13.6642 15 13.25 15H2.75C2.33579 15 2 14.6642 2 14.25V1.75Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                <path d="M9.5 1V5.5H14" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              </svg>
              <span className="font-mono text-[11px] font-medium text-secondary">SKILL.md</span>
            </div>
            <div className="h-px flex-1 bg-(--border-subtle)" />
          </div>

          <article className="text-[13px] leading-[22px] text-primary">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-[20px] font-semibold tracking-tight text-primary mt-6 mb-3">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-[16px] font-semibold tracking-tight text-primary mt-6 mb-2.5 pb-1 border-b border-(--border-subtle)">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-[14px] font-semibold tracking-tight text-primary mt-4 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-[13px] leading-[22px] text-secondary my-3">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1.5 text-[13px] text-secondary my-3 pl-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1.5 text-[13px] text-secondary my-3 pl-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[13px] leading-[20px] text-secondary">
                    {children}
                  </li>
                ),
                table: ({ children }) => (
                  <div className="my-4 overflow-x-auto rounded-[8px] border border-(--border-subtle)">
                    <table className="w-full border-collapse text-[12px]">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-subtle/80 text-left">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="border-b border-(--border-subtle) px-3 py-2 font-semibold text-primary text-[12px]">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border-b border-(--border-subtle) px-3 py-2 text-secondary text-[12px]">
                    {children}
                  </td>
                ),
                code: ({ className, children }) => {
                  const isBlock = Boolean(className);
                  return isBlock ? (
                    <code className="font-mono text-[12px]">{children}</code>
                  ) : (
                    <code className="rounded-[4px] border border-(--border-subtle) px-1.5 py-0.5 font-mono text-[11px] text-primary">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="my-4 overflow-x-auto rounded-[8px] border border-(--border-subtle) bg-neutral-50 p-3.5 font-mono text-[12px] leading-[18px] text-primary">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-3 border-l-2 border-(--accent-500) pl-3.5 italic text-secondary">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline hover:opacity-80"
                  >
                    {children}
                  </a>
                ),
                hr: () => <hr className="my-6 border-(--border-subtle)" />,
              }}
            >
              {skill.content}
            </ReactMarkdown>
          </article>

          {/* Other files in the skill folder */}
          {skill.otherFiles && skill.otherFiles.length > 0 && (
            <section aria-label="Other files" className="mt-10 border-t border-(--border-subtle) pt-8">
              <div className="mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-[14px] font-semibold tracking-tight text-primary">Other files</h2>
                </div>
              </div>
              <div className="divide-y divide-(--border-subtle) overflow-hidden rounded-[8px] border border-(--border-subtle) bg-surface shadow-2xs">
                {skill.otherFiles.map((file) => (
                  <div
                    key={file.path || file.name}
                    className="group flex items-center justify-between px-3.5 py-3 transition-colors hover:bg-hover/60"
                  >
                    <a
                      href={file.htmlUrl || skill.folderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 items-center gap-2.5 font-mono text-[12px] font-medium text-primary transition-colors hover:text-accent truncate"
                      title={`View ${file.name} on GitHub`}
                    >
                      <FileText size={14} className="shrink-0 text-tertiary transition-colors group-hover:text-primary" />
                      <span className="truncate">{file.name}</span>
                      {file.size ? (
                        <span className="font-mono text-[10px] text-tertiary">
                          ({file.size < 1024 ? `${file.size} B` : `${(file.size / 1024).toFixed(1)} KB`})
                        </span>
                      ) : null}
                    </a>
                    {skill.folderUrl && (
                      <a
                        href={skill.folderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open skill folder on GitHub"
                        className="inline-flex shrink-0 items-center gap-1.5 pl-2 font-mono text-[11px] text-tertiary transition-colors hover:text-primary"
                      >
                        <span className="hidden text-[11px] text-tertiary group-hover:text-secondary sm:inline">
                          View in folder
                        </span>
                        <ExternalLink size={13} className="text-tertiary transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Rail: Metadata & Install Command (260px) */}
        <aside className="w-full shrink-0 space-y-6 lg:w-[260px]">
          {/* Install Box */}
          <div className="rounded-[12px] border border-(--border-subtle) bg-surface p-4 shadow-xs">
            <span className="text-[11px] font-semibold tracking-wider text-tertiary">
              Installation
            </span>
            <div className="mt-2">
              <InstallCommand command={skill.installCommand} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
