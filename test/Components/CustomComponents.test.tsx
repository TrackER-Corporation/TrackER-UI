import {CardTitle} from "../../src/Components/CustomComponents"
import React from 'react';
import { expect, describe, it } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Custom Components', () => {

    it('renders the correct text', () => {
        const { getByText } = render(
            <CardTitle>
                title
            </CardTitle>
        );
        expect(getByText("title")).toBeInTheDocument()
    });
});