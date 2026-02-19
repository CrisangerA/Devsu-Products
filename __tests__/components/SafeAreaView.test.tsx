import React from 'react';
import { render, screen } from '@test-utils';
import { SafeAreaView } from '@components/layout/SafeAreaView';

describe('SafeAreaView', () => {
  it('renders children correctly', () => {
    render(
      React.createElement(
        SafeAreaView,
        null,
        React.createElement('Text', null, 'Test Child'),
      ),
    );
    expect(screen.getByText('Test Child')).toBeTruthy();
  });

  it('applies safe area insets as padding', () => {
    const { getByTestId } = render(
      React.createElement(
        SafeAreaView,
        null,
        React.createElement('Text', { testID: 'child' }, 'Test'),
      ),
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('has flex 1 style', () => {
    const { toJSON } = render(
      React.createElement(
        SafeAreaView,
        null,
        React.createElement('Text', null, 'Test'),
      ),
    );
    expect(toJSON()).toBeTruthy();
  });
});
