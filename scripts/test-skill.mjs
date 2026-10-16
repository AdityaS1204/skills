import { getSkillWithMarkdown } from "../src/lib/skill-service.ts";

async function main() {
  const testSlug = process.argv[2] || "frontend-design";
  console.log(`\nTesting skill fetch & parse for: "${testSlug}"...`);

  const skill = await getSkillWithMarkdown(testSlug);

  if (!skill) {
    console.error("FAIL: Skill not found.");
    process.exit(1);
  }

  console.log("SUCCESS: Skill loaded!");
  console.log("-----------------------------------------");
  console.log("Name:       ", skill.name);
  console.log("Version:    ", skill.version);
  console.log("Source URL: ", skill.sourceUrl);
  console.log("Revision:   ", skill.sourceRevision);
  console.log("Frontmatter:", JSON.stringify(skill.frontmatter, null, 2));
  console.log("Markdown (first 160 chars):");
  console.log(skill.content.slice(0, 160) + "...\n");
}

main().catch(console.error);
