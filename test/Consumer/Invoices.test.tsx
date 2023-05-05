import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Invoices from "../../src/Consumer/Invoices/Invoices"
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { BrowserRouter } from 'react-router-dom';

describe('Invoices', () => {
    const user = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        type: 'basic',
        password: 'oldpassword',
        token: 'oldpassword',
        _id: '123',

    };

    it('renders the component', () => {
        const { baseElement } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Invoices user={user} />
                </Provider>
            </BrowserRouter>
        );
        expect(baseElement).toBeDefined();
    });

    it('displays the "Add a Building Now" button when there are no buildings', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Invoices user={user} />
                </Provider>
            </BrowserRouter>
        );

        const addButton = getByText('Add a Building Now');
        expect(addButton).toBeInTheDocument();
    });


    it('navigates to the "Building/New" route when the "Add a Building Now" button is clicked', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Invoices user={user} />
                </Provider>
            </BrowserRouter>
        );

        const addButton = getByText('Add a Building Now');
        fireEvent.click(addButton);

        expect(window.location.pathname).toEqual('/Building/New');
    });

    it('displays the "Weekly", "Monthly", and "Yearly" options for the time span filter', () => {

        const { getByText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Invoices user={user} />
                </Provider>
            </BrowserRouter>
        );
        const weeklyOption = getByText('Weekly');
        const monthlyOption = getByText('Monthly');
        const yearlyOption = getByText('Yearly');

        expect(weeklyOption).toBeInTheDocument();
        expect(monthlyOption).toBeInTheDocument();
        expect(yearlyOption).toBeInTheDocument();
        fireEvent.click(weeklyOption);
        expect(window.location.pathname).toEqual('/Invoices/Weekly');
        fireEvent.click(monthlyOption);
        expect(window.location.pathname).toEqual('/Invoices/Monthly');
        fireEvent.click(yearlyOption);
        expect(window.location.pathname).toEqual('/Invoices/Yearly');
    });
});