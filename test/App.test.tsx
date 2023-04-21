
import '@testing-library/jest-dom';
import { expect, describe } from 'vitest'
import { fireEvent, render } from '@testing-library/react';

import App from "../src/App"

describe('AppRoute', () => {
    test('renders the correct text', () => {
        const { getByText } = render(<App />);
        expect(getByText('Vite + React')).toBeInTheDocument();
        expect(getByText('count is 0')).toBeInTheDocument();
        expect(getByText('Click on the Vite and React logos to learn more')).toBeInTheDocument();
    });

    test('increments count when button is clicked', () => {
        const { getByText } = render(<App />);
        const button = getByText('count is 0');
        fireEvent.click(button);
        expect(button).toHaveTextContent('count is 1');
    });
});