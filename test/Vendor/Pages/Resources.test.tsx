import Resources from "../../../src/Vendor/Pages/Resources"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";
import { fetchOrganization } from "../../../src/reducers/organization";

describe('Resources', () => {

    store.dispatch(fetchOrganization({
        _id: "string",
        name: "string",
        description: "string",
        userId: "string",
        type: [],
        icon: "string",
        customers: [],
        details: {resources: [{name: "Wind"}, {name: "Solar"}, {name: "Geo"}, {name: "Hydro"}]},
        createAt: "now"
    }))

    it('renders the correctly', () => {
        const { baseElement, getByText, getAllByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <Resources  />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText("Check your energy resources sales")).toBeInTheDocument()
        getAllByRole("button").forEach(el => fireEvent.click(el))
        
    });

});
