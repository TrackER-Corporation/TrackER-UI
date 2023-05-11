import UsersCard from "../../../src/Vendor/DashboardCards/UsersCard"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";
import { fetchOrganization } from "../../../src/reducers/organization";
import { setAllUser } from "../../../src/reducers/allUsers";

describe('UsersCard', () => {
    
    store.dispatch(fetchOrganization({
        _id: "string",
        name: "string",
        description: "string",
        userId: "string",
        type: [],
        icon: "string",
        customers: [{user: "string"}],
        details: {},
        createAt: "2023-05-10T16:24:51.677Z"
    }))

    store.dispatch(setAllUser([{
        logged: true,
        user: {
            _id: "string",
            name: "string",
            surname: "string",
            email: "string",
            password: "string",
            token: "string",
            type: "string"
        }
    }]))
    

    it('renders the correct text', () => {
        const openModal = vi.fn()
        const { baseElement } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <UsersCard openModal={openModal}/>
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(baseElement).toBeValid()
    });

});