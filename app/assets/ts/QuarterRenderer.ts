import * as d3 from "d3-selection";

import Renderer from "./Renderer";

import { EQuarter, ETincture } from "./interfaces";
import QuarterShapes from "./QuarterShapes";

/**
 * Extension of [[Renderer]] class specifically for drawing a [[QuarterShapes]] onto the shield. This is used in
 * [[Quarter]] to sandbox the [[ChargeShapes]] being drawn in that quarter.
 */
export default class QuarterRenderer extends Renderer {
  private readonly quarter: EQuarter;

  constructor(chargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>, tincture: ETincture,
              quarter: EQuarter, sinister: boolean) {
    super(chargesLayer, tincture);
    this.quarter = quarter;
  }

  /**
   * Generates new layer for this quarter, generates a new `path` element in the layer and calls [[drawQuarter]] to
   * populate them.
   */
  public draw(): void {
    const quarterLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any> = this.parentChargesLayer.append("g")
      .attr("id", this.quarter);

    const currentQuarter: d3.Selection<d3.BaseType, {}, HTMLElement, any> = quarterLayer.append("path");

    this.drawQuarter(currentQuarter);
  }

  /**
   * 'Draws' a path in a `clipPath` element in `defs` element. This means that charges can be larger than the quarter
   * that contains them, but not infringe on neighbouring quarters.
   */
  public addClipPathDefinition(svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>): void {
    const defs: d3.Selection<d3.BaseType, {}, HTMLElement, any> = svg.select("defs");
    const clipPath: d3.Selection<d3.BaseType, {}, HTMLElement, any> = defs.append("clipPath").attr("id", this.quarter);
    this.updateChargesLayer(clipPath);

    const currentQuarter: d3.Selection<d3.BaseType, {}, HTMLElement, any> = this.parentChargesLayer.append("path");

    this.drawQuarter(currentQuarter);
  }

  /**
   * Gives the passed in `path` element the attributes for this quarter.
   * @param currentQuarter  The `path` element for the quarter.
   */
  private drawQuarter(currentQuarter: d3.Selection<d3.BaseType, {}, HTMLElement, any>): void {
    // forEach returns the value before the key
    QuarterShapes.quarterShapes(this.quarter).dimensions.forEach((property, attribute) => {
      currentQuarter.attr(attribute, property)
        .classed(this.tincture, true);
    });
 }

}
