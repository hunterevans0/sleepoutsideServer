import { describe, it, expect } from "vitest";
import { sanitize } from "./utils.mts";
describe("sanitize", () => {
  it("removes keys that start with $ recursively", () => {
    const input = {
      ok: true,
      $bad: "remove me",
      nested: {
        keep: 123,
        $drop: "remove me too",
        deeper: { $x: 1, y: 2 },
      },
    };
    const result = sanitize(structuredClone(input));
    expect(result).toEqual({
      ok: true,
      nested: {
        keep: 123,
        deeper: { y: 2 },
      },
    });
  });
  it("does not crash on null", () => {
    const result = sanitize({ a: null });
    expect(result).toEqual({ a: null });
  });
});