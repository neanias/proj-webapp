export enum ETincture {
  /** For specifying [[Quarter]]s */
  Quarterly = "quarterly",
  /** Gold/yellow */
  Or = "or",
  /** White */
  Argent = "argent",
  /** Blue */
  Azure = "azure",
  /** Red */
  Gules = "gules",
  /** Purple */
  Purpure = "purpure",
  /** Black */
  Sable = "sable",
  /** Green */
  Vert = "vert",
}

export enum ECharge {
  Bend = "bend",
  Cross = "cross",
  Chief = "chief",
  Saltire = "saltire",
}

export enum EQuarter {
  TL = "quarterly_tl",
  TR = "quarterly_tr",
  BL = "quarterly_bl",
  BR = "quarterly_br",
}

export interface ICharge {
  charge: ECharge;
  sinister?: boolean;
  tincture?: ETincture;
}

export interface IBlazon {
  field: ETincture;
  charges: ICharge[];
}

export interface IQuarterly {
  field: "quarterly";
  quarters: IBlazon[];
}
