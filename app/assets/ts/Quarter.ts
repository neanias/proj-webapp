import * as d3 from "d3-selection";

import ChargeRenderer from "./ChargeRenderer";
import { EQuarter, ETincture, ICharge } from "./interfaces";
import QuarterRenderer from "./QuarterRenderer";

export default class Quarter {
  /** Specifies which of the quarters this object will render. Lines up with paths in [[QuarterShapes]]. */
  private readonly quarter: EQuarter;
  /** Adds a specific shape for drawing the quarter, acts like a whole shield for the [[charges]]. */
  private readonly quarterRenderer: QuarterRenderer;
  /** The [[ChargeRenderer]]s to render in this quarter. */
  private readonly charges: ChargeRenderer[];
  /** The D3 selection for the whole svg element. Useful for adding paths as clipPaths. */
  private readonly svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  /** The D3 selection for just the charge_layer `<g/>` element */
  private readonly parentsChargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  constructor(index: number, field: ETincture, charges: ICharge[], svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
              parentsChargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>) {
    this.quarter = this.indexToQuarter(index);
    this.charges = this.instantiateCharges(charges);
    this.svg = svg;
    this.parentsChargesLayer = parentsChargesLayer;
    this.quarterRenderer = new QuarterRenderer(parentsChargesLayer, field, this.quarter, false);
  }

  /**
   * Draws the quarter path from [[QuarterShapes]] onto the shield, then adds a clipPath definition in the `defs`
   * element in the `svg` element. Next, hands off to the [[ChargeRenderer]] to draw the charges in that quarter.
   */
  public draw(): void {
    this.quarterRenderer.draw();
    this.quarterRenderer.addClipPathDefinition(this.svg);
    const quarterLayer = this.parentsChargesLayer.select(`#${this.quarter}`);

    this.charges.forEach((charge) => {
      charge.updateChargesLayer(quarterLayer);
      charge.draw(this.quarter);
    });
  }

  /**
   * The [[Quarter]] object is instantiated with an index from a `for` loop. This converts the index into an
   * [[EQuarter]] member based on the index. (Quarters go top left, top right, bottom left, bottom right,
   * zero-indexed.)
   */
  private indexToQuarter(index: number): EQuarter {
    switch (index) {
      case 0:
        return EQuarter.TL;
      case 1:
        return EQuarter.TR;
      case 2:
        return EQuarter.BL;
      case 3:
        return EQuarter.BR;
      default:
        throw new RangeError(`${index} not within range 0...4`);
    }
  }

  /**
   * Iterates over [[ICharge]] objects and builds them into instances of [[ChargeRenderer]].
   * @param charges  These generally are extracted from the server's JSON payload ([[data]]).
   */
  private instantiateCharges(charges: ICharge[]): ChargeRenderer[] {
    const chargeObjects: ChargeRenderer[] = new Array<ChargeRenderer>();
    for (const charge of charges) {
      chargeObjects.push(new ChargeRenderer(
        this.parentsChargesLayer,
        charge.tincture!,
        charge.charge,
        charge.sinister || false,
      ));
    }
    return chargeObjects;
  }
}
