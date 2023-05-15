import OrganizationCard from "../../../src/Vendor/Organization/OrganizationCard"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('OrganizationCard', () => {

    it('renders the correctly', () => {
        const { baseElement, getByText } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <OrganizationCard description={"description"} title={"title"} selected={true} />
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(baseElement).toBeValid()
        expect(getByText("title")).toBeInTheDocument()
        expect(getByText("description")).toBeInTheDocument()
    });

});