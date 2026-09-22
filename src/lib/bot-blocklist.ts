/**
 * Bot access policy for Gray UI.
 *
 * READING is welcome: search engines (Googlebot, Bingbot, DuckDuckBot…),
 * link-preview unfurlers (Twitterbot, Slackbot, Discordbot,
 * facebookexternalhit, WhatsApp…), AI SEARCH CITABILITY crawlers —
 * OAI-SearchBot (ChatGPT Search), Claude-SearchBot (Claude search),
 * PerplexityBot (Perplexity answers) — ChatGPT-User, and the shadcn CLI.
 * Blocking training crawlers does NOT affect search citability: GPTBot ≠
 * OAI-SearchBot and ClaudeBot ≠ Claude-SearchBot, so the search bots below
 * must never be added to this list.
 *
 * BLOCKED are bots that screenshot pages or copy content: AI-TRAINING
 * scrapers (GPTBot, ClaudeBot, CCBot, Google-Extended…),
 * screenshot-as-a-service crawlers and site rippers. Enforced with
 * real 403s in `src/proxy.ts` and mirrored into /robots.txt for well-behaved
 * bots.
 */

/** User agents blocked at the edge — matched case-insensitively as substrings. */
export const BLOCKED_BOT_TOKENS = [
  // — AI training scrapers (content copied into model corpora) —
  "GPTBot", // OpenAI training crawler
  "CCBot", // Common Crawl dataset
  "Google-Extended", // Gemini training (plain Googlebot stays welcome)
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Bytespider", // ByteDance
  "Amazonbot", // Alexa / AI data
  "Applebot-Extended", // Apple AI training (plain Applebot stays welcome)
  "Meta-ExternalAgent", // Meta AI training (facebookexternalhit stays welcome)
  // PerplexityBot is deliberately ALLOWED — it powers Perplexity answer
  // citations (AI search visibility), not just training.
  "YouBot",
  "Diffbot",
  "omgili",
  "omgilibot",
  "ImagesiftBot",
  "cohere-ai",
  // — screenshot services (render pages to images) —
  "screenshot",
  "url2png",
  "browshot",
  "pagepeeker",
  "siteshot",
  "site-shot",
  "page2images",
  "shrinktheweb",
  "webthumbnail",
  "snapito",
  "robothumbnail",
  "thumbshots",
  // — site rippers / bulk copiers —
  "httrack",
] as const;

const BLOCKED_PATTERN = new RegExp(BLOCKED_BOT_TOKENS.join("|"), "i");

/** True when the request's UA identifies a screenshot/copying bot. */
export function isBlockedBot(userAgent: string | null | undefined): boolean {
  // No UA at all → not a known bad bot; never risk blocking legit CLIs/probes.
  if (!userAgent) return false;
  return BLOCKED_PATTERN.test(userAgent);
}
