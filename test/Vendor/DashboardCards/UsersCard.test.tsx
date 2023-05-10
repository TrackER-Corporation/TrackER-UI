import UsersCard from "../../../src/Vendor/DashboardCards/UsersCard"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('UsersCard', () => {

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