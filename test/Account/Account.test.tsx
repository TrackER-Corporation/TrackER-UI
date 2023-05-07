import '@testing-library/jest-dom';
import { expect, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Account from "../../src/Account/Account"
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { BrowserRouter } from 'react-router-dom';
import { UserProps } from '../../src/types';

describe('Account', () => {
    const user: UserProps = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        type: 'Building',
        _id: "1",
        password: "1",
        token: ""

    };
    const user2: UserProps = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        type: 'Vendor',
        _id: "1",
        password: "1",
        token: ""
    };
    const avatar = '';
    const socket = {};
    const updateRoute = vi.fn()

    it('renders the profile Buildings', () => {
        const { getByText, getByTestId } = render(

            <ConfigProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <Account updateRoute={updateRoute} user={user} avatar={avatar} />
                    </Provider>
                </BrowserRouter>
            </ConfigProvider>
        );
        const titleElement = getByText("Home");
        expect(titleElement).toBeInTheDocument();
        const nameElement = getByText(/John Doe/i);
        const emailElement = getByText(/john.doe@example.com/i);
        expect(nameElement).toBeInTheDocument();
        expect(emailElement).toBeInTheDocument();

        const menu = getByText("Personal Information");
        expect(menu).toBeInTheDocument();
        fireEvent.click(menu)
        expect(menu).toBeInTheDocument();
        fireEvent.click(getByTestId("icon1"))
        fireEvent.click(getByTestId("menu"))
        fireEvent.click(getByText("Security Settings"))
        fireEvent.click(getByText("Change Password"))

    });

    it('renders the Vendor profile View', () => {
        const { getByText, getByTestId } = render(

            <ConfigProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <Account updateRoute={updateRoute} user={user2} avatar={avatar} />
                    </Provider>
                </BrowserRouter>
            </ConfigProvider>
        );
        const titleElement = getByText("Home");
        expect(titleElement).toBeInTheDocument();
        const nameElement = getByText(/John Doe/i);
        const emailElement = getByText(/john.doe@example.com/i);
        expect(nameElement).toBeInTheDocument();
        expect(emailElement).toBeInTheDocument();

        const menu = getByText("Personal Information");
        expect(menu).toBeInTheDocument();
        fireEvent.click(menu)
        expect(menu).toBeInTheDocument();
        fireEvent.click(getByTestId("icon1"))
        fireEvent.click(getByTestId("menu"))
        fireEvent.click(getByText("Security Settings"))
        fireEvent.click(getByText("Change Password"))
    });

});