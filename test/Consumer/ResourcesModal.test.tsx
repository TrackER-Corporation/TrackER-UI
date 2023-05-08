import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import ResourcesModal from "../../src/Consumer/Building/Resources/ResourcesModal"
import { store } from '../../src/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Building } from '../../src/types';

describe('ResourcesModal component', () => {

    const building: Building = {
        _id: "string",
        name: "string",
        contact: "string",
        address: "string",
        type: "string",
        lat: "string",
        long: "",
        organizationId: "12"
    }

    it('renders the ResourcesModal component', () => {
        const setVisible = vi.fn()
        const { baseElement, getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ResourcesModal
                        building={building}
                        data={{}}
                        setVisible={setVisible}
                        visible />
                </BrowserRouter>
            </Provider>
        );
        expect(baseElement).toBeValid();
        fireEvent.click(getByText("Cancel"))
        fireEvent.click(getByText("OK"))
    });
})