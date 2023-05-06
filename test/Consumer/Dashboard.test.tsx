
import React from 'react';
import { describe, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Dashboard from "../../src/Consumer/Dashboard"
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../src/store';
import { Provider } from 'react-redux';

const state = {
    ...store,
    user: {
        user: { _id: '1', name: 'Emanuele', surname: 'Dall\'Ara', email: 'emanuele@dernetsoft.com', password: '1', token: '1', type: 'Building' }, logged: true
    },
    preference: {
        preference: { goal: { _id: '1', userId: '1', activityLog: true, avatar: '/static/media/Avatar-38.b48130b476d268025429.svg', __v: 0, notification: false, news: true } }
    },
    buildings: {
        buildings: [{
            _id: "string",
            name: "string",
            contact: "string",
            address: "string",
            type: "string",
            lat: "string",
            long: ""
        }]
    },
    organization: { organization: {} },
    allOrganization: {
        organization: [{ _id: '1', name: 'Dallas Corporation', description: 'a', userId: 'a', type: ['Gas', 'Electric'], customers: [{ building: 'a', user: 'a' }], createAt: '2022-07-21T14:59:40.205Z', icon: 'https://res.cloudinary.com/dgfnyulqh/image/upload/v1658845429/nbnkxykkyymhethjdiek.jpg', details: { electric: [{ name: 'Electricity Cost at kWh', price: 231 }, { name: 'Electricity Supplier Cost', price: 100 }, { name: 'Electricity Tax Percentage', price: 2 }, { name: 'Electricity Delivery Cost', price: 20 }], gas: [{ name: 'Gas Cost at m³', price: 30 }, { name: 'Gas Delivery Cost', price: 100 }, { name: 'Gas Tax Percentage', price: 5 }, { name: 'Supplier Gas Cost', price: 100 }], water: [], resources: [] } },]
    },
    allUser: {
        user: [{ _id: '1', name: 'Emanuele', surname: 'Dall\'Ara', email: 'emanuele@dernetsoft.com', password: '1', token: '1', type: 'Building' }]
    }
}

describe('Dashboard', () => {
    test('renders greeting', () => {
        const { getByText } = render(
            <Provider store={state}>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
            </Provider>
        );

        expect(getByText(/Welcome back/)).toBeInTheDocument();
    });
});