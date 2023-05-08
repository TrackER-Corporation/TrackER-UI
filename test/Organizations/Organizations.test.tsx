import '@testing-library/jest-dom';
import { expect, describe } from 'vitest'
import { render } from '@testing-library/react';
import Organizations from "../../src/Consumer/Organizations/Organizations"

import React from 'react';
import { Organization, UserProps } from '../../src/types';
import { BrowserRouter } from 'react-router-dom';

describe("Organizations component", () => {
    it("should render the component without errors", () => {
        const allOrganization: Array<Organization> = [{ _id: "1", name: "Org 1", type: ["Electric"], details: { electric: [], water: [], gas: [], resources: [] }, userId: "ƒ", customers: [] }];
        const allUser: Array<UserProps> = [{ _id: "1", name: "User", surname: "Surname", email: "", password: "", token: "", type: "" }];
        const { container } = render(
            <BrowserRouter>
                <Organizations allOrganization={allOrganization} allUser={allUser} />
            </BrowserRouter>
        );
        expect(container).toBeInTheDocument();
    });
});