import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import InvoicesModal from "../../src/Consumer/Invoices/InvoicesModal"
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { BrowserRouter } from 'react-router-dom';

describe('InvoicesModal', () => {
    const setVisible = vi.fn()
    const building = {
        _id: '12345',
        name: 'Example Name',
        contact: '555-1234',
        userId: '67890',
        organizationId: 'abcde',
        address: '123 Main St',
        type: 'Example Type',
        sqft: 1000,
        lat: '37.7749° N',
        long: '122.4194° W',
        resources: [
            { name: 'Resource 1', quantity: 10 },
            { name: 'Resource 2', quantity: 5 },
        ],
    };

    const newStore = {
        ...store,
        allOrganization: {
            organization: {
                '1': {
                    _id: '1',
                    name: 'Organization 1',
                    details: {
                        gas: 100,
                        water: 200,
                        electric: 300,
                    },
                },
                '2': {
                    _id: '2',
                    name: 'Organization 2',
                    details: {
                        gas: 400,
                        water: 500,
                        electric: 600,
                    },
                },
            }
        }
    }
    it('renders the component with props Weekly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <InvoicesModal
                        building={building}
                        data={{}}
                        visible
                        setVisible={setVisible}
                        timeSpan='Weekly'
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(getByText("Electric")).toBeInTheDocument();
    });

    it('renders the component with props Monthly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <InvoicesModal
                        building={building}
                        data={{}}
                        visible
                        setVisible={setVisible}
                        timeSpan='Monthly'
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(getByText("Electric")).toBeInTheDocument();
    });

    it('renders the component with props Yearly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <InvoicesModal
                        building={building}
                        data={{}}
                        visible
                        setVisible={setVisible}
                        timeSpan='Yearly'
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(getByText("Electric")).toBeInTheDocument();
    });

    it('trigger close', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <InvoicesModal
                        building={building}
                        data={{}}
                        visible
                        setVisible={setVisible}
                        timeSpan='Yearly'
                    />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(getByText("Cancel"));
    });


    it('trigger close', () => {
        const { getByText } = render(
            <Provider store={newStore}>
                <BrowserRouter>
                    <InvoicesModal
                        building={building}
                        data={{}}
                        visible
                        setVisible={setVisible}
                        timeSpan='Yearly'
                    />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(getByText("OK"));
    });
});
