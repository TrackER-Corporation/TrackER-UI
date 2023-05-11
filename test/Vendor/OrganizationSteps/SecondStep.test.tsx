

import SecondStep from "../../../src/Vendor/OrganizationSteps/SecondStep"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('SecondStep', () => {

    it('renders the correctly', () => {
        const set = vi.fn()
        const { baseElement, getByText, getAllByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <SecondStep name={"name"} setDescription={set} setIcon={set} description={"description"} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText("name")).toBeInTheDocument()
        expect(getByText("description")).toBeInTheDocument()
        getAllByRole("button").forEach(el => fireEvent.click(el))
    });

});