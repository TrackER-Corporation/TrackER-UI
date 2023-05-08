import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import TypeCard from "../../src/Consumer/Organizations/TypeCard"

describe('TypeCard component', () => {

    it('renders the TypeCard component', () => {
        const { baseElement } = render(<TypeCard data={[]} title='test' />);
        expect(baseElement).toBeValid();
    });
})