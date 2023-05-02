import { useDispatch, useSelector } from 'react-redux';
import { describe, expect, test, vi } from 'vitest';
import { useAppDispatch, useAppSelector } from "../src/hooks"
import { RootState } from "../src/store"
vi.mock('react-redux');

describe('useAppDispatch', () => {
    test('should return the dispatch function', () => {
        const dispatch = vi.fn();
        useDispatch.mockReturnValue(dispatch);

        const result = useAppDispatch();

        expect(result).toEqual(dispatch);
    });
});

describe('useAppSelector', () => {
    test('should return the selected state', () => {
        const state: RootState = {
            user: {
                user: {},
                logged: false,
            },
            preference: {
                preference: [],
            },
            buildings: {
                buildings: [],
            },
            organization: {
                organization: [],
            },
            allOrganization: {
                organization: [],
                allBuildings: [],
            },
            allUser: {
                user: []
            },
        };
        const selectedState = {};
        useSelector.mockImplementation((selector) => selector(state));

        const result = useAppSelector((state) => state.user.user);

        expect(result).toEqual(selectedState);
    });
});