import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import RenewableCard from "../../src/Consumer/Organizations/RenewableCard"

describe('Renewable component', () => {

    it('renders the Renewable component', () => {
        const { baseElement } = render(<RenewableCard organizationId='1235' title='test' />);
        expect(baseElement).toBeValid();
    });
})