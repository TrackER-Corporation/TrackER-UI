import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import TableCard from "../../src/Consumer/DashboardCards/TableCard"

describe('TableCard component', () => {

    it('renders the TableCard component', () => {
        const { baseElement } = render(<TableCard buildings={[]} />);
        expect(baseElement).toBeValid();
    });

    it('renders the TableCard component', () => {
        const { baseElement } = render(
            <TableCard
                buildings={[{
                    _id: "string",
                    name: "string",
                    contact: "string",
                    address: "string",
                    type: "string",
                    lat: "string",
                    long: ""
                }]}
            />);
        expect(baseElement).toBeValid();
    });
})