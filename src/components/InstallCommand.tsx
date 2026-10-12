"use client";

import { useState } from "react";
import { Copy, Check } from "@honeyicons/react";
import { motion, AnimatePresence } from "motion/react";

interface InstallCommandProps {
  command: string;
}

export function InstallCommand({ command }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="group relative flex items-center justify-between rounded-[8px] border border-(--border-subtle) bg-subtle px-3 py-2 font-mono text-[12px] text-primary transition-colors hover:border-(--border-default)">
      <div className="flex items-center gap-2 overflow-x-auto pr-2 scrollbar-none">
        <span className="select-none text-tertiary font-normal">$</span>
        <code className="whitespace-nowrap tracking-tight">{command}</code>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied command" : "Copy install command"}
        className="relative ml-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] text-tertiary transition-colors hover:bg-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-focus) active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              className="text-(--success-fg) flex items-center justify-center"
            >
              <Check size={14} />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              className="flex items-center justify-center"
            >
              <Copy size={14} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
