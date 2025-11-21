import { describe, it, expect } from "vitest";
import { formatDateForApi } from "./helpers";

describe("formatDateForApi", () => {
  it("should format date correctly for double digit months and days", () => {
    const date = new Date(2025, 10, 15);
    expect(formatDateForApi(date)).toBe("2025-11-15");
  });

  it("should format date correctly for single digit months and days", () => {
    const date = new Date(2025, 0, 5);
    expect(formatDateForApi(date)).toBe("2025-01-05");
  });

  it("should format date correctly for end of month", () => {
    const date = new Date(2025, 1, 28);
    expect(formatDateForApi(date)).toBe("2025-02-28");
  });

  it("should format date correctly for leap year", () => {
    const date = new Date(2024, 1, 29);
    expect(formatDateForApi(date)).toBe("2024-02-29");
  });
});
