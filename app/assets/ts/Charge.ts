import * as d3 from "d3-selection";

import ChargeShapes from "./ChargeShapes";
import { ECharge, EQuarter, ETincture, ICharge } from "./interfaces";

/**
 * Charge is to wrap a charge object sent to the server and to provide a single point of access to have charges
 * draw onto the SVG canvas.
 */
export default class Charge {
  /** GUID for this charge. Theoretically unique, probably not `¯\_(ツ)_/¯` */
  protected chargeId: string;
  /** The D3 selection for just the charge_layer `<g/>` element */
  protected chargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  /** The particular charge to be drawn, all paths are specified in [[ChargeShapes]]. */
  protected charge: ECharge | EQuarter;
  /** Whether the charge should be sinister (right-to-left), should only apply to bends. */
  protected sinister: boolean;
  /** The tincture (colour) of the charge */
  protected tincture: ETincture;

  constructor(chargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>, tincture: ETincture,
              charge: ECharge | EQuarter, sinister: boolean) {
    this.tincture = tincture;
    this.charge = charge;
    this.chargeId = `${this.charge}_${this.getRandomInt()}`;
    this.chargesLayer = chargesLayer;
    this.sinister = sinister;
  }

  /**
   * Updates the current [[chargesLayer]]. This is useful for [[Quarter]] when it needs to draw a charge in a
   * newly-generated layer.
   */
  public updateChargesLayer(newChargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>): void {
    this.chargesLayer = newChargesLayer;
  }

  /** Generates new layer for this charge, then draws on the charge, applying transforms where appropriate */
  public draw(clipPathUrl?: string): void {
    const chargeLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any> = this.chargesLayer.append("g")
      .attr("id", this.chargeId);

    const currentCharge: d3.Selection<d3.BaseType, {}, HTMLElement, any> = (this.charge === ECharge.Chief)
      ? chargeLayer.append("rect")
      : chargeLayer.append("path");

    this.drawCharge(currentCharge, chargeLayer);

    if (clipPathUrl) {
      currentCharge.attr("clip-path", `url(#${clipPathUrl})`);
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
