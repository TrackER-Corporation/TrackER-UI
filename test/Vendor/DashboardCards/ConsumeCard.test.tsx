import ConsumeCard from "../../../src/Vendor/DashboardCards/ConsumeCard"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('ConsumeCard', () => {

    it('renders the correct text', () => {
        const { getAllByText } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <ConsumeCard />
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(getAllByText("5")[0]).toBeInTheDocument()
    });

});