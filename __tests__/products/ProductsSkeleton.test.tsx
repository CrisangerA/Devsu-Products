import React from 'react';
import { render } from '@test-utils';
import ProductsSkeleton from '@modules/products/ui/components/ProductsList/ProductsSkeleton';

describe('ProductsSkeleton', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<ProductsSkeleton />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders skeleton items', () => {
    const { toJSON } = render(<ProductsSkeleton />);
    const json = toJSON();
    expect(json).toBeTruthy();
  });
});
