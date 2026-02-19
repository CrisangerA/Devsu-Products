import { getTextStyle } from '@theme/components/Text.styles';

describe('Text.styles', () => {
  describe('getTextStyle', () => {
    it('returns default styles', () => {
      const style = getTextStyle({});
      expect(style.color).toBeDefined();
    });

    it('applies text align', () => {
      const style = getTextStyle({ align: 'center' });
      expect(style.textAlign).toBe('center');
    });

    it('applies text transform', () => {
      const style = getTextStyle({ transform: 'uppercase' });
      expect(style.textTransform).toBe('uppercase');
    });

    it('applies text decoration', () => {
      const style = getTextStyle({ decoration: 'underline' });
      expect(style.textDecorationLine).toBe('underline');
    });

    it('applies all text properties together', () => {
      const style = getTextStyle({
        align: 'right',
        transform: 'lowercase',
        decoration: 'line-through',
      });
      expect(style.textAlign).toBe('right');
      expect(style.textTransform).toBe('lowercase');
      expect(style.textDecorationLine).toBe('line-through');
    });

    it('does not apply align when undefined', () => {
      const style = getTextStyle({});
      expect(style.textAlign).toBeUndefined();
    });

    it('does not apply transform when undefined', () => {
      const style = getTextStyle({});
      expect(style.textTransform).toBeUndefined();
    });

    it('does not apply decoration when undefined', () => {
      const style = getTextStyle({});
      expect(style.textDecorationLine).toBeUndefined();
    });

    it('applies different typography variants', () => {
      const variants = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body',
        'bodySmall',
        'caption',
      ] as const;

      variants.forEach(variant => {
        const style = getTextStyle({ variant });
        expect(style.fontSize).toBeDefined();
      });
    });

    it('applies light mode colors', () => {
      const style = getTextStyle({ mode: 'light', color: 'text' });
      expect(style.color).toBeDefined();
    });

    it('applies dark mode colors', () => {
      const style = getTextStyle({ mode: 'dark', color: 'text' });
      expect(style.color).toBeDefined();
    });

    it('applies different color variants', () => {
      const colors = [
        'text',
        'textSecondary',
        'primary',
        'error',
        'success',
      ] as const;

      colors.forEach(color => {
        const style = getTextStyle({ color });
        expect(style.color).toBeDefined();
      });
    });
  });
});
