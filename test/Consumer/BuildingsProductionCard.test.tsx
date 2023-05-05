import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import BuildingsProductionCard from "../../src/Consumer/DashboardCards/BuildingsProductionCard"
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../src/store';
import { Provider } from 'react-redux';

describe('BuildingsProductionCard component', () => {

    it('renders the BuildingsProductionCard component', () => {
        const { baseElement } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <BuildingsProductionCard />
                </BrowserRouter>
            </Provider>
        );
        expect(baseElement).toBeValid();
        fireEvent.click(screen.getByText("Buildings Devices Production"))
        fireEvent.click(screen.getByText("No data to show"))
    });
})