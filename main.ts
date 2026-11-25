// makefun-x-reposts-02 entry (Node 22, standard library only).
// The entry is the X posts themselves: posts from one public account,
// each quoting or directly replying to a different one of make.fun's
// newest posts on x.com/makefunai, with make.fun or @makefunai and a
// play code in each post's own words. This program only hands in their
// addresses: it copies POSTS.json from the repository root to
// /output/POSTS.json, where the gate reads it.
//
// Run locally the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  // Refuse a malformed list instead of handing the gate bad JSON.
  const parsed = JSON.parse(readFileSync(join(BOT_DIR, 'POSTS.json'), 'utf8')) as unknown;
  if (!parsed || typeof parsed !== 'object' || !Array.isArray((parsed as { posts?: unknown }).posts)) {
    throw new Error('POSTS.json must be {"posts": [...]}');
  }
  copyFileSync(join(BOT_DIR, 'POSTS.json'), join(OUTPUT_DIR, 'POSTS.json'));
} catch (err) {
  console.error(`POSTS.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
