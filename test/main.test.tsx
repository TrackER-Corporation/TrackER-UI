import '@testing-library/jest-dom';
import React from 'react';
import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/react';

import App from "../src/App"
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from '../src/store';

describe('AppRoute', () => {
  it('renders route correctly', () => {
    const { getByText } = render(
      <ConfigProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    );
    expect(getByText("Unlocking the Value of Energy Resources")).toBeInTheDocument()
  });
});
