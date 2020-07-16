import * as d3 from "d3-selection";

import Renderer from "./Renderer";

import { EQuarter, ETincture } from "./interfaces";
import QuarterShapes from "./QuarterShapes";

/**
 * Extension of [[Renderer]] class specifically for drawing a [[QuarterShape]] onto the shield. This is used in
 * [[Quarter]] to sandbox the [[Charge]] being drawn in that quarter.
 */
export default class QuarterRenderer extends Renderer {
  private quarter: EQuarter;

  constructor(
    chargesLayer: d3.Selection<d3.BaseType, unknown, HTMLElement, unknown>,
    tincture: ETincture,
    quarter: EQuarter
  ) {
    super(chargesLayer, tincture);
    this.quarter = quarter;
  }

  /** Generates new layer for this charge, then draws on the charge, applying transforms where appropriate */
  public draw(): void {
    const quarterLayer: d3.Selection<
      d3.BaseType,
      unknown,
      HTMLElement,
      unknown
    > = this.parentChargesLayer.append("g").attr("id", this.quarter);

    const currentQuarter: d3.Selection<
      d3.BaseType,
      unknown,
      HTMLElement,
      unknown
    > = quarterLayer.append("path");

    this.drawQuarter(currentQuarter);
  }

  public addClipPathDefinition(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, unknown>
  ): void {
    const defs: d3.Selection<
      d3.BaseType,
      unknown,
      HTMLElement,
      unknown
    > = svg.select("defs");
    const clipPath: d3.Selection<
      d3.BaseType,
      unknown,
      HTMLElement,
      unknown
    > = defs.append("clipPath").attr("id", this.quarter);
    this.updateChargesLayer(clipPath);

    const currentQuarter: d3.Selection<
      d3.BaseType,
      unknown,
      HTMLElement,
      unknown
    > = this.parentChargesLayer.append("path");

    this.drawQuarter(currentQuarter);
  }

  private drawQuarter(
    currentQuarter: d3.Selection<d3.BaseType, unknown, HTMLElement, unknown>
  ): void {
    // forEach returns the value before the key
    QuarterShapes.quarterShapes(this.quarter).dimensions.forEach(
      (property, attribute) => {
        currentQuarter.attr(attribute, property).classed(this.tincture, true);
      }
    );
  }
}
