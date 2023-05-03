import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import EditAccountModal from '../../src/Account/RightSide/Modal/EditAccountModal';
import { store } from '../../src/store';
import { describe, it, vi } from 'vitest';

describe('EditAccountModal component', () => {
    it('renders correctly', () => {
        const setVisible = vi.fn()
        render(
            <Provider store={store}>
                <EditAccountModal
                    visible={true}
                    setVisible={setVisible}
                    user={{}}
                />
            </Provider>
        );

        expect(screen.getByText('Edit your personal data')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Surname')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Surname')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Update')).toBeInTheDocument();
        fireEvent.click(screen.getByPlaceholderText('Name'))
        fireEvent.change(screen.getByPlaceholderText('Surname'), { target: { value: '23' } })
        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: '23' } })
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: '23' } })
        fireEvent.click(screen.getByLabelText('Close'))
        fireEvent.click(screen.getByText('Update'))
    });

});