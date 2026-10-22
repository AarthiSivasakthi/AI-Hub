import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { TOOLS, getToolBySlug, nameStartsWithQuery } from "./tools";

describe("tool search matches names from the beginning", () => {
  it("matches a tool whose name starts with the query", () => {
    assert.equal(nameStartsWithQuery("ChatGPT", "cha"), true);
  });
  it("matches a word at the start of a multi-word name", () => {
    assert.equal(nameStartsWithQuery("HeyGen Translate", "t"), true);
  });
  it("does not match the letter inside a word", () => {
    assert.equal(nameStartsWithQuery("Canva", "a"), false);
    assert.equal(nameStartsWithQuery("Runway", "w"), false);
  });
  it("shows every matching tool in A to Z order for a single letter", () => {
    const matches = TOOLS.filter((t) => nameStartsWithQuery(t.name, "a")).map((t) => t.name);
    const sorted = [...matches].sort((x, y) => x.localeCompare(y));
    assert.deepEqual(matches, sorted);
    assert.ok(matches.length > 0);
  });
});


describe("official website destinations", () => {
  it("uses the current ChatGPT address", () => {
    assert.equal(getToolBySlug("chatgpt")?.website, "https://chatgpt.com");
  });
  it("does not offer the closed Tome service as available", () => {
    assert.equal(getToolBySlug("tome")?.websiteAvailable, false);
  });
  it("provides an absolute HTTPS destination for every tool", () => {
    for (const tool of TOOLS) {
      const url = new URL(tool.website);
      assert.equal(url.protocol, "https:");
      assert.ok(url.hostname.length > 0);
    }
  });
});