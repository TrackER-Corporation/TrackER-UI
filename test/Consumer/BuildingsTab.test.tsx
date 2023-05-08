import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { store } from '../../src/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import BuildingsTab from '../../src/Consumer/Building/BuildingsTab';
import { fetchBuildings } from '../../src/reducers/buildings';
import { setAllOrganization } from '../../src/reducers/allOrganization';

describe('BuildingsTab component', () => {

    const update = vi.fn()

    it('renders the BuildingsTab component', () => {
        const { baseElement, getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <BuildingsTab updateRoute={update} />
                </BrowserRouter>
            </Provider>
        );
        expect(baseElement).toBeValid();
        fireEvent.click(getByText("Add a new Building to your account!"))
    });

    it('fire events', () => {
        store.dispatch(fetchBuildings([{
            _id: "string",
            name: "string",
            contact: "string",
            address: "string",
            type: "string",
            lat: "string",
            long: "",
            organizationId: "12"
        }]))
        store.dispatch(setAllOrganization([{
            _id: "12",
            name: "string"
        }]))

        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <BuildingsTab updateRoute={update} />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(getByText("Edit"))
        fireEvent.click(getByText("Delete"))
        fireEvent.click(getByText("No"))
        fireEvent.click(getByText("Yes"))
    });
})