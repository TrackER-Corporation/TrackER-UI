import organizationReducer, { fetchOrganization } from "../src/reducers/organization";
import { expect, describe, it} from 'vitest'

describe('organizationSlice', () => {
    it('should return the initial state', () => {
        const initialState = {
            organization: {},
        };
        expect(organizationReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it('should fetch the organization data', () => {
        const organizationData = { name: 'Acme Inc.', address: '456 Main St.' };
        const expectedState = {
            organization: organizationData,
        };
        expect(organizationReducer(undefined, fetchOrganization(organizationData))).toEqual(expectedState);
    });
});