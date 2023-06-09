import CarouselKpi from "../../../src/Vendor/DashboardCards/CarouselKpi"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe('CarouselKpi', () => {

    it('renders loading KPI', () => {
        const { getAllByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <CarouselKpi
                            loading={true}
                            gasSum={0}
                            kWhSum={0}
                            waterSum={0}
                            gasCost={0}
                            kWhCost={0}
                            waterCost={0}
                            sold={0}
                            renewable={0} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(getAllByText("Energy Resources Production")[0]).toBeInTheDocument()
    });
    
    it('renders KPI', () => {
        const { getAllByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <CarouselKpi
                            loading={false}
                            gasSum={-1}
                            kWhSum={-1}
                            waterSum={-1}
                            gasCost={-1}
                            kWhCost={-1}
                            waterCost={-1}
                            sold={-1}
                            renewable={-1} />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>

        );
        expect(getAllByText("Energy Resources Production")[0]).toBeInTheDocument()
    });

});