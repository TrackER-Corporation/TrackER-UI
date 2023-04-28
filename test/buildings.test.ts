import buildingsReducer, { fetchBuildings } from "../src/reducers/buildings";


describe('buildingsSlice', () => {
    it('should return the initial state', () => {
        const initialState = {
            buildings: {},
        };
        expect(buildingsReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it('should fetch the buildings data', () => {
        const buildingsData = [{ name: 'Building A', address: '123 Main St.' }];
        const expectedState = {
            buildings: buildingsData,
        };
        expect(buildingsReducer(undefined, fetchBuildings(buildingsData))).toEqual(expectedState);
    });
});