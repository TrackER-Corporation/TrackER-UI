import { render } from '@testing-library/react';
import React from 'react';
import ElectricInvoices from "../../src/Consumer/Invoices/ElectricInvoices"

describe('ElectricInvoices', () => {
    it('renders the component with props', () => {
        const { getByText } = render(<ElectricInvoices cost={0} aggregated={{}} bills={{}} filtered={[]} />);
        expect(getByText("Electric Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with no aggregated', () => {
        const { getByText } = render(<ElectricInvoices cost={0} bills={{}} filtered={[]} />);
        expect(getByText("Electric Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with aggregated', () => {
        const { getByText } = render(
            <ElectricInvoices cost={0} bills={{}} filtered={[]} aggregated={[{ date: 0, electricity: 0 }]} />
        );
        expect(getByText("Electric Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with cost', () => {
        const { getByText } = render(<ElectricInvoices
            cost={
                [{ name: "Electricity Cost at kWh", price: 10 },
                { name: "Electricity Supplier Cost", price: 5 },
                { name: "Electricity Delivery Cost", price: 2 },
                { name: "Electricity Tax Percentage", price: 20 },
                ]
            } bills={{}} filtered={[]} aggregated={[{ water: 0 }, { water: 10 }]} />);
        expect(getByText("Electric Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with no aggregated', () => {
        const { getByText } = render(<ElectricInvoices cost={0} bills={{}}
            filtered={
                ["1", "2"]
            } />);
        expect(getByText("Electric Supplier Details")).toBeInTheDocument();
    });
});