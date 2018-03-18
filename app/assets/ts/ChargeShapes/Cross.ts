import { EQuarter } from "../interfaces";
import AShape from "./AShape";

export default class Cross extends AShape {
  public dimensions: Map<string, string> = new Map<string, string>(Object.entries({
    // tslint:disable-next-line
    d: "M 103.05419,8.8466673 V 98.619157 L 8.671746,98.568765 C 8.879759,120.56067 14.867157,137.1812 19.649682,156.364 H 103.0542 V 273.846 C 115.86452,286.06558 130,292.25 130,292.25 c 0,0 11.97517,-4.30987 25.41,-16.52908 l 0.18947,-119.27375 84.30786,-1.7e-4 c 5.88814,-23.46654 10.72801,-37.78542 10.70125,-58.016 h -94.76294 c -0.24881,-28.735197 0,-57.976571 0,-89.5843327 z"
  }));

  public transforms(transform: string): string {
    switch (transform) {
      case EQuarter.TL:
        return "translate(-9, -5) scale(0.6)";
      case EQuarter.TR:
        return "translate(113, -8) scale(0.6)";
      case EQuarter.BL:
        return "translate(-9, 110) scale(0.6)";
      case EQuarter.BR:
        return "translate(110, 120) scale(0.6)";
      default:
        return this.emptyString;
    }
  }
}
