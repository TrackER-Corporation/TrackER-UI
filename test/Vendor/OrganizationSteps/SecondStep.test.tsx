

import SecondStep from "../../../src/Vendor/OrganizationSteps/SecondStep"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('SecondStep', () => {

    it('renders the correctly', () => {
        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <SecondStep name={"name"} setDescription={() => { }} setIcon={{}} description={"description"} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText("name")).toBeInTheDocument()
        expect(getByText("description")).toBeInTheDocument()
    });

});