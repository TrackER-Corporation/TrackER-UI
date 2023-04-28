import preferenceReducer, { userPreference, updatePreference } from '../src/reducers/preference';

describe('preferenceSlice', () => {
    it('should return the initial state', () => {
        const initialState = {
            preference: {},
        };
        expect(preferenceReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it('should set the user preference', () => {
        const preferenceData = { theme: 'dark', language: 'en' };
        const expectedState = {
            preference: preferenceData,
        };
        expect(preferenceReducer(undefined, userPreference(preferenceData))).toEqual(expectedState);
    });

    it('should update the user preference', () => {
        const preferenceData = { theme: 'light', language: 'fr' };
        const initialState = {
            preference: { theme: 'dark', language: 'en' },
        };
        const expectedState = {
            preference: preferenceData,
        };
        expect(preferenceReducer(initialState, updatePreference(preferenceData))).toEqual(expectedState);
    });
});