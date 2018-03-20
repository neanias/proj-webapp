import ChargeShapes from "../ChargeShapes";

import { ECharge } from "../interfaces";

import Bend from "../ChargeShapes/Bend";
import Chief from "../ChargeShapes/Chief";
import Cross from "../ChargeShapes/Cross";
import Saltire from "../ChargeShapes/Saltire";

describe("ChargeShapes", () => {
  describe("#hasChargePath", () => {
    it("should return true for the correct shapes", () => {
      for (const charge of ["bend", "chief", "cross", "saltire"]) {
        expect(ChargeShapes.hasChargePath(charge)).toBe(true);
      }
    });

    it("should return false for an unknown charge", () => {
      expect(ChargeShapes.hasChargePath("barry")).toBe(false);
      expect(ChargeShapes.hasChargePath("blsafhewgln")).toBe(false);
    });
  });

  describe("#chargeShapes", () => {
    it("should return a Bend object for bend charge", () => {
      expect(ChargeShapes.chargeShapes(ECharge.Bend)).toBeInstanceOf(Bend);
    });
    it("should return a Chief object for chief charge", () => {
      expect(ChargeShapes.chargeShapes(ECharge.Chief)).toBeInstanceOf(Chief);
    });
    it("should return a Cross object for cross charge", () => {
      expect(ChargeShapes.chargeShapes(ECharge.Cross)).toBeInstanceOf(Cross);
    });
    it("should return a Saltire object for saltire charge", () => {
      expect(ChargeShapes.chargeShapes(ECharge.Saltire)).toBeInstanceOf(Saltire);
    });
  });
});
