import Bend from "../Bend";

import { EQuarter } from "../../interfaces";

describe("Bend", () => {
  const bend: Bend = new Bend();
  describe("#transforms", () => {
    it("should return the right transform for Quarters", () => {
      expect(bend.transforms(EQuarter.TL)).toBe("scale(0.65)");
      expect(bend.transforms(EQuarter.TR)).toBe("translate(125) scale(0.65)");
      expect(bend.transforms(EQuarter.BL)).toBe("translate(7, 126.5) scale(0.65)");
      expect(bend.transforms(EQuarter.BR)).toBe("translate(124, 126) scale(0.65)");
    });

    it("should return the sinister transform for Quarters", () => {
      expect(bend.transforms(`${EQuarter.TL} sinister`)).toBe(
        "translate(-17.5) scale(0.65) matrix(-1,0,0,1,236.58573,0)");
      expect(bend.transforms(`${EQuarter.TR} sinister`)).toBe(
        "translate(105) scale(0.65) matrix(-1,0,0,1,236.58573,0)");
      expect(bend.transforms(`${EQuarter.BL} sinister`)).toBe(
        "translate(-18, 126.5) scale(0.65) matrix(-1,0,0,1,236.58573,0)");
      expect(bend.transforms(`${EQuarter.BR} sinister`)).toBe(
        "translate(100, 126) scale(0.65) matrix(-1,0,0,1,236.58573,0)");
    });

    it("should return the sinister transform", () => {
      expect(bend.transforms("sinister")).toBe("translate(23.4, -0.5) matrix(-1,0,0,1,236.58573,0)");
    });

    it("should return an empty transform for an unknown transform", () => {
      expect(bend.transforms("unknown")).toBe("");
    });
  });
});
