import { AxiosError } from 'axios';
import { AXIOS_MESSAGES } from './network.messages';

export function manageAxiosError(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.code?.includes('ERR_NETWORK')) {
      return new Error(AXIOS_MESSAGES.NETWORK_ERROR);
    }

    if (error.code?.includes('ECONNREFUSED')) {
      return new Error(AXIOS_MESSAGES.CONNECTION_REFUSED);
    }

    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }

    return new Error(error.message + ' - ' + error.code);
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error(AXIOS_MESSAGES.UNKNOWN_ERROR);
}
