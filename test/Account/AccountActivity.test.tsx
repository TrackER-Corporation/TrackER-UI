import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import AccountActivity from '../../src/Account/RightSide/AccountActivity';
import { store } from '../../src/store';
import { describe, it, vi } from 'vitest';


describe('AccountActivity component', () => {
    const user = {}
    it('renders the component with the correct text', async () => {
        render(<AccountActivity user={user} />);

        expect(screen.getByText('Login Activity')).toBeInTheDocument();
        expect(screen.getByText('Here is your last login activities log.')).toBeInTheDocument();
    });
});