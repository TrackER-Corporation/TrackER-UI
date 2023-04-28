import userReducer, { login, logout, updateUser } from '../src/reducers/user';

describe('userSlice', () => {
    it('should return the initial state', () => {
        const initialState = {
            user: {},
            logged: false,
        };
        expect(userReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it('should login the user', () => {
        const userData = { name: 'John', email: 'john@example.com' };
        const expectedState = {
            user: userData,
            logged: true,
        };
        expect(userReducer(undefined, login(userData))).toEqual(expectedState);
    });

    it('should logout the user', () => {
        const initialState = {
            user: { name: 'John', email: 'john@example.com' },
            logged: true,
        };
        const expectedState = {
            user: {},
            logged: false,
        };
        expect(userReducer(initialState, logout())).toEqual(expectedState);
    });

    it('should update the user', () => {
        const userData = { name: 'John', email: 'john@example.com' };
        const initialState = {
            user: { name: 'Jane', email: 'jane@example.com' },
            logged: true,
        };
        const expectedState = {
            user: userData,
            logged: true,
        };
        expect(userReducer(initialState, updateUser(userData))).toEqual(expectedState);
    });
});