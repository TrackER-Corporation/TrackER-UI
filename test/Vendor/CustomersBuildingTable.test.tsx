import CustomersBuildingTable from "../../src/Vendor/CustomersBuildingTable"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../src/store";

describe('CustomersBuildingTable', () => {

    it('renders the correctly', () => {
        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <CustomersBuildingTable data={() => {}} columns={["1", "3"]} headerTitle={null} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText("Something went wrong.")).toBeInTheDocument()
    });

});