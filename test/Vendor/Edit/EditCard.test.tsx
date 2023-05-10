import EditCard from "../../../src/Vendor/Edit/EditCard"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";
import { fetchOrganization } from "../../../src/reducers/organization";

describe('EditCard', () => {
    store.dispatch(fetchOrganization({
        _id: "string",
        name: "string",
        description: "string",
        userId: "string",
        type: [],
        icon: "string",
        customers: [],
        details: {gas: [{price:2, name:"gas"}], water: [{price:2, name:"water"}], electric: [{price:2, name:"electric"}], renewable:[{price:2, name:"renewable"}]},
        createAt: new Date()
    }))

    it('renders the correct text with gas', () => {
        const { baseElement, getByText, getByRole } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <EditCard data={[{"gas":0.4, name:"name"}]} type="gas"/>
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(baseElement).toBeValid()
        fireEvent.click(getByText("Edit Plan"))
        fireEvent.change(getByRole("spinbutton"), {target:{value:"1"}})
        fireEvent.click(getByText("Confirm Plan"))
        
    });

    it('renders the correct text with electric', () => {
        const { baseElement } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <EditCard data={[{"electric":0.4, name:"name"}]} type="electric"/>
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(baseElement).toBeValid()
    });

    it('renders the correct text with water', () => {
        const { baseElement } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <EditCard data={[{"water":0.4, name:"name"}]} type="water"/>
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(baseElement).toBeValid()
    });

    it('renders the correct text with renewable', () => {
        const { baseElement } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <EditCard data={[{"renewable":0.4, name:"name"}]} type="renewable"/>
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(baseElement).toBeValid()
    });

});