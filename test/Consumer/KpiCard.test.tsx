import { fireEvent, render } from '@testing-library/react';
import KpiCard from "../../src/Consumer/Building/KpiCard"
import React from 'react';
import { describe, expect, it } from 'vitest';

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
const bills = {
    all: [
        {
            buildingId: "building-1",
            bills: [
                {
                    electric: 100,
                    gas: 50,
                    water: 25
                },
                {
                    electric: 120,
                    gas: 60,
                    water: 30
                }
            ]
        },
        {
            buildingId: "building-2",
            bills: [
                {
                    electric: 80,
                    gas: 40,
                    water: 20
                },
                {
                    electric: 90,
                    gas: 45,
                    water: 22.5
                }
            ]
        }
    ]
};

const bills2 = {
    all: [
        {
            buildingId: "12345",
            bills: [
                {
                    electric: 100,
                    gas: 50,
                    water: 25
                },
                {
                    electric: 120,
                    gas: 60,
                    water: 30
                }
            ]
        },
    ]
};

describe('KpiCard', () => {
    it('renders the component with empty bills', async () => {
        const { baseElement } = render(<KpiCard bills={{}} item={building} />);
        expect(baseElement).toBeDefined();
    });

    it('renders the component with bills ', async () => {
        const { baseElement } = render(
            <KpiCard
                bills={bills}
                item={building}
            />
        );
        expect(baseElement).toBeDefined();
    });

    it('renders fire events ', async () => {
        const { baseElement, getByTestId } = render(
            <KpiCard
                bills={bills2}
                item={building}
            />
        );
        expect(baseElement).toBeDefined();
        fireEvent.click(getByTestId("Electricity Consumption"))
        fireEvent.click(getByTestId("Gas Consumption"))
        fireEvent.click(getByTestId("Water Consumption"))
    });
});