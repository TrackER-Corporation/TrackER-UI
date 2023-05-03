import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import React from 'react';
import OrganizationDrawer from '../../src/Account/OrganizationDrawer';
import { vi } from 'vitest';

describe('OrganizationDrawer component', () => {

    it('renders the component with a preview of the current avatar', () => {
        const user = { name: 'Test User' };
        const onClose = vi.fn();

        render(
            <Provider store={store}>
                <OrganizationDrawer user={user} visible onClose={onClose} />
            </Provider>
        );

        expect(screen.getByText('Change Organization Logo')).toBeInTheDocument();
        expect(screen.getByText('Organization Logo Preview')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Change'))
        fireEvent.click(screen.getByText('Click or drag file to this area to upload'))
        fireEvent.click(screen.getByText('Cancel'))
    });
});