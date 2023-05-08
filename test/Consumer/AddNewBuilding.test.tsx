import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import AddNewBuilding from "../../src/Consumer/Building/AddNewBuilding"
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../src/store';
import { Provider } from 'react-redux';

describe('AddNewBuilding component', () => {
    const user = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        type: 'basic',
        password: 'oldpassword',
        token: 'oldpassword',
        _id: '123',
    };


    it('renders the AddNewBuilding component', () => {
        const { baseElement, getByText, getByPlaceholderText, getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <AddNewBuilding {...user} />
                </BrowserRouter>
            </Provider>
        );
        expect(baseElement).toBeValid();
        fireEvent.click(getByText("Add"))
        fireEvent.change(getByPlaceholderText("Building Name"), { target: { value: 'Good Day' } })
        fireEvent.change(getByPlaceholderText("Building Owner Name"), { target: { value: 'Good Day' } })
        fireEvent.change(getByPlaceholderText("Building Size (Sqmt)"), { target: { value: 'Good Day' } })
        fireEvent.mouseDown(getByTestId('select1').firstElementChild);

    });
})