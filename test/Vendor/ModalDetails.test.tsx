import ModalDetails from "../../src/Vendor/ModalDetails"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../src/store";

describe('ModalDetails', () => {

    const building = {
        _id: "string",
        name: "string",
        contact: "string",
        userId: "string",
        organizationId: "string",
        address: "string",
        type: "string",
        sqft: 6,
        lat: "string",
        long: "string",
        resources: [],
        date: new Date()
    }

    it('renders correctly with same day', () => {     

        const billsDay = [{
            buildingId: "string",
            organizationId: "string",
            bills: [{
                electric: 5,
                gas: 5,
                water: 5,
                date: new Date('01/23/17')
            }]
        }]

        const setVisible = vi.fn()

        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <ModalDetails visible={true} setVisible={setVisible} building={building} bills={billsDay} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText(/Building Name/)).toBeInTheDocument()
    });

    it('renders correctly with different day', () => {     

        const bills = [{
            buildingId: "string",
            organizationId: "string",
            bills: [{
                electric: 5,
                gas: 5,
                water: 5,
                date: new Date('01/01/17')
            }]
        }]

        const setVisible = vi.fn()

        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <ModalDetails visible={true} setVisible={setVisible} building={building} bills={bills} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText(/Building Name/)).toBeInTheDocument()
    });

    it('renders incorrectly', () => {     

        const bills = [{
            buildingId: "string2",
            organizationId: "string",
            bills: [{
                electric: 5,
                gas: 5,
                water: 5,
                date: new Date('01/01/17')
            }]
        }]

        const setVisible = vi.fn()

        const { baseElement, getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <ModalDetails visible={true} setVisible={setVisible} building={building} bills={bills} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText(/Building Name/)).toBeInTheDocument()
    });

    it('renders incorrectly', () => {     

        const bills = []

        const setVisible = vi.fn()

        const { baseElement, getByText, getAllByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <ModalDetails visible={true} setVisible={setVisible} building={building} bills={bills} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getByText(/Building Name/)).toBeInTheDocument()
        getAllByRole("button").forEach(el => fireEvent.click(el))
    });

});