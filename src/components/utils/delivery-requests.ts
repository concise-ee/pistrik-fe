import { toast } from 'react-toastify';
import { Address, AddressSearchResult, CompanySearchResult, DeliveryNote } from './types';
import { baseRequest } from './base-request';
import { ARIREGISTER_BASE_URL, INADDRESS_BASE_URL } from '../configs/url-config';

export const fetchSearchByAddress = async (
  query: string,
  ehakCode?: string
): Promise<AddressSearchResult | undefined> => {
  try {
    if (!query.length) return;

    const { data } = await baseRequest({
      method: 'GET',
      path: `${INADDRESS_BASE_URL}gazetteer?address=${query}&features=KATASTRIYKSUS${
        ehakCode ? `&ehak=${ehakCode}` : ''
      }
`,
      withCredentials: false,
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchSearchByCompanyQuery = async (query: string): Promise<CompanySearchResult[] | undefined> => {
  try {
    if (!query.length) return;

    const { data } = await baseRequest({
      method: 'GET',
      path: `${ARIREGISTER_BASE_URL}q=${query}&results=10`,
      withCredentials: false,
    });
    return data.data;
  } catch (e) {
    console.error(e);
  }
};

export const sendDeliveryNoteSave = async (deliveryNote: DeliveryNote): Promise<DeliveryNote | undefined> => {
  try {
    const { data } = await baseRequest({
      method: 'POST',
      path: 'api/delivery',
      withCredentials: false,
      data: deliveryNote,
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const updateAddress = async (addressId: number): Promise<Address | null | false> => {
  try {
    const { data } = await baseRequest({
      method: 'PUT',
      path: `api/address/update/${addressId}`,
      withCredentials: false,
    });
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getAllActiveAddresses = async (): Promise<Address[] | undefined> => {
  try {
    const { data } = await baseRequest({
      method: 'GET',
      path: 'api/address/active',
      withCredentials: false,
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getHistoricForAddress = async (addressId: number): Promise<Address[] | undefined> => {
  try {
    const { data } = await baseRequest({
      method: 'GET',
      path: `api/address/${addressId}`,
      withCredentials: false,
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};
