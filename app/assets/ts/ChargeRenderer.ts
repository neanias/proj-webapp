import * as d3 from "d3-selection";

import ChargeShapes from "./ChargeShapes";
import { ECharge, EQuarter, ETincture } from "./interfaces";
import Renderer from "./Renderer";

/**
 * ChargeRenderer is to wrap a charge object sent to the server and to provide a single point of access to have charges
 * draw onto the SVG canvas.
 */
export default class ChargeRenderer extends Renderer {
  /** The particular charge to be drawn, all paths are specified in [[ChargeShapes]]. */
  protected charge: ECharge;
  /** Whether the charge should be sinister (right-to-left), should only apply to bends. */
  protected sinister: boolean;

  constructor(parentChargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>, tincture: ETincture,
              charge: ECharge, sinister: boolean) {
    super(parentChargesLayer, tincture);
    this.charge = charge;
    this.chargeId = `${this.charge}_${this.getRandomInt()}`;
    this.sinister = sinister;
  }

  /**
   * Generates new layer to contain the charge and a new, empty element for the charge to populate. Calls [[drawCharge]]
   * to add in attributes and transformations (where necessary).
   * @param quarter?  Optional argument that will add a `clip-path` attribute and specify quarterly transformations.
   */
  public draw(quarter?: EQuarter): void {
    const chargeLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any> = this.parentChargesLayer.append("g")
      .attr("id", this.chargeId);

    const currentCharge: d3.Selection<d3.BaseType, {}, HTMLElement, any> = (this.charge === ECharge.Chief)
      ? chargeLayer.append("rect")
      : chargeLayer.append("path");

    this.drawCharge(currentCharge);

    if (quarter) {
      chargeLayer.attr("clip-path", `url(#${quarter})`);
    }

    this.applyTransforms(currentCharge, quarter);
  }

  /**
   * Draws a charge onto the shield, as defined in [[ChargeShapes]].
   * @param currentCharge  The element that the [[charge]] is being used for drawing.
   */
  protected drawCharge(currentCharge: d3.Selection<d3.BaseType, {}, HTMLElement, any>): void {
    // Apply specifications
    if (!ChargeShapes.hasChargePath(this.charge)) {
      throw new Error(`Don't know how to draw ${this.charge}`);
    }

    // forEach returns the value before the key
    ChargeShapes.chargeShapes(this.charge).dimensions.forEach((property, attribute) => {
      currentCharge.attr(attribute, property)
        .classed(this.tincture, true);
    });
  }

  /**
   * Applies transforms to the currentCharge, as defined in [[QuarterShapes]].
   * @param currentCharge  The element that the [[charge]] is drawn in.
   * @param quarter?  Optional parameter for specifying transformations within a quarter.
   */
  private applyTransforms(currentCharge: d3.Selection<d3.BaseType, {}, HTMLElement, any>, quarter?: EQuarter): void {
    let transform: string = "";
    if (quarter && this.sinister) {
      transform = `${quarter} sinister`;
    } else if (quarter && !this.sinister) {
      transform = quarter;
    } else if (this.sinister) {
      transform = "sinister";
    }

    if (transform) {
      const transformToApply: string = ChargeShapes.chargeShapes(this.charge).transforms(transform);
      currentCharge.attr("transform", transformToApply);
    }
  }
}
