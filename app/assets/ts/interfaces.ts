export interface ICharge {
  charge: string;
  sinister?: boolean;
  tincture?: string;
}

export interface IBlazon {
  field: string;
  charges: ICharge[];
}
