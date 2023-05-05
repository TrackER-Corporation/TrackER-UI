import { render } from '@testing-library/react';
import React from 'react';
import GasInvoices from "../../src/Consumer/Invoices/GasInvoices"

describe('GasInvoices', () => {
    it('renders the component with props', () => {
        const { getByText } = render(<GasInvoices cost={0} aggregated={{}} bills={{}} filtered={[]} />);
        expect(getByText("Gas Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with no aggregated', () => {
        const { getByText } = render(<GasInvoices cost={0} bills={{}} filtered={[]} />);
        expect(getByText("Gas Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with aggregated', () => {
        const { getByText } = render(
            <GasInvoices cost={0} bills={{}} filtered={[]} aggregated={[{ date: 0, electricity: 0 }]} />
        );
        expect(getByText("Gas Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with cost', () => {
        const { getByText } = render(<GasInvoices
            cost={
                [{ name: "Gas Cost at m³", price: 10 },
                { name: "Supplier Gas Cost", price: 5 },
                { name: "Gas Delivery Cost", price: 2 },
                { name: "Gas Tax Percentage", price: 20 },
                ]
            } bills={{}} filtered={[]} aggregated={[{ water: 0 }, { water: 10 }]} />);
        expect(getByText("Gas Supplier Details")).toBeInTheDocument();
    });

    it('renders the component with no aggregated', () => {
        const { getByText } = render(<GasInvoices cost={0} bills={{}}
            filtered={
                ["1", "2"]
            } />);
        expect(getByText("Gas Supplier Details")).toBeInTheDocument();
    });
});