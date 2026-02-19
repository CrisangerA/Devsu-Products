import { useThemeStorage } from '@theme/providers/theme.storage';

describe('theme.storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useThemeStorage', () => {
    it('returns initial theme state', () => {
      const state = useThemeStorage.getState();
      expect(state.theme).toBeDefined();
      expect(state.setTheme).toBeDefined();
    });

    it('setTheme updates theme', () => {
      const { setTheme } = useThemeStorage.getState();
      setTheme('dark');

      const state = useThemeStorage.getState();
      expect(state.theme.mode).toBe('dark');
    });

    it('can switch between light and dark themes', () => {
      const { setTheme } = useThemeStorage.getState();

      setTheme('light');
      expect(useThemeStorage.getState().theme.mode).toBe('light');

      setTheme('dark');
      expect(useThemeStorage.getState().theme.mode).toBe('dark');
    });
  });
});
