import Cross from "../Cross";

import { EQuarter } from "../../interfaces";

describe("Cross", () => {
  const cross: Cross = new Cross();
  describe("transforms", () => {
    it("should return the right transform for the right Quarter", () => {
      expect(cross.transforms(EQuarter.TL)).toBe("translate(-9, -5) scale(0.6)");
      expect(cross.transforms(EQuarter.TR)).toBe("translate(113, -8) scale(0.6)");
      expect(cross.transforms(EQuarter.BL)).toBe("translate(-9, 110) scale(0.6)");
      expect(cross.transforms(EQuarter.BR)).toBe("translate(110, 120) scale(0.6)");
    });

    it("should return an empty string for an unknown transform", () => {
      expect(cross.transforms("unknown")).toBe("");
    });
  });
});
