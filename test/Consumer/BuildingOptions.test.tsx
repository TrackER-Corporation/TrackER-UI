import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import BuildingOptions from '../../src/Consumer/Building/BuildingOptions';

describe('BuildingOptions component', () => {

    const setType = vi.fn()

    it('renders the BuildingOptions component', () => {
        const { baseElement, getByText, getAllByText, getByTestId } = render(
            <BuildingOptions setType={setType} placeholder='Building Type' />
        );
        expect(baseElement).toBeValid();
        fireEvent.click(getByText("Building Type"))
        fireEvent.mouseDown(getByTestId('select').firstElementChild);
        fireEvent.click(getAllByText("Residential")[1])

    });

})