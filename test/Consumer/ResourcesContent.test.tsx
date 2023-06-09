import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import ResourcesContent from "../../src/Consumer/Building/Resources/ResourcesContent"
import { store } from '../../src/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Building } from '../../src/types';

describe('Renewable component', () => {

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

    it('renders the Renewable component', () => {
        const { baseElement } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ResourcesContent building={building} data={{}} type='' />
                </BrowserRouter>
            </Provider>
        );
        expect(baseElement).toBeValid();
    });
})