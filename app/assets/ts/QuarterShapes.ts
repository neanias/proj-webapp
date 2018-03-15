import { EQuarter } from "./interfaces";
import AQuarterShape from "./QuarterShapes/AQuarterShape";

import QuarterBL from "./QuarterShapes/QuarterBL";
import QuarterBR from "./QuarterShapes/QuarterBR";
import QuarterTL from "./QuarterShapes/QuarterTL";
import QuarterTR from "./QuarterShapes/QuarterTR";

export default class QuarterShapes {
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
