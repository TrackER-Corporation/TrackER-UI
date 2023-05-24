import LoadingSpinner from "../../src/Components/LoadingSpinner"
import React from 'react';
import { expect, describe, it } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Loading Spinner', () => {
    it('should return the initial state', () => {
        const { getByText } = render(<LoadingSpinner message="test" />)
        expect(getByText("test")).toBeInTheDocument()
    });
});