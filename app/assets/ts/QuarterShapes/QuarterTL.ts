import AQuarterShape from "./AQuarterShape";

export default class QuarterTL extends AQuarterShape {
  public dimensions: Map<string, string> = new Map<string, string>(Object.entries({
    // tslint:disable-next-line
    d: "M 7.126,8.054 V 95.796655 C 7.895406,107.51279 9.6685768,121.5072 12.552302,132.1454 L 130,131.82837 V 8.054 Z"
  }));
}
