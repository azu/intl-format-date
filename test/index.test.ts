import { it } from "node:test";
import { formatDate } from "../src/index.ts";
import type { FormatContext } from "../src/index.ts";
import assert from "node:assert";

const testDate = new Date("2025-12-31T01:23:45.678Z");
const testDateContext: FormatContext = {
  locale: "en-US",
  timeZone: "UTC",
}
it("should format a string", () => {
  const result = formatDate(testDateContext, testDate, "yyyy-MM-dd HH:mm:ss");
  assert.strictEqual(result, "2025-12-31 01:23:45");
});
