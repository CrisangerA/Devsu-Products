import { getShadows } from '@theme/shadows';

describe('shadows', () => {
  describe('getShadows', () => {
    it('returns light shadows by default', () => {
      const shadows = getShadows();
      expect(shadows.sm).toBeDefined();
      expect(shadows.md).toBeDefined();
      expect(shadows.lg).toBeDefined();
      expect(shadows.xl).toBeDefined();
    });

    it('returns light shadows when isDark is false', () => {
      const shadows = getShadows(false);
      expect(shadows.none.shadowOpacity).toBe(0);
      expect(shadows.sm.shadowOpacity).toBe(0.05);
    });

    it('returns dark shadows when isDark is true', () => {
      const shadows = getShadows(true);
      expect(shadows.none.shadowOpacity).toBe(0);
      expect(shadows.sm.shadowOpacity).toBe(0.2);
    });

    it('has all shadow levels', () => {
      const shadows = getShadows();
      expect(shadows.none).toBeDefined();
      expect(shadows.sm).toBeDefined();
      expect(shadows.md).toBeDefined();
      expect(shadows.lg).toBeDefined();
      expect(shadows.xl).toBeDefined();
    });

    it('shadow definitions have required properties', () => {
      const shadows = getShadows();

      Object.values(shadows).forEach(shadow => {
        expect(shadow).toHaveProperty('shadowColor');
        expect(shadow).toHaveProperty('shadowOffset');
        expect(shadow).toHaveProperty('shadowOpacity');
        expect(shadow).toHaveProperty('shadowRadius');
        expect(shadow).toHaveProperty('elevation');
      });
    });

    it('dark shadows have higher opacity than light shadows', () => {
      const lightShadows = getShadows(false);
      const darkShadows = getShadows(true);

      expect(darkShadows.sm.shadowOpacity).toBeGreaterThan(
        lightShadows.sm.shadowOpacity,
      );
      expect(darkShadows.md.shadowOpacity).toBeGreaterThan(
        lightShadows.md.shadowOpacity,
      );
      expect(darkShadows.lg.shadowOpacity).toBeGreaterThan(
        lightShadows.lg.shadowOpacity,
      );
    });

    it('none shadow has zero properties', () => {
      const shadows = getShadows();
      expect(shadows.none.shadowOpacity).toBe(0);
      expect(shadows.none.elevation).toBe(0);
    });
  });
});
