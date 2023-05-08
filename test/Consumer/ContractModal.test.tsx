import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { store } from '../../src/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ContractModal from '../../src/Consumer/Building/Resources/ContractModal';

describe('ContractModal component', () => {

    const setVisible = vi.fn()

    it('renders the ContractModal component', () => {
        const { baseElement } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ContractModal
                        visible
                        setVisible={setVisible}
                        buildingId='12345'
                        data={{}}
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(baseElement).toBeValid();
    });

    it('fire events', () => {
        const { getAllByText, getByTestId, getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ContractModal
                        visible
                        setVisible={setVisible}
                        buildingId='12345'
                        data={{}}
                    />
                </BrowserRouter>
            </Provider>
        );
        expect(getAllByText("Terms of Service")[0]).toBeInTheDocument();
        fireEvent.click(getByTestId("collapse1"))
        fireEvent.click(getByTestId("collapse2"))
        fireEvent.click(getByTestId("check1"))
        fireEvent.click(getByTestId("check2"))
        fireEvent.click(getByText("OK"))
        fireEvent.click(getByText("Cancel"))
    });
})