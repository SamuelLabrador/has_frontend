import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('App Renders', () => {
  const { getByText } = render(<App />);
});
