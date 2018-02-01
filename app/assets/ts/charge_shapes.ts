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
