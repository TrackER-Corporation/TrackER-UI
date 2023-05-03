import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import React from 'react';
import AccountNotification from '../../src/Account/RightSide/AccountNotification';


describe('AccountNotification component', () => {


    it('renders the component with the correct text', () => {
        render(
            <Provider store={store}>
                <AccountNotification user={{}} />
            </Provider>
        );

        expect(screen.getByText('Notification Settings')).toBeInTheDocument();
        expect(screen.getByText('Set up your notifications preferences.')).toBeInTheDocument();
        expect(screen.getByText('Mails notifications')).toBeInTheDocument();
        expect(screen.getByText('Receive mails about your account operation.')).toBeInTheDocument();
        expect(screen.getByText('Newsletter update')).toBeInTheDocument();
        expect(screen.getByText('Notify me by email about sales and latest news of TrackER.')).toBeInTheDocument();
        expect(screen.getByTestId('notification')).toBeInTheDocument();
        expect(screen.getByTestId('news')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('news'))
        fireEvent.click(screen.getByTestId('notification'))
    });

});