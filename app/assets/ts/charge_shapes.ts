export default class ChargeShapes {
  public static chargePaths: Map<string, Map<string, string>> = ChargeShapes.populateChargePaths();

  private static populateChargePaths(): Map<string, Map<string, string>> {
    const chargePaths = new Map<string, Map<string, string>>();

    // tslint:disable
    chargePaths.set("bend", new Map<string, string>(Object.entries({
      d: "M 8.053,50.836821 V 8.275 H 50.836821 L 228.70266,186.04979 c -12.13389,20.29289 -20.27626,34.91228 -34.92061,52.69471 z"
    })));

    chargePaths.set("saltire", new Map<string, string>(Object.entries({
      d: "m 87.373047,130 -56.243164,56.04882 c 11.643855,19.58041 22.90614,38.75211 34.534179,53.01368 l 0.351563,0.42773 L 130,172.62695 l 63.77538,66.11133 c 12.07056,-14.39247 23.11034,-33.05854 34.92675,-52.68945 L 170,130 251.283,50.835937 251.2832,8.7773438 209.20312,8.777 130,87.373047 50.836914,7.773 7.5566406,7.7734375 7.557,50.835937 Z"
    })));

    chargePaths.set("cross", new Map<string, string>(Object.entries({
      d: "M 103.05419,8.8466673 V 98.619157 L 8.671746,98.568765 C 8.879759,120.56067 14.867157,137.1812 19.649682,156.364 H 103.0542 V 273.846 C 115.86452,286.06558 130,292.25 130,292.25 c 0,0 11.97517,-4.30987 25.41,-16.52908 l 0.18947,-119.27375 84.30786,-1.7e-4 c 5.88814,-23.46654 10.72801,-37.78542 10.70125,-58.016 h -94.76294 c -0.24881,-28.735197 0,-57.976571 0,-89.5843327 z"
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
