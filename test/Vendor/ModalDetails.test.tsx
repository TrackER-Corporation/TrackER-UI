import ModalDetails from "../../src/Vendor/ModalDetails"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../src/store";

describe('ModalDetails', () => {

    // const ResizeObserverMock = vi.fn(() => ({
    //     observe: vi.fn(),
    //     unobserve: vi.fn(),
    //     disconnect: vi.fn()
    // }))

    // vi.stubGlobal('ResizeObserver', ResizeObserverMock)

    // vi.mock("react-apexcharts", async () => {
    //     const actual: any = await vi.importActual("react-apexcharts")
    //     return {
    //         ...actual
    //     }
    // })
    // vi.mock('apexcharts', () => ({ exec: vi.fn(() => { return new Promise((resolve, reject) => { resolve("uri") }) }) }));

    it('renders the correctly', () => {

        const building = {
            _id: "string",
            name: "string",
            contact: "string",
            address: "string",
            type: "string",
            lat: "string",
            long: "",
            organizationId: "12"
        }

        const bills = {
            buildingId: "string",
            organizationId: "string",
            bills: []
        }

        const setVisible = vi.fn()

        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <ModalDetails visible setVisible={setVisible} building={building} bills={[]}  />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText(/Building Name/)).toBeInTheDocument()
    });

});