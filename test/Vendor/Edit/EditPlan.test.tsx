import EditPlan from "../../../src/Vendor/Edit/EditPlan"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { Button, ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";
import { fetchOrganization } from "../../../src/reducers/organization";

describe('EditPlan', () => {

    it('renders the correctly', () => {
        const { baseElement } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <EditPlan />
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(baseElement).toBeValid()
    });

    it('renders the correctly with Org', () => {

        store.dispatch(fetchOrganization({
            _id: "string",
            name: "string",
            description: "string",
            userId: "string",
            type: [],
            icon: "string",
            customers: [],
            details: {gas: [], water: [], electric: []},
            createAt: new Date()
        }))

        const { baseElement, getByRole } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <EditPlan />
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(baseElement).toBeValid()
        fireEvent.click(getByRole("button"))
    });

});