import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import DownloadCard from "../../src/Consumer/DashboardCards/DownloadCard"
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../src/store';
import { Provider } from 'react-redux';

describe('Header component', () => {

    it('renders the Header component', () => {
        const { baseElement } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <DownloadCard />
                </BrowserRouter>
            </Provider>
        );
        expect(baseElement).toBeValid();
        fireEvent.click(screen.getByText("View"))
    });
})