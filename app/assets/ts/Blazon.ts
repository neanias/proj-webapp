import * as d3 from "d3-selection";

import ChargeRenderer from "./ChargeRenderer";
import { ETincture, IBlazon, ICharge } from "./interfaces";
import Quarter from "./Quarter";

/**
 * Blazon is the main entry point for all rendering. Blazon is instantiated and called in the index.ts file and has a
 * single [[draw]] function that calls all the related elements and draws them onto the shield.
 */
export default class Blazon {
  // SVG selectors
  /** The D3 selection, generally the top level SVG node in the template */
  private svg: d3.Selection<d3.BaseType, unknown, HTMLElement, unknown>;
  /** The D3 selection for the whole shield element */
  private shield: d3.Selection<d3.BaseType, unknown, HTMLElement, unknown>;
  /** The D3 selection for just the charge_layer `<g/>` element */
  private chargesLayer: d3.Selection<
    d3.BaseType,
    unknown,
    HTMLElement,
    unknown
  >;

  /** The payload from the server, turned into a more regular/agreeable format */
  private specifications: Map<string, unknown>;
  /** Tincture for the field of the shield. May be [[ETincture.Quarterly]]. */
  private field: ETincture;
  /** Optional array of Quarters. Populated if quarterly shield */
  private quarters?: Quarter[];
  /** Optional array of ChargeRenderers. Populated if non-quarterly shield */
  private charges?: ChargeRenderer[];

  /**
   * @param svg  The D3 selection, generally the top level SVG node in the template
   * @param data  The whole JSON payload sent up from the server
   */
  constructor(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, unknown>,
    private data: { key: string }
  ) {
    this.specifications = new Map<string, unknown>(Object.entries(this.data));
    this.field = this.specifications.get("field") as ETincture;
    this.populateSVGSelectors(svg);
    if (
      this.specifications.has("quarters") &&
      this.field === ETincture.Quarterly
    ) {
      this.quarters = this.instantiateQuarters(
        this.specifications.get("quarters") as IBlazon[]
      );
    } else if (this.specifications.has("charges")) {
      this.charges = this.instantiateCharges(
        this.specifications.get("charges") as ICharge[]
      );
    }
  }

  /**
   * Clears the shield if there is anything currently on it, then iterates over charges and draws them onto the
   * shield.
   */
  public draw(): void {
    this.clearShield();
    if (this.field !== ETincture.Quarterly && this.charges) {
      this.shield.classed(this.field, true);
      this.charges.forEach((charge) => charge.draw());
    } else if (this.field === ETincture.Quarterly && this.quarters) {
      this.quarters.forEach((quarter) => quarter.draw());
    } else {
      throw new Error("Unable to draw payload!");
    }
  }

  /**
   * Iterates over [[ICharge]] objects and builds them into instances of [[ChargeRenderer]].
   * @param charges  These generally are extracted from the server's JSON payload ([[data]]).
   */
  private instantiateCharges(charges: ICharge[]): ChargeRenderer[] {
    const chargeObjects: ChargeRenderer[] = new Array<ChargeRenderer>();
    for (const charge of charges) {
      chargeObjects.push(
        new ChargeRenderer(
          this.chargesLayer,
          charge.tincture,
          charge.charge,
          charge.sinister || false
        )
      );
    }
    return chargeObjects;
  }

  /**
   * Iterates over [[IBlazon]] objects and instantiate them into [[Quarter]] objects.
   * @param quarters  These quarters are generally extracted from the server's JSON payload ([[data]]).
   */
  private instantiateQuarters(quarters: IBlazon[]): Quarter[] {
    const quarterObjects: Quarter[] = new Array<Quarter>();
    quarters.forEach((quarter, index) => {
      quarterObjects.push(
        new Quarter(
          index,
          quarter.field,
          quarter.charges,
          this.svg,
          this.chargesLayer
        )
      );
    });
    return quarterObjects;
  }

  /**
   * Selects relevant elements of the template to make them available to the class
   */
  private populateSVGSelectors(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, unknown>
  ): void {
    this.svg = svg;
    this.shield = svg.select("#shield");
    this.chargesLayer = svg.select("#charges_layer");
  }

  /**
   * Loops over the #charges_layer's children in the template, removing them, before finally removing the class on the
   * shield
   */
  private clearShield(): void {
    // Remove any charges from the shield.
    const chargesLayer = document.getElementById(
      "charges_layer"
    ) as HTMLDivElement;
    Array.from(chargesLayer.children).forEach((element) => element.remove());

    // Remove any quarters.
    const quarterly = document.querySelectorAll("clipPath[id^=quarterly]");
    quarterly.forEach((element) => element.remove());

    // Clear the shield colour.
    const shield = document.getElementById("shield") as HTMLElement;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    shield.classList.remove(...shield.classList.values());
  }
}
