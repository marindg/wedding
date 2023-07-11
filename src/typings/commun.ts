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

export interface IService {
  code: number;
  status: string;
  message: string | object;
}

export interface ICustomError extends Error {
  statusCode?: number;
  message: string;
}
