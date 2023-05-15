import CustomerDrawer from "../../src/Vendor/CustomerDrawer"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../src/store";

describe('CustomerDrawer', () => {

    const set = vi.fn()

    it('renders the correctly', () => {
        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <CustomerDrawer visible={true} buildingId={"building"} setVisible={set} showWater={true} showElectric={true} showGas={true} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText("undefined Consume Overview")).toBeInTheDocument()
    });

});