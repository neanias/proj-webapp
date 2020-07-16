import AQuarterShape from "./AQuarterShape";

export default class QuarterTR extends AQuarterShape {
  public dimensions: Map<string, string> = new Map<string, string>(
    Object.entries({
      d:
        "m 130,8.054 h 123.5 l -0.2938,81.884994 C 251.88339,104.5811 251.32682,118.40753 247.88878,131.828 H 130 Z",
    })
  );
}
