import * as d3 from "d3-selection";

import Renderer from "./Renderer";

import { ECharge, EQuarter, ETincture } from "./interfaces";
import QuarterShapes from "./QuarterShapes";

/**
 * Extension of [[Renderer]] class specifically for drawing a [[QuarterShape]] onto the shield. This is used in
 * [[Quarter]] to sandbox the [[Charge]] being drawn in that quarter.
 */
export default class QuarterRenderer extends Renderer {
  private quarter: EQuarter;

  constructor(chargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>, tincture: ETincture,
              quarter: EQuarter, sinister: boolean) {
    super(chargesLayer, tincture);
    this.quarter = quarter;
  }

  /** Generates new layer for this charge, then draws on the charge, applying transforms where appropriate */
  public draw(): void {
    const quarterLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any> = this.parentChargesLayer.append("g")
      .attr("id", this.quarter);

    const currentQuarter: d3.Selection<d3.BaseType, {}, HTMLElement, any> = quarterLayer.append("path");

    this.drawQuarter(currentQuarter);
  }

  public addClipPathDefinition(svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>): void {
    const defs: d3.Selection<d3.BaseType, {}, HTMLElement, any> = svg.select("defs");
    const clipPath: d3.Selection<d3.BaseType, {}, HTMLElement, any> = defs.append("clipPath").attr("id", this.quarter);
    this.updateChargesLayer(clipPath);

    const currentQuarter: d3.Selection<d3.BaseType, {}, HTMLElement, any> = this.parentChargesLayer.append("path");

    this.drawQuarter(currentQuarter);
  }
}
