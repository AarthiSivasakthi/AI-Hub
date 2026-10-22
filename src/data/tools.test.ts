import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { TOOLS, getToolBySlug, nameStartsWithQuery } from "./tools";

describe("tool search matches names from the beginning", () => {
  it("matches a tool whose name starts with the query", () => {
    assert.equal(nameStartsWithQuery("ChatGPT", "cha"), true);
    assert.equal(nameStartsWithQuery("Adobe Firefly", "adobe f"), true);
  });
  it("does not match a word later in the name", () => {
    assert.equal(nameStartsWithQuery("HeyGen Translate", "t"), false);
  });
  it("does not match the letter inside a word", () => {
    assert.equal(nameStartsWithQuery("Canva", "a"), false);
    assert.equal(nameStartsWithQuery("Runway", "w"), false);
  });
  it("collects every tool whose name starts with the letter, and no others", () => {
    const matches = TOOLS.filter((t) => nameStartsWithQuery(t.name, "a")).map((t) => t.name);
    assert.ok(matches.includes("AdCreative.ai"));
    assert.ok(!matches.includes("Canva"));
    for (const name of matches) {
      const ok = name
        .toLowerCase()
        .split(/[\s.\-_/()&@]+/)
        .some((word) => word.startsWith("a"));
      assert.ok(ok, `${name} should not match "a"`);
    }
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