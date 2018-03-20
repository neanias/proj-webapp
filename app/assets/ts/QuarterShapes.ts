import { EQuarter } from "./interfaces";
import AQuarterShape from "./QuarterShapes/AQuarterShape";

import QuarterBL from "./QuarterShapes/QuarterBL";
import QuarterBR from "./QuarterShapes/QuarterBR";
import QuarterTL from "./QuarterShapes/QuarterTL";
import QuarterTR from "./QuarterShapes/QuarterTR";

/**
 * A class for accessing the drawable quarters. Follows the same design pattern as [[ChargeShapes]].
 */
export default class QuarterShapes {
  /**
   * Returns a new element for the specified [[EQuarter]]. This is then usually chained to access the dimensions.
   */
  public static quarterShapes(quarter: EQuarter): AQuarterShape {
    switch (quarter) {
      case EQuarter.TL:
        return new QuarterTL();
      case EQuarter.TR:
        return new QuarterTR();
      case EQuarter.BL:
        return new QuarterBL();
      case EQuarter.BR:
        return new QuarterBR();
    }
  }
}
