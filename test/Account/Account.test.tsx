import '@testing-library/jest-dom';
import { expect, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Account from "../../src/Account/Account"
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { BrowserRouter } from 'react-router-dom';

describe('Account', () => {
    const user = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        type: 'Building'
    };
    const avatar = 'https://example.com/avatar.jpg';
    const socket = {};
    const updateRoute = vi.fn()

    it('renders the profile page title', () => {
        const { getByText } = render(
            <ConfigProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <Account updateRoute={updateRoute} user={user} avatar={avatar} socket={socket} />
                    </Provider>
                </BrowserRouter>
            </ConfigProvider>
        );
        const titleElement = getByText("Home");
        expect(titleElement).toBeInTheDocument();
    });

    it('renders the user name and email', () => {
        const { getByText } = render(
            <ConfigProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <Account updateRoute={updateRoute} user={user} avatar={avatar} socket={socket} />
                    </Provider>
                </BrowserRouter>
            </ConfigProvider>);
        const nameElement = getByText(/John Doe/i);
        const emailElement = getByText(/john.doe@example.com/i);
        expect(nameElement).toBeInTheDocument();
        expect(emailElement).toBeInTheDocument();
    });

    it('On click Personal Information event', () => {
        const { getByText } = render(
            <ConfigProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <Account updateRoute={updateRoute} user={user} avatar={avatar} socket={socket} />
                    </Provider>
                </BrowserRouter>
            </ConfigProvider>);
        const menu = getByText("Personal Information");
        expect(menu).toBeInTheDocument();
        fireEvent.click(menu)
        expect(menu).toBeInTheDocument();
    });

});