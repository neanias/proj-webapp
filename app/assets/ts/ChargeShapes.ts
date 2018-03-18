import { ECharge } from "./interfaces";

import AShape from "./ChargeShapes/AShape";
import Bend from "./ChargeShapes/Bend";
import Chief from "./ChargeShapes/Chief";
import Cross from "./ChargeShapes/Cross";
import Saltire from "./ChargeShapes/Saltire";

export default class ChargeShapes {
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

  public static hasChargePath(charge: string): boolean {
    return ChargeShapes.chargePaths.includes(charge.toLowerCase());
  }

  private static chargePaths: string[] = ["bend", "chief", "cross", "saltire"];
}
