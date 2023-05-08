import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from "../../src/Consumer/Header/Header"
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../src/store';
import { Provider } from 'react-redux';

describe('Header component', () => {

    it('renders the Header component', () => {
        const { baseElement } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header avatar='' />
                </BrowserRouter>
            </Provider>
        );
        expect(baseElement).toBeValid();
    });
})