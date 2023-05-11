import { expect, describe, it, vi } from 'vitest'
import { fireEvent, getByText, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MoneyForm } from "../../../src/Vendor/OrganizationSteps/utils";


describe('Organization Steps utils', () => {

    it('renders MoneyForm', () => {
        const onChange = vi.fn()
        const { baseElement, getByPlaceholderText } = render(
            MoneyForm("", onChange, true)
        );
        expect(baseElement).toBeValid() 
        fireEvent.change(getByPlaceholderText("%"),  { target: { value: '1' } })
    });

    it('renders MoneyForm', () => {
        const onChange = vi.fn()
        const { baseElement } = render(
            MoneyForm("", onChange)
        );
        expect(baseElement).toBeValid()
    });
})