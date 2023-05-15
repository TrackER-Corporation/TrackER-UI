import CompleteOrganization from "../../src/Vendor/CompleteOrganization"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../src/store";
import { fetchOrganization } from "../../src/reducers/organization";
import { setAllUser } from "../../src/reducers/allUsers";

describe('CompleteOrganization', () => {

    store.dispatch(fetchOrganization({}))

    store.dispatch(setAllUser({
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
    }))

    it('renders the correctly', () => {
        const { baseElement, getByText, getAllByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <CompleteOrganization />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText("Set your organization type")).toBeInTheDocument()
        getAllByRole("button").forEach(el => fireEvent.click(el))
    });

});