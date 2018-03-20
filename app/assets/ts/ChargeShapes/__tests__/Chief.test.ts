import Chief from "../Chief";

import { EQuarter } from "../../interfaces";

describe("Chief", () => {
  const chief: Chief = new Chief();
  describe("transforms", () => {
    it("should return the right transform for the right Quarter", () => {
      expect(chief.transforms(EQuarter.TL)).toBe("scale(0.55)");
      expect(chief.transforms(EQuarter.TR)).toBe("translate(125) scale(0.55)");
      expect(chief.transforms(EQuarter.BL)).toBe("translate(0, 127.5) scale(0.55)");
      expect(chief.transforms(EQuarter.BR)).toBe("translate(125, 127) scale(0.55)");
    });

    it("should return an empty string for an unknown transform", () => {
      expect(chief.transforms("unknown")).toBe("");
    });
  });
});
