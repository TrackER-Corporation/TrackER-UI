import Customers from "../../../src/Vendor/Customers/Customers"
import React from 'react';
import { expect, describe, it } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('Customers', () => {

    const organization = {
        customers:[{building:"6300a343707609fd28d22e6e", user:"630093ea707609fd28d22dd7"}]
    }

    it('renders the correct text', () => {
        const { getByText } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <Customers organization={organization}/>
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(getByText("Customers")).toBeInTheDocument()
    });

});