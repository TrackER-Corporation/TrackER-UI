import CompleteOrganization from "../../src/Vendor/CompleteOrganization"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../src/store";

describe('CompleteOrganization', () => {

    const ResizeObserverMock = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn()
    }))

    vi.stubGlobal('ResizeObserver', ResizeObserverMock)

    vi.mock("react-apexcharts", async () => {
        const actual:any = await vi.importActual("react-apexcharts")
        return {
            ...actual
        }
    })
    vi.mock('apexcharts', () => ({ exec: vi.fn(() => { return new Promise((resolve, reject) => { resolve("uri") }) }) }));

    it('renders the correctly', () => {
        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <CompleteOrganization />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText("Set your organization type")).toBeInTheDocument()
    });

});