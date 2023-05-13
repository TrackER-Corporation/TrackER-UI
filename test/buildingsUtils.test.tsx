import '@testing-library/jest-dom';
import { expect, describe, vi } from 'vitest'
import { message } from 'antd';
import { addBuilding, handleCoords, onSelect } from '../src/buildingsUtils';
import api from '../src/api';
import { fetchBuildings } from '../src/reducers/buildings';

const user = {
    _id: "1",
    name: "Emanuele",
    surname: "Dall'Ara",
    email: "emanuele@dernetsoft.com",
    password: "abcd",
    token: "1212",
    type: "Building"


};

describe('onSelect', () => {
    test('should set address, lat, and lon correctly', () => {
        const setAddress = vi.fn();
        const setLat = vi.fn();
        const setLon = vi.fn();
        const options = [
            { value: 'New York', props: { lat: 40.7128, lon: -74.006 } },
            { value: 'Los Angeles', props: { lat: 34.0522, lon: -118.2437 } },
        ];
        onSelect('New York', options, setAddress, setLat, setLon);
        expect(setAddress).toHaveBeenCalledWith('New York');
        expect(setLat).toHaveBeenCalledWith(40.7128);
        expect(setLon).toHaveBeenCalledWith(-74.006);
    });
});

describe('handleCoords', () => {
    test('should fetch and set options correctly', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: () => ({
                results: [
                    { formatted: 'New York', place_id: 1 },
                    { formatted: 'Los Angeles', place_id: 2 },
                ],
            }),
        });
        const setOptions = vi.fn();
        await handleCoords('New York', setOptions);
        expect(fetch).toHaveBeenCalledWith(
            'https://api.geoapify.com/v1/geocode/search?text=New York&format=json&apiKey=e92ee477e1114d5c80988f7fd2d838d6',
            { method: 'GET' }
        );
        expect(setOptions).toHaveBeenCalledWith([
            { label: 'New York', value: 'New York', key: 1, props: { formatted: 'New York', place_id: 1 } },
            { label: 'Los Angeles', value: 'Los Angeles', key: 2, props: { formatted: 'Los Angeles', place_id: 2 } },
        ]);
    });
});

describe('addBuilding', () => {
    test('should add building and fetch buildings correctly', async () => {
        const setShow = vi.fn();
        const dispatch = vi.fn();
        const data = {
            name: 'Building A',
            contact: 'John Doe',
            address: 'New York',
            sqft: '1000',
            type: 'Office',
            lat: 40.7128,
            long: -74.006,
            organizationId: [1, 2],
            userId: user._id
        };
        api.buildings.addBuilding = vi.fn().mockResolvedValue({});
        api.buildings.fetchBuildingsByUserId = vi.fn().mockResolvedValue([]);
        await addBuilding('Building A', 'John Doe', 'New York', '1000', 'Office', 40.7128, -74.006, [1, 2], user, setShow, dispatch);
        expect(api.buildings.addBuilding).toHaveBeenCalledWith(data);
        expect(api.buildings.fetchBuildingsByUserId).toHaveBeenCalledWith("1");
        expect(setShow).toHaveBeenCalledWith(true);
        expect(dispatch).toHaveBeenCalledWith(fetchBuildings([]));
    });

    test('should show error message when form is not filled', async () => {
        const setShow = vi.fn();
        const dispatch = vi.fn();
        api.buildings.addBuilding = vi.fn().mockResolvedValue({});
        api.buildings.fetchBuildingsByUserId = vi.fn().mockResolvedValue([]);
        const messageErrorSpy = vi.spyOn(message, 'error');
        await addBuilding('', '', '', '', '', 0, 0, [1, 2], user, setShow, dispatch);
        expect(api.buildings.addBuilding).toHaveBeenCalled();
        expect(api.buildings.fetchBuildingsByUserId).toHaveBeenCalled();
        expect(setShow).toHaveBeenCalledWith(true);
        expect(messageErrorSpy).toHaveBeenCalledWith('Fill the form to submit a building');
    });

    test('should show error message when building is not added', async () => {
        const setShow = vi.fn();
        const dispatch = vi.fn();
        const data = {
            name: 'Building A',
            contact: 'John Doe',
            address: 'New York',
            sqft: '1000',
            type: 'Office',
            lat: 40.7128,
            long: -74.006,
            organizationId: [1, 2],
            userId: user._id
        };
        api.buildings.addBuilding = vi.fn().mockRejectedValue({});
        api.buildings.fetchBuildings = vi.fn().mockResolvedValue([]);
        await addBuilding('Building A', 'John Doe', 'New York', '1000', 'Office', 40.7128, -74.006, [1, 2], user, setShow, dispatch);
        expect(api.buildings.addBuilding).toHaveBeenCalledWith(data);
        expect(api.buildings.fetchBuildings).not.toHaveBeenCalled();
        expect(setShow).toHaveBeenCalledWith(true);
    });
});