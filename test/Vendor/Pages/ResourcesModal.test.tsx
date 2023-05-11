import ResourcesModal from "../../../src/Vendor/Pages/ResourcesModal"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('ResourcesModal', () => {

    const ResizeObserverMock = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn()
    }))

    vi.stubGlobal('ResizeObserver', ResizeObserverMock)

    it('renders the correctly', () => {

        const setVisible = vi.fn()

        const data = {
            price: 5,
            name: "string",
            type: "string",
            organization: 5,
            earning: 5,
            organizationId: "string",
            resourcesType: {},
            buildings: []
        }

        const { baseElement, getAllByText, getAllByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <ResourcesModal visible={true} setVisible={setVisible} data={data} options={["Option1", "Options2"]} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getAllByText(/string/)[0]).toBeInTheDocument()
        getAllByRole("button").forEach(el => fireEvent.click(el))
    });

});
