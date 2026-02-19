import React from 'react';
import { Text } from 'react-native';
import { render, screen, fireEvent } from '@test-utils';
import ThemeProvider, { ThemeContext } from '@theme/providers/ThemeProvider';
import { useTheme } from '@theme/providers/useTheme';

const TestComponent = () => {
  const { mode, toggleTheme } = useTheme();
  return (
    <>
      <Text testID="mode">{mode}</Text>
      <Text testID="theme" onPress={() => toggleTheme('dark')}>
        Toggle
      </Text>
    </>
  );
};

describe('ThemeProvider', () => {
  it('provides theme to children', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('mode')).toBeTruthy();
  });

  it('allows toggling theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    fireEvent.press(screen.getByText('Toggle'));
  });

  it('exposes ThemeContext', () => {
    expect(ThemeContext).toBeDefined();
    expect(ThemeContext.displayName).toBe('ThemeContext');
  });
});
