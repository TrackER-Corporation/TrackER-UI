import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import React from 'react';
import InfoAccount from '../../src/Account/RightSide/InfoAccount';
import { vi } from 'vitest';


describe('InfoAccount component', () => {

    it('renders the component with the correct text', () => {
        const socket = {
            emit: vi.fn()
        };
        render(
            <Provider store={store}>
                <InfoAccount user={{}} socket={socket} />
            </Provider>
        );

        expect(screen.getByText('Personal Information')).toBeInTheDocument();
        expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi.')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Surname')).toBeInTheDocument();
        expect(screen.getByText('Account Type')).toBeInTheDocument();
        expect(screen.getByText('Exit')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Edit'))
        fireEvent.click(screen.getByText('Logout'))
        fireEvent.click(screen.getByText('Yes'))
    });
});