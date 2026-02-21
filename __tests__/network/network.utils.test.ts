import { simulateNetworkRequest } from '@modules/network/domain/network.utils';

describe('network.utils', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('simulateNetworkRequest', () => {
    it('returns a promise that resolves with success message', async () => {
      const promise = simulateNetworkRequest();

      jest.runAllTimers();

      const result = await promise;
      expect(result).toBe('Network request successful');
    });

    it('resolves after a random delay', async () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);

      const promise = simulateNetworkRequest();

      jest.runAllTimers();

      await expect(promise).resolves.toBe('Network request successful');

      jest.spyOn(Math, 'random').mockRestore();
    });

    it('returns a Promise instance', () => {
      const result = simulateNetworkRequest();
      expect(result).toBeInstanceOf(Promise);
      jest.runAllTimers();
    });
  });
});
