import * as d3 from "d3-selection";

import ChargeShapes from "./ChargeShapes";
import { ECharge, EQuarter, ETincture, ICharge } from "./interfaces";
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

  /** Generates new layer for this charge, then draws on the charge, applying transforms where appropriate */
  public draw(quarter?: EQuarter): void {
    const chargeLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any> = this.parentChargesLayer.append("g")
      .attr("id", this.chargeId);

    const currentCharge: d3.Selection<d3.BaseType, {}, HTMLElement, any> = (this.charge === ECharge.Chief)
      ? chargeLayer.append("rect")
      : chargeLayer.append("path");

    this.drawCharge(currentCharge, chargeLayer);

    if (quarter) {
      chargeLayer.attr("clip-path", `url(#${quarter})`);
    }
  }

  protected drawCharge(currentCharge: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
                       chargeLayer?: d3.Selection<d3.BaseType, {}, HTMLElement, any>): void {
    // Apply specifications
    if (!ChargeShapes.chargePaths.has(this.charge)) {
      throw new Error(`Don't know how to draw ${this.charge}`);
    }

    // forEach returns the value before the key
    ChargeShapes.chargePaths.get(this.charge)!.forEach((property, attribute) => {
      currentCharge.attr(attribute, property)
        .classed(this.tincture, true);
    });
  }

    if (this.sinister && chargeLayer) {
      chargeLayer.attr("transform", "matrix(-1,0,0,1,236.58573,0) translate(-23.2, -0.5)");
    } else if (this.sinister) {
      currentCharge.attr("transform", "matrix(-1,0,0,1,236.58573,0) translate(-23.2, -0.5)");
    }
  }

  private getRandomInt(max: number = 512) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
