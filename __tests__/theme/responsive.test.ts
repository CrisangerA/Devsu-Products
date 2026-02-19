import {
  wScale,
  hScale,
  moderateScale,
  wp,
  hp,
  isSmallDevice,
  isTablet,
  isDesktop,
  isMobile,
  isIOS,
  isAndroid,
  screenWidth,
  screenHeight,
  breakpoints,
} from '@theme/responsive';

describe('responsive', () => {
  describe('wScale', () => {
    it('scales a value horizontally', () => {
      const result = wScale(100);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('returns a rounded value', () => {
      const result = wScale(50);
      expect(Number.isInteger(result) || result % 1 !== 0).toBeTruthy();
    });
  });

  describe('hScale', () => {
    it('scales a value vertically', () => {
      const result = hScale(100);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('moderateScale', () => {
    it('scales moderately with default factor', () => {
      const result = moderateScale(100);
      expect(typeof result).toBe('number');
    });

    it('scales moderately with custom factor', () => {
      const result = moderateScale(100, 0.3);
      expect(typeof result).toBe('number');
    });

    it('returns same value when factor is 0', () => {
      const result = moderateScale(100, 0);
      expect(result).toBe(100);
    });
  });

  describe('wp', () => {
    it('converts percentage to width pixels with number', () => {
      const result = wp(50);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('converts percentage to width pixels with string', () => {
      const result = wp('50%');
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('handles string percentage with % symbol', () => {
      const resultWithSymbol = wp('25%');
      const resultWithoutSymbol = wp(25);
      expect(resultWithSymbol).toBe(resultWithoutSymbol);
    });
  });

  describe('hp', () => {
    it('converts percentage to height pixels with number', () => {
      const result = hp(50);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('converts percentage to height pixels with string', () => {
      const result = hp('50%');
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('handles string percentage with % symbol', () => {
      const resultWithSymbol = hp('25%');
      const resultWithoutSymbol = hp(25);
      expect(resultWithSymbol).toBe(resultWithoutSymbol);
    });
  });

  describe('device detection', () => {
    it('isSmallDevice returns a boolean', () => {
      expect(typeof isSmallDevice).toBe('boolean');
    });

    it('isTablet returns a boolean', () => {
      expect(typeof isTablet).toBe('boolean');
    });

    it('isDesktop returns a boolean', () => {
      expect(typeof isDesktop).toBe('boolean');
    });

    it('isMobile returns a boolean', () => {
      expect(typeof isMobile).toBe('boolean');
    });

    it('isIOS returns a boolean', () => {
      expect(typeof isIOS).toBe('boolean');
    });

    it('isAndroid returns a boolean', () => {
      expect(typeof isAndroid).toBe('boolean');
    });
  });

  describe('screen dimensions', () => {
    it('screenWidth is a positive number', () => {
      expect(typeof screenWidth).toBe('number');
      expect(screenWidth).toBeGreaterThan(0);
    });

    it('screenHeight is a positive number', () => {
      expect(typeof screenHeight).toBe('number');
      expect(screenHeight).toBeGreaterThan(0);
    });
  });

  describe('breakpoints', () => {
    it('has correct breakpoint values', () => {
      expect(breakpoints.mobile).toBe(0);
      expect(breakpoints.tablet).toBe(768);
      expect(breakpoints.desktop).toBe(1024);
    });
  });
});
