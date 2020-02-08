import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Map from './../map';
afterEach(cleanup);

test('Map Renders', () => {
  const { getByTestId } = render(<Map />);
});
