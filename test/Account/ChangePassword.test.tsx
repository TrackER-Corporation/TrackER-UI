import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import ChangePassword from '../../src/Account/RightSide/ChangePassword';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import '@testing-library/jest-dom';

describe('ChangePassword component', () => {
    const user = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        type: 'basic',
        password: 'oldpassword',
        _id: '123',
    };

    it('renders the component with the correct text', async () => {
        render(
            <Provider store={store}>
                <ChangePassword user={user} />
            </Provider>
        );

        expect(screen.getByText('Change Password')).toBeInTheDocument();
        expect(screen.getByText('Set a unique password to protect your account.')).toBeInTheDocument();
        expect(screen.getByText('Old Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Your current password')).toBeInTheDocument();
        expect(screen.getByText('New Password')).toBeInTheDocument();
        expect(screen.getByText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByText('Update')).toBeInTheDocument();
        fireEvent.click(screen.getByText("Update"))
        fireEvent.change(screen.getByPlaceholderText('Your current password'), { target: { value: '23' } })
        screen.getAllByPlaceholderText('Your new Password').map(el =>
            fireEvent.change(el, { target: { value: '23' } })
        )


    });
});