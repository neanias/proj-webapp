export enum Field {
  Quarterly = "quarterly",
  Or = "or",
  Argent = "argent",
  Azure = "azure",
  Gules = "gules",
  Purpure = "purpure",
  Sable = "sable",
  Vert = "vert",
}

export enum Charge {
  Bend = "bend",
  Cross = "cross",
  Chief = "chief",
  Saltire = "saltire",
}

export interface ICharge {
  charge: Charge;
  sinister?: boolean;
  tincture?: string;
}

export interface IBlazon {
  field: Field;
  charges: ICharge[];
}
