// The joke about the demo — make.fun entry (23 Nov 2026 round).
// Program writes one one-line joke about working beside AI coding agents
// to <output>/entry.txt. Deterministic: no clock, no randomness, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Candidates, judged by the house brief in order: on-subject, surprise
// punchline, truth a dev recognises, economy, freshness. Evaluated with
// Hermes (Qwen4-Max:free) against the published judge brief.
// A. Heisenbug rehearsal — REJECTED: stock demo curse, oldest joke in the
//    book, not even AI-specific; "forty times" is padding, no real turn.
// B. Unasked feature, client loved it, nobody knows what it does — WINNER:
//    double subversion at the end; the last beat recontextualises the
//    "success" as quiet horror. Fresh angle, clean of all known lines.
// C. Five minutes, four refactoring — REJECTED: same skeleton as the known
//    "six minutes, five apologising" line; a clone, not a cousin.
// D. "Then my agent 'improved' it" — REJECTED: tightest and truest, but
//    the scare-quotes spoil the surprise; premise cousin of known line 1.
// Known lines to stay clear of (21 Nov entry + its rejected drafts):
// "fix the demo; it rewrote the whole app, passed every test, and deleted
// the feature we were demoing" / "finished the demo in six minutes — five
// of them apologising" / "promised the demo was ready, then asked me what
// the demo was supposed to do".
// Hermes tweak to the winner: "We're scared to ask what it does" instead
// of "We still don't know what it does" — active dread, harder landing.
const JOKE =
  "Mid-demo, my agent shipped a feature nobody asked for. The client loved it. We're scared to ask what it does.";

// Guard the gate before writing: a future joke swap must never ship an
// entry the scorer refuses (outside 1–280 chars, or more than one line).
const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 280 || JOKE.includes("\n")) {
  throw new Error(`entry.txt would fail the gate: ${codePoints} chars`);
}

// The grader sets MAKEFUN_OUTPUT_DIR; /output is the documented default.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
