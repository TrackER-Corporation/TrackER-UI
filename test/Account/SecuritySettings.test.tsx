import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '../../src/store';
import React from 'react';
import SecuritySettings from '../../src/Account/RightSide/SecuritySettings';


vi.mock('../../../api');

describe('SecuritySettings component', () => {

    it('renders correctly', () => {
        const route = vi.fn()

        render(
            <Provider store={store}>
                <SecuritySettings user={store.getState().user} updateRoute={route} socket={{}} />
            </Provider>
        );

        expect(screen.getByText('Security Settings')).toBeInTheDocument();
        expect(screen.getByText('These settings are helps you keep your account secure.')).toBeInTheDocument();
        expect(screen.getByText('Save my Activity Logs')).toBeInTheDocument();
        expect(screen.getByText('You can save your all activity logs including unusual activity detected.')).toBeInTheDocument();
        expect(screen.getByText('Set a unique password to protect your account.')).toBeInTheDocument();
        expect(screen.getByText('Delete your Account')).toBeInTheDocument();
        expect(screen.getByText('Remove your account and your personal information from the network.')).toBeInTheDocument();
        screen.getAllByText("Change Password").forEach(element => {
            fireEvent.click(element)
        });
        expect(route).toHaveBeenCalledTimes(1)
        fireEvent.click(screen.getByText("Delete your Account"))
        fireEvent.click(screen.getByText("Delete Account"))
        fireEvent.click(screen.getByText("Yes"))
        fireEvent.click(screen.getByTestId("switch"))
    });
});