import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { TOOLS, getToolBySlug } from "./tools";

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