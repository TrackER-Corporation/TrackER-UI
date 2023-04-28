import allUserReducer, { setAllUser } from "../src/reducers/allUsers";


describe('allUserSlice', () => {
    it('should return the initial state', () => {
        const initialState = {
            user: {},
        };
        expect(allUserReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it('should set the user data', () => {
        const userData = { name: 'John Doe', email: 'johndoe@example.com' };
        const expectedState = {
            user: userData,
        };
        expect(allUserReducer(undefined, setAllUser(userData))).toEqual(expectedState);
    });
});