import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import EarningsCard from "../../src/Consumer/DashboardCards/EarningsCard"

describe('EarningsCard component', () => {

    it('renders the EarningsCard component', () => {
        const { baseElement } = render(<EarningsCard series={[]} total={0} />);
        expect(baseElement).toBeValid();
    });

    it('renders the EarningsCard component', () => {
        const { baseElement } = render(<EarningsCard series={[]} total={10} />);
        expect(baseElement).toBeValid();
    });
})