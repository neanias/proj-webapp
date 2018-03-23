import { ECharge } from "./interfaces";

import AShape from "./ChargeShapes/AShape";
import Bend from "./ChargeShapes/Bend";
import Chief from "./ChargeShapes/Chief";
import Cross from "./ChargeShapes/Cross";
import Saltire from "./ChargeShapes/Saltire";

/**
 * A class for accessing various drawable charges.
 */
export default class ChargeShapes {
  /**
   * Returns a new element for the specified [[ECharge]]. This is then usually chained to access the dimensions or
   * transformations.
   */
  public static chargeShapes(charge: ECharge): AShape {
    switch (charge) {
      case ECharge.Bend:
        return new Bend();
      case ECharge.Cross:
        return new Cross();
      case ECharge.Chief:
        return new Chief();
      case ECharge.Saltire:
        return new Saltire();
    }
  }

  /**
   * Boolean method for checking if the specified charge is known.
   */
  public static hasChargePath(charge: string): boolean {
    return ChargeShapes.chargePaths.includes(charge.toLowerCase());
  }

  /**
   * Known charges.
   */
  private static readonly chargePaths: string[] = ["bend", "chief", "cross", "saltire"];
}
