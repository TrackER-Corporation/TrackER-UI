import Login from "../../src/Login/Login"
import React from 'react';
import { expect, describe, it } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../src/store";

describe('Login', () => {

    it('renders the correct text', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>
        );
        expect(getByText("Create Account")).toBeInTheDocument()
    });

});