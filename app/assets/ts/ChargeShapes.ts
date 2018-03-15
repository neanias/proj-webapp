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

  private static populateChargePaths(): Map<string, Map<string, string>> {
    const chargePaths = new Map<string, Map<string, string>>();

    // tslint:disable

    // Charges
    chargePaths.set("bend", new Map<string, string>(Object.entries({
      d: "M 8.053,50.836821 V 8.275 H 50.836821 L 228.70266,186.04979 c -12.13389,20.29289 -20.27626,34.91228 -34.92061,52.69471 z"
    })));

    chargePaths.set("saltire", new Map<string, string>(Object.entries({
      d: "m 87.373047,130 -56.243164,56.04882 c 11.643855,19.58041 22.90614,38.75211 34.534179,53.01368 l 0.351563,0.42773 L 130,172.62695 l 63.77538,66.11133 c 12.07056,-14.39247 23.11034,-33.05854 34.92675,-52.68945 L 170,130 251.283,50.835937 251.2832,8.7773438 209.20312,8.777 130,87.373047 50.836914,7.773 7.5566406,7.7734375 7.557,50.835937 Z"
    })));

    chargePaths.set("cross", new Map<string, string>(Object.entries({
      d: "M 103.05419,8.8466673 V 98.619157 L 8.671746,98.568765 C 8.879759,120.56067 14.867157,137.1812 19.649682,156.364 H 103.0542 V 273.846 C 115.86452,286.06558 130,292.25 130,292.25 c 0,0 11.97517,-4.30987 25.41,-16.52908 l 0.18947,-119.27375 84.30786,-1.7e-4 c 5.88814,-23.46654 10.72801,-37.78542 10.70125,-58.016 h -94.76294 c -0.24881,-28.735197 0,-57.976571 0,-89.5843327 z"
    })));

    // Quarterlies
    chargePaths.set("quarterly_tl", new Map<string, string>(Object.entries({
      d: "M 7.126,8.054 V 95.796655 C 7.895406,107.51279 9.6685768,121.5072 12.552302,132.1454 L 130,131.82837 V 8.054 Z"
    })));

    chargePaths.set("quarterly_tr", new Map<string, string>(Object.entries({
      d: "m 130,8.054 h 123.5 l -0.2938,81.884994 C 251.88339,104.5811 251.32682,118.40753 247.88878,131.828 H 130 Z"
    })));

    chargePaths.set("quarterly_bl", new Map<string, string>(Object.entries({
      d: "M 130,131.82837 12.552302,132.1454 c 1.065729,11.01971 5.991543,22.50934 9.543206,34.19955 3.193044,8.10164 6.04986,15.78192 13.306257,29.45485 5.398781,10.29043 11.116816,18.77476 16.871383,27.05243 8.35093,11.88916 17.937794,22.53087 27.993836,32.69903 6.317222,6.32668 13.387602,12.46228 20.878136,18.49129 7.60573,5.98334 15.88173,12.13403 28.85488,19.45745 z"
    })));

    chargePaths.set("quarterly_br", new Map<string, string>(Object.entries({
      d: "m 130,131.82837 117.88878,-3.7e-4 c -0.27808,13.08619 -6.20135,24.55269 -10.40208,35.6299 -4.29664,12.17693 -9.87356,22.0301 -15.13976,32.44724 -7.29453,12.82809 -16.01776,26.07323 -28.33588,40.36775 l -25.35486,25.5889 c -8.96033,8.24822 -18.48291,14.57729 -27.91324,21.22127 L 130,293.5 Z"
    })));

    // tslint:enable

    chargePaths.set("chief", new Map<string, string>(Object.entries({
      height: "82.13308",
      width: "243.61922",
      x: "8.2475185",
      y: "8.1713638",
    })));

    return chargePaths;
  }
}
