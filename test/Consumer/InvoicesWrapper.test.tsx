import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import InvoicesWrapper from "../../src/Consumer/Invoices/InvoicesWrapper"
import { vi } from 'vitest';

describe('InvoicesWrapper', () => {
    const propsEmpty = {
        title: 'Test Title',
        bills: {},
        multiplier: 2,
        change: false,
        setChange: vi.fn(),
        totalSum: 100,
        totalEarning: 200,
        delivery: 50,
        totalTaxCost: 25,
        supplier: 75,
        chart: <div>Test Chart</div>,
        changeTitle: {
            first: "",
            second: ""
        }
    };

    const props = {
        title: 'Test Title',
        bills: {
            a: { a: "" },
        },
        multiplier: 2,
        change: false,
        setChange: vi.fn(),
        totalSum: 100,
        totalEarning: 200,
        delivery: 50,
        totalTaxCost: 25,
        supplier: 75,
        chart: <div>Test Chart</div>,
        changeTitle: {
            first: "",
            second: ""
        }
    };

    it('renders the component with props', () => {
        const { getByText } = render(<InvoicesWrapper {...propsEmpty} />);
        expect(getByText(propsEmpty.title)).toBeInTheDocument();
        expect(getByText(/Check your supplier earnings and productions/i)).toBeInTheDocument();
    });

    it('renders the Empty component when bills prop is empty', () => {
        const { getByText } = render(<InvoicesWrapper {...propsEmpty} bills={{}} />);
        expect(getByText('No data')).toBeInTheDocument();
    });

    it('renders the component with bills', () => {
        const { getByText, getByTestId } = render(<InvoicesWrapper {...props} />);
        expect(getByText(/Check your supplier earnings and productions/i)).toBeInTheDocument();
        expect(getByTestId("test")).toBeInTheDocument();
        fireEvent.click(getByTestId("test"))
    });

});