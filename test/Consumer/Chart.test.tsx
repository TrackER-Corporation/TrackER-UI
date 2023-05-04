import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Chart from "../../src/Consumer/Chart"


describe('Chart component', () => {
    it('renders the Chart component', () => {
        const result = render(<Chart />);
        expect(result).toBeInTheDocument();
    });
})


