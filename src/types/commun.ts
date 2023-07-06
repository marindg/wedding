export interface IAddress {
  country: string;
  postalCode: string;
  postalStreet: string;
  postalNum: string;
  postalPlus?: string;
}

export interface IContact {
  name: string;
  phone: string | null;
  availability: string | null;
  mail: string | null;
  comment?: string;
}
