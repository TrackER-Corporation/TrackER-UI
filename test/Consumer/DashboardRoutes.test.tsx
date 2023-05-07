import { render, screen, fireEvent } from '@testing-library/react';
import DashboardRoutes from "../../src/Consumer/DashboardRoutes"
import React from 'react';
import { describe, expect, vi } from 'vitest';
import '@testing-library/jest-dom'
import { store } from '../../src/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('DashboardRoutes', () => {
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardRoutes />
                </BrowserRouter>
            </Provider>
        );
    });

});