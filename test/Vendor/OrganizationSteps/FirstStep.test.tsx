
import FirstStep from "../../../src/Vendor/OrganizationSteps/FirstStep"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('FirstStep', () => {

    it('renders the correctly', () => {
        const { baseElement, getAllByText } = render(
            <BrowserRouter>
            <ConfigProvider>
                <Provider store={store}>
                <FirstStep gas={0} setGas={{}} electric={0} setElectric={{}} water={0} setWater={{}} distributed={0} setDistributed={{}} setPrices={() => {}} />
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
            
        );
        expect(baseElement).toBeValid()
        expect(getAllByText("Selected")[0]).toBeInTheDocument()
    });

});