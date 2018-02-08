export interface ICharge {
  charge: string;
  sinister?: boolean;
  tincture?: string;
}

export interface IBlazon {
  field: Field;
  charges: ICharge[];
}

enum Field {
  Quarterly = "quarterly",
  Or = "or",
  Argent = "argent",
  Azure = "azure",
  Gules = "gules",
  Purpure = "purpure",
  Sable = "sable",
  Vert = "vert",
}
