import Saltire from "../Saltire";

import { EQuarter } from "../../interfaces";

describe("Saltire", () => {
  const saltire: Saltire = new Saltire();
  describe("transforms", () => {
    it("should return the right transform for the right Quarter", () => {
      expect(saltire.transforms(EQuarter.TL)).toBe("translate(-14, 2) scale(0.65)");
      expect(saltire.transforms(EQuarter.TR)).toBe("translate(104) scale(0.65)");
      expect(saltire.transforms(EQuarter.BL)).toBe("translate(-5, 125) scale(0.7)");
      expect(saltire.transforms(EQuarter.BR)).toBe("translate(88, 110) scale(0.65)");
    });

    it("should return an empty string for an unknown transform", () => {
      expect(saltire.transforms("unknown")).toBe("");
    });
  });
});
