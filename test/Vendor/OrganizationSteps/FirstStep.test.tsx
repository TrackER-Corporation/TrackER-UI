
import FirstStep from "../../../src/Vendor/OrganizationSteps/FirstStep"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('FirstStep', () => {

    it('renders the correctly', () => {

        const allSet = vi.fn()

        const { baseElement, getAllByText, getAllByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <FirstStep gas={true}
                            setGas={allSet}
                            electric={true}
                            setElectric={allSet}
                            water={true}
                            setWater={allSet}
                            distributed={true}
                            setDistributed={allSet}
                            prices={[{ name: "Solar" }]}
                            setPrices={allSet}
                        />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getAllByText("Selected")[0]).toBeInTheDocument()
        getAllByRole("button").forEach(el => fireEvent.click(el))
    });

    it('renders the correctly', () => {

        const allSet = vi.fn()

        const { baseElement, getAllByText, getAllByRole, getAllByTestId } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <FirstStep gas={true}
                            setGas={allSet}
                            electric={true}
                            setElectric={allSet}
                            water={true}
                            setWater={allSet}
                            distributed={true}
                            setDistributed={allSet}
                            prices={[{ name: "Wind" }]}
                            setPrices={allSet}
                        />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getAllByText("Selected")[0]).toBeInTheDocument()
        getAllByTestId("card").forEach(el => fireEvent.click(el))
        getAllByRole("button").forEach(el => fireEvent.click(el))
    });

});