import * as d3 from "d3-selection";

import { ETincture } from "./interfaces";

/**
 * Parent, abstract class for both the [[QuarterRenderer]] and [[ChargeRenderer]] classes. Provides common definitions
 * for updating the charge layer as well as generating a random integer for [[chargeId]]s.
 */
export default abstract class Renderer {
  /** GUID for this charge. Theoretically unique, probably not `¯\_(ツ)_/¯` */
  protected chargeId: string;
  /** The tincture (colour) of the charge */
  protected tincture: ETincture;
  /** The D3 selection for just the charge_layer `<g/>` element */
  protected parentChargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  /**
   * Intantiates the common elements for the child class implementations.
   */
  constructor(parentChargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>, tincture: ETincture) {
    this.tincture = tincture;
    this.parentChargesLayer = parentChargesLayer;
  }

  /**
   * All renderers must implement a `#draw` function as their main entry point.
   */
  public abstract draw(): void;

  /**
   * Updates the current [[parentChargesLayer]]. This is useful for [[Quarter]] when it needs to draw a charge in a
   * newly-generated layer.
   */
  public updateChargesLayer(newChargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>): void {
    this.parentChargesLayer = newChargesLayer;
  }

  /**
   * Generates a random integer in the range of 0..512.
   */
  protected getRandomInt(max: number = 512): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
