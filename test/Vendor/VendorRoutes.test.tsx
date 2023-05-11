import VendorRoutes from "../../src/Vendor/VendorRoutes"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../src/store";
import { fetchOrganization } from "../../src/reducers/organization";

describe('VendorRoutes', () => {
    it('renders the correctly', () => {

        store.dispatch(fetchOrganization({
            _id: "string",
            name: "string",
            description: "string",
            userId: "string",
            type: [],
            icon: "string",
            customers: [],
            details: {},
            createAt: "2023-05-10T16:24:51.677Z"
        }))

        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <VendorRoutes  />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
    });

});