import {
  getButtonStyle,
  ButtonVariant,
  ButtonSize,
} from '@theme/components/Button.styles';

describe('Button.styles', () => {
  describe('getButtonStyle', () => {
    it('returns default styles for primary button', () => {
      const styles = getButtonStyle({});
      expect(styles.container).toBeDefined();
      expect(styles.text).toBeDefined();
      expect(styles.container.borderRadius).toBeDefined();
    });

    it('returns correct styles for each variant', () => {
      const variants: ButtonVariant[] = [
        'primary',
        'secondary',
        'outlined',
        'ghost',
      ];

      variants.forEach(variant => {
        const styles = getButtonStyle({ variant });
        expect(styles.container).toBeDefined();
        expect(styles.text).toBeDefined();
      });
    });

    it('returns correct styles for each size', () => {
      const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

      sizes.forEach(size => {
        const styles = getButtonStyle({ size });
        expect(styles.container.height).toBeGreaterThan(0);
        expect(styles.text.fontSize).toBeGreaterThan(0);
      });
    });

    it('applies fullWidth correctly', () => {
      const styles = getButtonStyle({ fullWidth: true });
      expect(styles.container.width).toBe('100%');
    });

    it('applies disabled state with opacity', () => {
      const styles = getButtonStyle({ disabled: true });
      expect(styles.container.opacity).toBe(0.5);
    });

    it('applies dark mode correctly', () => {
      const lightStyles = getButtonStyle({ mode: 'light' });
      const darkStyles = getButtonStyle({ mode: 'dark' });
      expect(lightStyles.container).toBeDefined();
      expect(darkStyles.container).toBeDefined();
    });

    it('uses default values when no props provided', () => {
      const styles = getButtonStyle({});
      expect(styles.container).toBeDefined();
      expect(styles.text).toBeDefined();
    });

    it('applies custom borderRadius', () => {
      const styles = getButtonStyle({ borderRadius: 'lg' });
      expect(styles.container.borderRadius).toBeDefined();
    });

    it('primary variant has primary background', () => {
      const styles = getButtonStyle({ variant: 'primary', mode: 'light' });
      expect(styles.container.backgroundColor).toBeDefined();
      expect(styles.text.color).toBe('#FFFFFF');
    });

    it('secondary variant has correct styles', () => {
      const styles = getButtonStyle({ variant: 'secondary', mode: 'light' });
      expect(styles.container.backgroundColor).toBeDefined();
      expect(styles.container.borderWidth).toBe(1);
    });

    it('outlined variant has transparent background', () => {
      const styles = getButtonStyle({ variant: 'outlined', mode: 'light' });
      expect(styles.container.backgroundColor).toBe('transparent');
      expect(styles.container.borderWidth).toBe(1.5);
    });

    it('ghost variant has no border and transparent background', () => {
      const styles = getButtonStyle({ variant: 'ghost', mode: 'light' });
      expect(styles.container.backgroundColor).toBe('transparent');
      expect(styles.container.borderWidth).toBe(0);
    });
  });
});
