import AQuarterShape from "./AQuarterShape";

export default class QuarterBR extends AQuarterShape {
  public dimensions: Map<string, string> = new Map<string, string>(Object.entries({
    // tslint:disable-next-line
    d: "m 130,131.82837 117.88878,-3.7e-4 c -0.27808,13.08619 -6.20135,24.55269 -10.40208,35.6299 -4.29664,12.17693 -9.87356,22.0301 -15.13976,32.44724 -7.29453,12.82809 -16.01776,26.07323 -28.33588,40.36775 l -25.35486,25.5889 c -8.96033,8.24822 -18.48291,14.57729 -27.91324,21.22127 L 130,293.5 Z"
  }));
}
