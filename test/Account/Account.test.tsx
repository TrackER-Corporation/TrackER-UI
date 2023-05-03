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
    const avatar = '';
    const socket = {};
    const updateRoute = vi.fn()

    it('renders the profile page title', () => {
        const { getByText, getByTestId } = render(

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

    });

});