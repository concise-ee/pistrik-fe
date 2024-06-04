import axios, { Method, ResponseType } from 'axios';
import { BE_URL } from '../configs/url-config';

interface RequestPayload {
  method: Method;
  path: string;
  data?: Record<string, unknown> | FormData | string[] | string | any;
  baseUrl?: string;
  contentType?: string;
  responseType?: ResponseType;
  withCredentials?: boolean;
}

export const baseRequest = async ({
  method,
  path,
  data,
  baseUrl,
  contentType,
  responseType = 'json',
  withCredentials = true,
}: RequestPayload) =>
  axios({
    method,
    baseURL: baseUrl || BE_URL,
    url: path,
    headers: {
      Accept: '*/*',
      'Content-Type': contentType || 'application/json',
    },
    responseType,
    withCredentials,
    ...(data && { data }),
  });
