import allOrganizationReducer, { setAllBuildings, setAllOrganization } from "../src/reducers/allOrganization";


describe('allOrganizationSlice', () => {
    it('should return the initial state', () => {
        const initialState = {
            organization: null,
            allBuildings: null,
        };
        expect(allOrganizationReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it('should set the organization data', () => {
        const organizationData = { name: 'ACME Corp', employees: 100 };
        const expectedState = {
            organization: organizationData,
            allBuildings: null,
        };
        expect(allOrganizationReducer(undefined, setAllOrganization(organizationData))).toEqual(expectedState);
    });

    it('should set the buildings data', () => {
        const buildingsData = [{ name: 'Building A', address: '123 Main St.' }];
        const expectedState = {
            organization: null,
            allBuildings: buildingsData,
        };
        expect(allOrganizationReducer(undefined, setAllBuildings(buildingsData))).toEqual(expectedState);
    });
});