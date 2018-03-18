import { EQuarter } from "../interfaces";
import AShape from "./AShape";

export default class Chief extends AShape {
  public dimensions: Map<string, string> = new Map<string, string>(Object.entries({
    height: "82.13308",
    width: "243.61922",
    x: "8.2475185",
    y: "8.1713638",
  }));

  public transforms(transform: EQuarter): string {
    switch (transform) {
      case EQuarter.TL:
        return "scale(0.55)";
      case EQuarter.TR:
        return "translate(125) scale(0.55)";
      case EQuarter.BL:
        return "translate(0, 127.5) scale(0.55)";
      case EQuarter.BR:
        return "translate(125, 127) scale(0.55)";
      default:
        return this.emptyString;
    }
  }
}
