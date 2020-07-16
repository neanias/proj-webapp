import * as d3 from "d3-selection";

import { ETincture } from "./interfaces";

export default abstract class Renderer {
  /** GUID for this charge. Theoretically unique, probably not `¯\_(ツ)_/¯` */
  protected chargeId: string;
  /** The tincture (colour) of the charge */
  protected tincture: ETincture;
  /** The D3 selection for just the charge_layer `<g/>` element */
  protected parentChargesLayer: d3.Selection<
    d3.BaseType,
    unknown,
    HTMLElement,
    unknown
  >;

  constructor(
    parentChargesLayer: d3.Selection<
      d3.BaseType,
      unknown,
      HTMLElement,
      unknown
    >,
    tincture: ETincture
  ) {
    this.tincture = tincture;
    this.parentChargesLayer = parentChargesLayer;
  }

  public abstract draw(): void;

  /**
   * Updates the current [[parentChargesLayer]]. This is useful for [[Quarter]] when it needs to draw a charge in a
   * newly-generated layer.
   */
  public updateChargesLayer(
    newChargesLayer: d3.Selection<d3.BaseType, unknown, HTMLElement, unknown>
  ): void {
    this.parentChargesLayer = newChargesLayer;
  }

  protected getRandomInt(max = 512): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
