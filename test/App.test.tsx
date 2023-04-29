
import '@testing-library/jest-dom';
import { expect, describe } from 'vitest'
import { render } from '@testing-library/react';
import App from "../src/App"
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import React from 'react';

describe('AppRoute', () => {
    it('renders the correct text', () => {
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