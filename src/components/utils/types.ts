export interface AddressSearchResult {
  host: string;
  addresses: Address[];
}

export interface Address {
  tunnus: string;
  boundingbox: string;
  ipikkaadress: string;
  taisaadress: string;
  adr_id: string;
  ehakmk: string;
  maakond: string;
  ehakov: string;
  omavalitsus: string;
  ehak: string;
  asustusyksus: string;
  aadresstekst: string;
  aadress_nr: string;
  koodaadress: string;
  viitepunkt_x: string;
  viitepunkt_y: string;
  ads_oid: string;
  adob_id: string;
  addressType: string;
  deliveryNoteId: string;
  active: boolean;
  id: number;
}

export interface DeliveryNote {
  issuerCode?: string;
  issuerName?: string;
  issuingAddress?: Address;
  issuingAddressFull?: string;
  delivererCode?: string;
  delivererName?: string;
  receiverCode?: string;
  receiverName?: string;
  receivingAddress?: Address;
  receivingAddressFull?: string;
  uuid?: string;
}

export interface CompanySearchResult {
  reg_code: number;
  name: string;
}
