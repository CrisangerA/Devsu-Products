import { manageAxiosError } from '@modules/network/domain/network.error';
import { AXIOS_MESSAGES } from '@modules/network/domain/network.messages';
import { AxiosError } from 'axios';

describe('manageAxiosError', () => {
  it('returns error for network error code', () => {
    const error = new AxiosError('Network error', 'ERR_NETWORK');
    const result = manageAxiosError(error);
    expect(result.message).toBe(AXIOS_MESSAGES.NETWORK_ERROR);
  });

  it('returns error for ECONNREFUSED code', () => {
    const error = new AxiosError('Connection refused', 'ECONNREFUSED');
    const result = manageAxiosError(error);
    expect(result.message).toBe(AXIOS_MESSAGES.CONNECTION_REFUSED);
  });

  it('returns error from response data message', () => {
    const error = new AxiosError('Bad Request', 'ERR_BAD_REQUEST');
    error.response = {
      data: { message: 'Custom error message' },
    } as never;
    const result = manageAxiosError(error);
    expect(result.message).toBe('Custom error message');
  });

  it('returns error with message and code', () => {
    const error = new AxiosError('Some error', 'ERR_UNKNOWN');
    const result = manageAxiosError(error);
    expect(result.message).toContain('Some error');
    expect(result.message).toContain('ERR_UNKNOWN');
  });

  it('returns original error if instance of Error', () => {
    const originalError = new Error('Original error');
    const result = manageAxiosError(originalError);
    expect(result.message).toBe('Original error');
  });

  it('returns unknown error for unknown error types', () => {
    const result = manageAxiosError('string error');
    expect(result.message).toBe(AXIOS_MESSAGES.UNKNOWN_ERROR);
  });
});
