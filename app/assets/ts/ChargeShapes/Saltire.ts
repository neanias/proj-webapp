import { EQuarter } from "../interfaces";
import AShape from "./AShape";

export default class Saltire extends AShape {
  public transforms(transform: string): string {
    switch (transform) {
      case EQuarter.TL:
        return "translate(-14, 2) scale(0.65)";
      case EQuarter.TR:
        return "translate(104) scale(0.65)";
      case EQuarter.BL:
        return "translate(-5, 125) scale(0.7)";
      case EQuarter.BR:
        return "translate(88, 110) scale(0.65)";
      default:
        return this.emptyString;
    }
  }

  public dimensions: Map<string, string> = new Map<string, string>(Object.entries({
    // tslint:disable-next-line
    d: "m 87.373047,130 -56.243164,56.04882 c 11.643855,19.58041 22.90614,38.75211 34.534179,53.01368 l 0.351563,0.42773 L 130,172.62695 l 63.77538,66.11133 c 12.07056,-14.39247 23.11034,-33.05854 34.92675,-52.68945 L 170,130 251.611,50.83596 V 8.286 H 209.203 L 130,87.373047 50.836914,7.773 7.5566406,7.7734375 7.557,50.835937 Z"
  }));
}
