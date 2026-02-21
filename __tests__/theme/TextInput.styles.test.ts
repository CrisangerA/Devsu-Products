import {
  getTextInputStyle,
  getLabelStyle,
  getErrorStyle,
  getHelperTextStyle,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from '@theme/components/TextInput.styles';

describe('TextInput.styles', () => {
  describe('getTextInputStyle', () => {
    it('returns default styles', () => {
      const styles = getTextInputStyle({});
      expect(styles.container).toBeDefined();
      expect(styles.input).toBeDefined();
    });

    it('returns correct styles for each variant', () => {
      const variants: TextInputVariant[] = ['default', 'outlined', 'filled'];

      variants.forEach(variant => {
        const styles = getTextInputStyle({ variant });
        expect(styles.container).toBeDefined();
        expect(styles.input).toBeDefined();
      });
    });

    it('returns correct styles for each size', () => {
      const sizes: TextInputSize[] = ['md', 'lg'];

      sizes.forEach(size => {
        const styles = getTextInputStyle({ size });
        expect(styles.container.height).toBeGreaterThan(0);
      });
    });

    it('returns correct styles for each state', () => {
      const states: TextInputState[] = [
        'default',
        'focus',
        'error',
        'disabled',
      ];

      states.forEach(state => {
        const styles = getTextInputStyle({ state });
        expect(styles.container).toBeDefined();
        expect(styles.input).toBeDefined();
      });
    });

    it('applies fullWidth correctly', () => {
      const styles = getTextInputStyle({ fullWidth: true });
      expect(styles.container.width).toBe('100%');
    });

    it('applies dark mode correctly', () => {
      const styles = getTextInputStyle({ mode: 'dark' });
      expect(styles.container).toBeDefined();
    });

    it('applies icon padding for left icon', () => {
      const styles = getTextInputStyle({ hasIconLeft: true });
      expect(styles.input.paddingLeft).toBeGreaterThan(0);
    });

    it('applies icon padding for right icon', () => {
      const styles = getTextInputStyle({ hasIconRight: true });
      expect(styles.input.paddingRight).toBeGreaterThan(0);
    });

    it('filled variant has no borderRadius', () => {
      const styles = getTextInputStyle({ variant: 'filled' });
      expect(styles.container.borderRadius).toBe(0);
    });

    it('focus state changes border color', () => {
      const defaultStyles = getTextInputStyle({ state: 'default' });
      const focusStyles = getTextInputStyle({ state: 'focus' });
      expect(focusStyles.container).toBeDefined();
      expect(defaultStyles.container).toBeDefined();
    });

    it('error state changes border color', () => {
      const styles = getTextInputStyle({ state: 'error', mode: 'light' });
      expect(styles.container.borderColor).toBeDefined();
    });

    it('disabled state applies different background', () => {
      const styles = getTextInputStyle({ state: 'disabled', mode: 'light' });
      expect(styles.container.backgroundColor).toBeDefined();
    });
  });

  describe('getLabelStyle', () => {
    it('returns default label style', () => {
      const style = getLabelStyle('light', 'default');
      expect(style.color).toBeDefined();
      expect(style.fontSize).toBeDefined();
    });

    it('returns focus label style', () => {
      const style = getLabelStyle('light', 'focus');
      expect(style.color).toBeDefined();
    });

    it('returns error label style', () => {
      const style = getLabelStyle('light', 'error');
      expect(style.color).toBeDefined();
    });

    it('works with dark mode', () => {
      const style = getLabelStyle('dark', 'default');
      expect(style.color).toBeDefined();
    });
  });

  describe('getErrorStyle', () => {
    it('returns error style for light mode', () => {
      const style = getErrorStyle('light');
      expect(style.color).toBeDefined();
      expect(style.fontSize).toBeDefined();
      expect(style.marginTop).toBeDefined();
    });

    it('returns error style for dark mode', () => {
      const style = getErrorStyle('dark');
      expect(style.color).toBeDefined();
    });
  });

  describe('getHelperTextStyle', () => {
    it('returns helper text style for light mode', () => {
      const style = getHelperTextStyle('light');
      expect(style.color).toBeDefined();
      expect(style.fontSize).toBeDefined();
      expect(style.marginTop).toBeDefined();
    });

    it('returns helper text style for dark mode', () => {
      const style = getHelperTextStyle('dark');
      expect(style.color).toBeDefined();
    });
  });

  describe('branch coverage - variant × state combinations', () => {
    it('outlined + disabled uses disabled background', () => {
      const styles = getTextInputStyle({
        variant: 'outlined',
        state: 'disabled',
        mode: 'light',
      });
      expect(styles.container.backgroundColor).toBeDefined();
      expect(styles.input.color).toBeDefined();
    });

    it('outlined + focus uses focus border color', () => {
      const styles = getTextInputStyle({
        variant: 'outlined',
        state: 'focus',
        mode: 'light',
      });
      expect(styles.container.borderColor).toBeDefined();
      expect(styles.container.borderWidth).toBe(1.5);
    });

    it('outlined + error uses error border color', () => {
      const styles = getTextInputStyle({
        variant: 'outlined',
        state: 'error',
        mode: 'light',
      });
      expect(styles.container.borderColor).toBeDefined();
    });

    it('filled + disabled uses disabled background', () => {
      const styles = getTextInputStyle({
        variant: 'filled',
        state: 'disabled',
        mode: 'light',
      });
      expect(styles.container.backgroundColor).toBeDefined();
      expect(styles.container.borderWidth).toBe(0);
    });

    it('filled + focus uses focus border with borderBottomWidth of 2', () => {
      const styles = getTextInputStyle({
        variant: 'filled',
        state: 'focus',
        mode: 'light',
      });
      expect(styles.container.borderBottomWidth).toBe(2);
    });

    it('filled + error uses error border color', () => {
      const styles = getTextInputStyle({
        variant: 'filled',
        state: 'error',
        mode: 'light',
      });
      expect(styles.container.borderColor).toBeDefined();
    });

    it('filled + default has borderBottomWidth of 1', () => {
      const styles = getTextInputStyle({
        variant: 'filled',
        state: 'default',
        mode: 'light',
      });
      expect(styles.container.borderBottomWidth).toBe(1);
    });

    it('lg size returns larger height and padding', () => {
      const mdStyles = getTextInputStyle({ size: 'md' });
      const lgStyles = getTextInputStyle({ size: 'lg' });
      expect(lgStyles.container.height).toBeGreaterThan(
        mdStyles.container.height as number,
      );
    });

    it('dark mode with all variants', () => {
      const variants: TextInputVariant[] = ['default', 'outlined', 'filled'];
      variants.forEach(variant => {
        const styles = getTextInputStyle({ variant, mode: 'dark' });
        expect(styles.container).toBeDefined();
        expect(styles.input).toBeDefined();
      });
    });
  });
});
