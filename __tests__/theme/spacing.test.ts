import { spacing, spacingMultiplier } from '@theme/spacing';

describe('spacing', () => {
  it('has all spacing values defined', () => {
    expect(spacing.xs).toBeDefined();
    expect(spacing.sm).toBeDefined();
    expect(spacing.md).toBeDefined();
    expect(spacing.base).toBeDefined();
    expect(spacing.lg).toBeDefined();
    expect(spacing.xl).toBeDefined();
    expect(spacing['2xl']).toBeDefined();
    expect(spacing['3xl']).toBeDefined();
  });

  it('all spacing values are positive numbers', () => {
    Object.values(spacing).forEach(value => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThan(0);
    });
  });

  describe('spacingMultiplier', () => {
    it('multiplies base spacing by 2', () => {
      const result = spacingMultiplier(2);
      expect(result).toBe(spacing.base * 2);
    });

    it('multiplies base spacing by 0.5', () => {
      const result = spacingMultiplier(0.5);
      expect(result).toBe(spacing.base * 0.5);
    });

    it('returns base spacing when multiplier is 1', () => {
      const result = spacingMultiplier(1);
      expect(result).toBe(spacing.base);
    });

    it('returns 0 when multiplier is 0', () => {
      const result = spacingMultiplier(0);
      expect(result).toBe(0);
    });

    it('handles negative multipliers', () => {
      const result = spacingMultiplier(-1);
      expect(result).toBe(spacing.base * -1);
    });
  });
});
