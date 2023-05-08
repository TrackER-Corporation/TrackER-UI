import { render } from '@testing-library/react';
import React from 'react';
import WaterInvoices from "../../src/Consumer/Invoices/WaterInvoices"

describe('WaterInvoices', () => {
    it('renders the component with props', () => {
        const { getByText } = render(<WaterInvoices cost={0} aggregated={{}} bills={{}} filtered={[]} />);
        expect(getByText("Water Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with no aggregated', () => {
        const { getByText } = render(<WaterInvoices cost={0} bills={{}} filtered={[]} />);
        expect(getByText("Water Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with aggregated', () => {
        const { getByText } = render(<WaterInvoices cost={0} bills={{}} filtered={[]} aggregated={[{ water: 0 }, { water: 10 }]} />);
        expect(getByText("Water Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with cost', () => {
        const { getByText } = render(<WaterInvoices
            cost={
                [{ name: "Water Cost at kWh", price: 10 },
                { name: "Water Supplier Cost", price: 5 },
                { name: "Water Delivery Cost", price: 2 },
                { name: "Water Tax Percentage", price: 20 },
                ]
            } bills={{}} filtered={[]} aggregated={[{ water: 0 }, { water: 10 }]} />);
        expect(getByText("Water Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with no aggregated', () => {
        const { getByText } = render(<WaterInvoices cost={0} bills={{}}
            filtered={
                ["1", "2"]
            } />);
        expect(getByText("Water Supplier Details")).toBeInTheDocument();
    });
});