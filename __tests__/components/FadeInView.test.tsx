import React from 'react';
import { render, screen } from '@test-utils';
import { FadeInView } from '@components/animations/FadeInView';
import { Text } from 'react-native';

describe('FadeInView', () => {
  it('renders children correctly', () => {
    render(
      <FadeInView>
        <Text>Test Content</Text>
      </FadeInView>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { marginTop: 20, backgroundColor: 'red' };
    render(
      <FadeInView style={customStyle}>
        <Text>Styled Content</Text>
      </FadeInView>,
    );

    expect(screen.getByText('Styled Content')).toBeTruthy();
  });

  it('applies animation on mount', () => {
    const { toJSON } = render(
      <FadeInView>
        <Text>Animated Content</Text>
      </FadeInView>,
    );

    expect(toJSON()).toBeTruthy();
  });

  it('renders multiple children', () => {
    render(
      <FadeInView>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </FadeInView>,
    );

    expect(screen.getByText('Child 1')).toBeTruthy();
    expect(screen.getByText('Child 2')).toBeTruthy();
  });

  it('renders nested components', () => {
    render(
      <FadeInView>
        <Text>Nested</Text>
      </FadeInView>,
    );

    expect(screen.getByText('Nested')).toBeTruthy();
  });
});
