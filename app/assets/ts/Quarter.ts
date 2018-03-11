import * as d3 from "d3-selection";

import Charge from "./Charge";
import { EQuarter, ETincture, ICharge } from "./interfaces";
import QuarterShape from "./QuarterShape";

export default class Quarter {
  /** Specifies which of the quarters this object will render. Lines up with paths in [[ChargeShapes]]. */
  private quarter: EQuarter;
  /** Adds a specific shape for drawing the quarter, acts like a whole shield for the [[charges]]. */
  private quarterShape: QuarterShape;
  /** Defines the tincture of the field */
  private field: ETincture;
  /** The [[Charge]]s to render in this quarter. */
  private charges: Charge[];
  /** The D3 selection for the whole svg element. Useful for adding paths as clipPaths. */
  private svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  /** The D3 selection for just the charge_layer `<g/>` element */
  private chargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  constructor(index: number, field: ETincture, charges: ICharge[], svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
              chargesLayer: d3.Selection<d3.BaseType, {}, HTMLElement, any>) {
    this.quarter = this.indexToQuarter(index);
    this.field = field;
    this.charges = this.instantiateCharges(charges);
    this.svg = svg;
    this.chargesLayer = chargesLayer;
    this.quarterShape = new QuarterShape(chargesLayer, field, this.quarter, false);
  }

  public draw(): void {
    this.quarterShape.draw();
    this.quarterShape.addClipPathDefinition(this.svg);
    const quarterLayer = this.chargesLayer.select(`#${this.quarter}`);

    this.charges.forEach((charge) => {
      charge.updateChargesLayer(quarterLayer);
      charge.draw(this.quarter);
    });
  }

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
   * Iterates over [[ICharge]] objects and builds them into instances of [[Charge]].
   * @param charges  These generally are extracted from the server's JSON payload ([[data]]).
   */
  private instantiateCharges(charges: ICharge[]): Charge[] {
    const chargeObjects: Charge[] = new Array<Charge>();
    for (const charge of charges) {
      chargeObjects.push(new Charge(
        this.chargesLayer,
        charge.tincture!,
        charge.charge,
        charge.sinister || false,
      ));
    }
    return chargeObjects;
  }
}
