import Wrapper from "../../../src/Vendor/Pages/Wrapper"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('ResourcesModal', () => {

    it('renders the correctly', () => {

        const setVisible = vi.fn()
        const setMetric = vi.fn()
        const setBuildingId = vi.fn()
        const navigate = vi.fn()
        const resultBills = {
            totalElectric: 5,
            totalGas: 5,
            totalWater: 5,
            result: [{
                buildingId: "string",
                organizationId: "string",
                bills: [],
                totalElectric: 6
            }],
            aggregated: {
                date: new Date(),
                electric: 5,
                gas: 5,
                water: 5
            }
        }
        const allBuildings = [{
            _id: "string",
            name: "string",
            contact: "string",
            userId: "string",
            organizationId: "string",
            address: "string",
            type: "string",
            sqft: 5,
            lat: "string",
            long: "string",
            resources: [],
            date: new Date()
        }]

        const { baseElement, getAllByText, getAllByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <Wrapper navigate={navigate} title="Electric Supplier Details"
                            drawer={{ showGas: false, showWater: false, visible: true, setVisible: setVisible, buildingId: "111111111" }}
                            pages={{
                                metricCubic: true, sum: "5", title: "Total Electric Usage", metricSwap: ["Kilowatt (kW)", "Watt"], setMetric: setMetric,
                                totalEarning: 5, delivery: 5, totalTaxCost: 2.3555, supplier: 5, usage: "Electric Usage", allLine: [{data:[{x:4, y:1}]}],
                                series: [{data: [{x:1, y:1}]}], all: [1,2,3,4], labels: ["1","2","3","4"], setVisible: setVisible, setBuildingId: setBuildingId, 
                                resultBills: resultBills, unit: ["kWh", "w"], allBuildings: allBuildings } } />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(baseElement).toBeValid()
        expect(getAllByText(/Home/)[0]).toBeInTheDocument()
        getAllByRole("button").forEach(el => fireEvent.click(el))
    });

});