import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/react';

import App from "../src/App"

describe('AppRoute', () => {
  it('renders route correctly', () => {
    const { getByText } = render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    expect(getByText("Vite + React")).toBeInTheDocument()
  });
});
