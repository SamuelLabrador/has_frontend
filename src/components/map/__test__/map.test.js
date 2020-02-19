import React from 'react';
import { render, cleanup } from '@testing-library/react';
import GoogleMap from 'google-map-react';
afterEach(cleanup);

test('Map Renders', () => {
  const { getByTestId } = render(<GoogleMap />);
});
