/**
 * @format
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../App';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('Renders App correctly', () => {
  const useColorSchemeMock = jest.requireMock(
    'react-native/Libraries/Utilities/useColorScheme',
  ).default;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with dark mode', () => {
    useColorSchemeMock.mockReturnValue('dark');

    render(<App />);
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders correctly with light mode', () => {
    useColorSchemeMock.mockReturnValue('light');

    render(<App />);
    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders correctly when color scheme is null', () => {
    useColorSchemeMock.mockReturnValue(null);

    render(<App />);
    expect(screen.toJSON()).toBeTruthy();
  });
});
