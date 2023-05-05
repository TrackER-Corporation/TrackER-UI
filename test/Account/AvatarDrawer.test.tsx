import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import AvatarDrawer from '../../src/Account/AvatarDrawer';
import { vi } from 'vitest';
import { store } from '../../src/store';


describe('AvatarDrawer component', () => {

    const user = {}
    const onClose = vi.fn()

    it('renders the component with the correct avatar', () => {
        render(
            <Provider store={store}>
                <AvatarDrawer user={user} visible={true} onClose={onClose} />
            </Provider>
        );

        expect(screen.getByText('Change Avatar')).toBeInTheDocument();
        expect(screen.getByText('Avatar Preview')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Change')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Change'));
        fireEvent.click(screen.getByText('Cancel'));
        fireEvent.click(screen.getAllByTestId('avatar1')[0]);
        fireEvent.click(screen.getAllByTestId('avatar2')[0]);
        fireEvent.click(screen.getAllByTestId('avatar3')[0]);
    });

});