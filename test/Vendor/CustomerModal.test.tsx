import CustomerModal from "../../src/Vendor/CustomerModal"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../src/store";
import { setAllBuildings } from "../../src/reducers/allOrganization";

describe('CustomerModal', () => {

    it('renders correctly', () => {

        const user = {
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            type: 'basic',
            password: 'oldpassword',
            token: 'oldpassword',
            _id: '123',
        };
        store.dispatch(setAllBuildings([{
            _id: "string",
            name: "string",
            contact: "string",
            address: "string",
            type: "string",
            lat: "44",
            long: "55",
            organizationId: "12"
        }]))

        const setVisible = vi.fn()

        const { baseElement, getByText, getAllByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <CustomerModal visible={true} user={user} setVisible={setVisible} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText(/Buildings Overview/)).toBeInTheDocument()
        getAllByRole("button").forEach(el => fireEvent.click(el))
    });

});