import { mmkvReviver } from '@config/storage';

jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn((key: string) => {
      const store: Record<string, string> = {};
      return store[key] || null;
    }),
    set: jest.fn(),
    delete: jest.fn(),
    contains: jest.fn(),
    getAllKeys: jest.fn(() => []),
    clearAll: jest.fn(),
  })),
}));

describe('storage', () => {
  describe('mmkvReviver', () => {
    it('converts ISO date string to Date object', () => {
      const dateString = '2024-01-15T10:30:00.000Z';
      const result = mmkvReviver('someKey', dateString);

      expect(result).toBeInstanceOf(Date);
    });

    it('returns original value for non-date strings', () => {
      const regularString = 'hello world';
      const result = mmkvReviver('someKey', regularString);

      expect(result).toBe(regularString);
    });

    it('returns original value for non-string types', () => {
      expect(mmkvReviver('key', 123)).toBe(123);
      expect(mmkvReviver('key', true)).toBe(true);
      expect(mmkvReviver('key', null)).toBe(null);
      expect(mmkvReviver('key', { foo: 'bar' })).toEqual({ foo: 'bar' });
    });

    it('returns original value for invalid date format', () => {
      const invalidDate = '2024-01-15';
      const result = mmkvReviver('key', invalidDate);

      expect(result).toBe(invalidDate);
    });

    it('handles different valid date formats correctly', () => {
      const validDate = '2023-12-25T00:00:00.000Z';
      const result = mmkvReviver('key', validDate);

      expect(result).toBeInstanceOf(Date);
    });
  });
});
