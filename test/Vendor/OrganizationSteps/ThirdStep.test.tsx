

import ThirdStep from "../../../src/Vendor/OrganizationSteps/ThirdStep"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('ThirdStep', () => {

    it('renders the correctly', () => {
        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <ThirdStep name={"name"} owner={"owner"} icon={"icon"} createdAt={{}} type={"vendor"} description={"description"} prices={[]} setData={() => { }} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText("name")).toBeInTheDocument()
        expect(getByText("owner")).toBeInTheDocument()
    });

});
