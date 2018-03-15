import { EQuarter } from "../interfaces";
import AShape from "./AShape";

export default class Bend extends AShape {
  public dimensions: Map<string, string> = new Map<string, string>(Object.entries({
    // tslint:disable-next-line
    d: "M 8.053,50.836821 V 8.275 H 50.836821 L 228.70266,186.04979 c -12.13389,20.29289 -20.27626,34.91228 -34.92061,52.69471 z"
  }));

  public transforms(transform: string): string {
    switch (transform) {
      case EQuarter.TL:
        return "scale(0.65)";
      case EQuarter.TR:
        return "translate(125) scale(0.65)";
      case EQuarter.BL:
        return "translate(7, 126.5) scale(0.65)";
      case EQuarter.BR:
        return "translate(124, 126) scale(0.65)";
      case `${EQuarter.TL} sinister`:
        return "translate(-17.5) scale(0.65) matrix(-1,0,0,1,236.58573,0)";
      case `${EQuarter.TR} sinister`:
        return "translate(105) scale(0.65) matrix(-1,0,0,1,236.58573,0)";
      case `${EQuarter.BL} sinister`:
        return "translate(-18, 126.5) scale(0.65) matrix(-1,0,0,1,236.58573,0)";
      case `${EQuarter.BR} sinister`:
        return "translate(100, 126) scale(0.65) matrix(-1,0,0,1,236.58573,0)";
      case "sinister":
        return "translate(23.4, -0.5) matrix(-1,0,0,1,236.58573,0)";
      default:
        return this.emptyString;
    }
  }
}
