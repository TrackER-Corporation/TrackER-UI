import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Service from '../../src/Service';

describe('Service component', () => {
    test('renders all child components', () => {
        const { getByTestId } = render(<Service />);

        expect(getByTestId('Banner5')).toBeInTheDocument();
        expect(getByTestId('Feature6')).toBeInTheDocument();
        expect(getByTestId('Pricing0')).toBeInTheDocument();
        expect(getByTestId('Feature8')).toBeInTheDocument();
    });
});