import ResourcesCard from "../../../src/Vendor/Pages/ResourcesCard"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('ResourcesCard', () => {
    const onClick = vi.fn()

    it('renders the correctly', () => {
        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <ResourcesCard element={{name:"Solar"}} onClick={onClick}  />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText("Solar")).toBeInTheDocument()
    });

});
