import * as d3 from "d3-selection";

import Charge from "./Charge";
import ChargeShapes from "./ChargeShapes";
import { ECharge, EQuarter, ETincture } from "./interfaces";

/**
 * Extension of [[Charge]] class specifically for drawing a quarter [[ChargeShape]] onto the shield. This is used in
 * [[Quarter]] to sandbox the [[Charge]] being drawn in that quarter.
 */
export default class QuarterShape extends Charge {
  constructor(chargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>, tincture: ETincture,
              charge: ECharge | EQuarter, sinister: boolean) {
    super(chargesLayer, tincture, charge, sinister);
    this.chargeId = `${charge}`;
  }

  /** Generates new layer for this charge, then draws on the charge, applying transforms where appropriate */
  public draw(): void {
    const chargeLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any> = this.chargesLayer.append("g")
      .attr("id", this.chargeId);

    const currentCharge: d3.Selection<d3.BaseType, {}, HTMLElement, any> = (this.charge === ECharge.Chief)
      ? chargeLayer.append("rect")
      : chargeLayer.append("path");

    this.drawCharge(currentCharge, chargeLayer);
  }

  public addClipPathDefinition(svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>): void {
    const defs: d3.Selection<d3.BaseType, {}, HTMLElement, any> = svg.select("defs");
    const clipPath: d3.Selection<d3.BaseType, {}, HTMLElement, any> = defs.append("clipPath");
    this.updateChargesLayer(clipPath);

    const currentCharge: d3.Selection<d3.BaseType, {}, HTMLElement, any> = (this.charge === ECharge.Chief)
      ? this.chargesLayer.append("rect")
      : this.chargesLayer.append("path");

    this.drawCharge(currentCharge);
  }
}
