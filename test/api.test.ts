import axios from 'axios';

import '@testing-library/jest-dom';
import { expect, describe, vi } from 'vitest'
import api from "../src/api"
import dotenv from 'dotenv';
dotenv.config();

vi.mock('axios');

const API_URL = `http://localhost:${process.env.API_URL}/api`

describe('user', () => {
    const testUser = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword'
    };
    const testToken = 'testtoken';
    const testUserId = 'testuserid';

    afterEach(() => {
        vi.clearAllMocks();
    });


    describe('user.login', () => {
        it('should make a POST request to the login endpoint with the given credentials', async () => {
            const credentials = { username: 'testuser', password: 'testpassword' };
            const expectedData = { token: 'testtoken' };
            axios.post.mockResolvedValueOnce({ data: expectedData });
            const result = await api.user.login(credentials);
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/users/login`, credentials);
            expect(result).toEqual(expectedData);
        });
    });
    describe('signUp', () => {
        it('should make a POST request to the signUp endpoint with the given user data', async () => {
            const expectedData = { message: 'Success' };
            axios.post.mockResolvedValueOnce({ data: expectedData });

            const result = await api.user.signUp(testUser);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/users/register`, testUser);
            expect(result).toEqual(expectedData);
        });
    });

    describe('confirm', () => {
        it('should make a POST request to the confirm endpoint with the given token', async () => {
            const expectedData = { message: 'Success' };
            axios.post.mockResolvedValueOnce({ data: expectedData });

            const result = await api.user.confirm(testToken);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/users/confirmation`, { token: testToken });
            expect(result).toEqual({ data: expectedData });
        });
    });

    describe('get', () => {
        it('should make a GET request to the get endpoint with the given user ID', async () => {
            const expectedData = { name: 'Test User', email: 'testuser@example.com' };
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.user.get(testUserId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/users/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('update', () => {
        it('should make a PUT request to the update endpoint with the given user ID and data', async () => {
            const expectedData = { message: 'Success' };
            axios.put.mockResolvedValueOnce({ data: expectedData });

            const result = await api.user.update(testUserId, { name: 'New Name' });

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${API_URL}/users/${testUserId}`, { name: 'New Name' });
            expect(result).toEqual({ data: expectedData });

        });
    });

    describe('updatePassword', () => {
        it('should make a PUT request to the updatePassword endpoint with the given user ID and data', async () => {
            const expectedData = { message: 'Success' };
            axios.put.mockResolvedValueOnce({ data: expectedData });

            const result = await api.user.updatePassword(testUserId, { oldPassword: 'testpassword', newPassword: 'newpassword' });

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${API_URL}/users/password/${testUserId}`, { oldPassword: 'testpassword', newPassword: 'newpassword' });
            expect(result).toEqual({ data: expectedData });

        });
    });

    describe('delete', () => {
        it('should make a DELETE request to the delete endpoint with the given user ID', async () => {
            const expectedData = { message: 'Success' };
            axios.delete.mockResolvedValueOnce({ data: expectedData });
            const result = await api.user.delete(testUserId);
            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/users/${testUserId}`);
            expect(result).toEqual(undefined);
        });
    });

    describe('fetchAll', () => {
        it('should make a GET request to the fetchAll endpoint', async () => {
            const expectedData = [{ name: 'User 1' }, { name: 'User 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.user.fetchAll();

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/users/all`);
            expect(result).toEqual(expectedData);
        });
    });


});

describe('activity', () => {
    const testUserId = 'testuserid';

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchActivity', () => {
        it('should make a GET request to the fetchActivity endpoint with the given user ID', async () => {
            const expectedData = [{ name: 'Activity 1' }, { name: 'Activity 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.activity.fetchActivity(testUserId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/activity/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('updateActivity', () => {
        it('should make a POST request to the updateActivity endpoint with the given user ID', async () => {
            const expectedData = { message: 'Success' };
            axios.post.mockResolvedValueOnce({ data: expectedData });

            const result = await api.activity.updateActivity(testUserId);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/activity`, { userId: testUserId });
            expect(result).toEqual(expectedData);
        });
    });
});

describe('preference', () => {
    const testUserId = 'testuserid';

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchPreference', () => {
        it('should make a GET request to the fetchPreference endpoint with the given user ID', async () => {
            const expectedData = { theme: 'dark', language: 'en' };
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.preference.fetchPreference(testUserId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/preference/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('getAvatar', () => {
        it('should make a GET request to the getAvatar endpoint with the given user ID', async () => {
            const expectedData = { avatar: 'https://example.com/avatar.png' };
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.preference.getAvatar(testUserId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/preference/avatar/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('updatePreference', () => {
        it('should make a PUT request to the updatePreference endpoint with the given user ID and data', async () => {
            const expectedData = { message: 'Success' };
            axios.put.mockResolvedValueOnce({ data: expectedData });

            const result = await api.preference.updatePreference(testUserId, { theme: 'light', language: 'fr' });

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${API_URL}/preference/${testUserId}`, { theme: 'light', language: 'fr' });
            expect(result).toEqual(expectedData);
        });
    });

    describe('createPreference', () => {
        it('should make a POST request to the createPreference endpoint with the given user ID', async () => {
            const expectedData = { message: 'Success' };
            axios.post.mockResolvedValueOnce({ data: expectedData });

            const result = await api.preference.createPreference(testUserId);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/preference/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('deletePreferenceByUserId', () => {
        it('should make a DELETE request to the deletePreferenceByUserId endpoint with the given user ID', async () => {
            const expectedData = { message: 'Success' };
            axios.delete.mockResolvedValueOnce({ data: expectedData });

            const result = await api.preference.deletePreferenceByUserId(testUserId);

            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/preference/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });
});


describe('buildings', () => {
    const testUserId = 'testuserid';
    const testBuildingId = 'testbuildingid';
    const testOrganizationId = 'testorganizationid';

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchBuildingsByUserId', () => {
        it('should make a GET request to the fetchBuildingsByUserId endpoint with the given user ID', async () => {
            const expectedData = [{ name: 'Building 1' }, { name: 'Building 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.buildings.fetchBuildingsByUserId(testUserId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/building/find/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('fetchBuildings', () => {
        it('should make a GET request to the fetchBuildings endpoint with the given building ID', async () => {
            const expectedData = { name: 'Building 1' };
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.buildings.fetchBuildings(testBuildingId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/building/${testBuildingId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('addBuilding', () => {
        it('should make a POST request to the addBuilding endpoint with the given body', async () => {
            const expectedData = { success: true };
            const testBody = { name: 'New Building Name' };
            axios.post.mockResolvedValueOnce({ data: expectedData });

            const result = await api.buildings.addBuilding(testBody);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/building/register`, testBody);
            expect(result).toEqual(expectedData);
        });
    });

    describe('updateBuilding', () => {
        it('should make a PUT request to the updateBuilding endpoint with the given building ID and body', async () => {
            const expectedData = { success: true };
            const testBody = { name: 'New Building Name' };
            axios.put.mockResolvedValueOnce({ data: expectedData });

            const result = await api.buildings.updateBuilding(testBuildingId, testBody);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${API_URL}/building/${testBuildingId}`, testBody);
            expect(result).toEqual(expectedData);
        });
    });

    describe('updateBuildingResources', () => {
        it('should make a PUT request to the updateBuildingResources endpoint with the given building ID and body', async () => {
            const expectedData = { success: true };
            const testBody = { resources: { water: 10, electricity: 20 } };
            axios.put.mockResolvedValueOnce({ data: expectedData });

            const result = await api.buildings.updateBuildingResources(testBuildingId, testBody);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${API_URL}/building/resources/${testBuildingId}`, testBody);
            expect(result).toEqual(expectedData);
        });
    });

    describe('deleteBuilding', () => {
        it('should make a DELETE request to the deleteBuilding endpoint with the given user ID', async () => {
            const expectedData = { success: true };
            axios.delete.mockResolvedValueOnce({ data: expectedData });

            const result = await api.buildings.deleteBuilding(testUserId);

            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/building/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('getBuilding', () => {
        it('should make a GET request to the getBuilding endpoint with the given building ID', async () => {
            const expectedData = { name: 'Building 1' };
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.buildings.getBuilding(testBuildingId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/building/${testBuildingId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('getBuildingsByOrganizationId', () => {
        it('should make a GET request to the getBuildingsByOrganizationId endpoint with the given organization ID', async () => {
            const expectedData = [{ name: 'Building 1' }, { name: 'Building 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.buildings.getBuildingsByOrganizationId(testOrganizationId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/building/organization/${testOrganizationId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('deleteBuildingByUserId', () => {
        it('should make a DELETE request to the deleteBuildingByUserId endpoint with the given user ID', async () => {
            const expectedData = { success: true };
            axios.delete.mockResolvedValueOnce({ data: expectedData });

            const result = await api.buildings.deleteBuildingByUserId(testUserId);

            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/building/user/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });
});

describe('organization', () => {
    const testUserId = 'testuserid';
    const testOrgId = 'testorgid';

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('create', () => {
        it('should make a POST request to the create endpoint with the given body', async () => {
            const expectedData = { success: true };
            const testBody = { name: 'New Organization Name' };
            axios.post.mockResolvedValueOnce({ data: expectedData });

            const result = await api.organization.create(testBody);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/organization`, testBody);
            expect(result).toEqual(expectedData);
        });
    });

    describe('getByUserId', () => {
        it('should make a GET request to the getByUserId endpoint with the given user ID', async () => {
            const expectedData = { name: 'Organization 1' };
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.organization.getByUserId(testUserId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/organization/user/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('update', () => {
        it('should make a PUT request to the update endpoint with the given ID and body', async () => {
            const expectedData = { success: true };
            const testBody = { name: 'Updated Organization Name' };
            axios.put.mockResolvedValueOnce({ data: expectedData });

            const result = await api.organization.update(testOrgId, testBody);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${API_URL}/organization/${testOrgId}`, testBody);
            expect(result).toEqual(expectedData);
        });
    });

    describe('fetch', () => {
        it('should make a GET request to the fetch endpoint', async () => {
            const expectedData = [{ name: 'Organization 1' }, { name: 'Organization 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.organization.fetch();

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/organization/all`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('getById', () => {
        it('should make a GET request to the getById endpoint with the given organization ID', async () => {
            const expectedData = { name: 'Organization 1' };
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.organization.getById(testOrgId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/organization/${testOrgId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('updateResources', () => {
        it('should make a PUT request to the updateResources endpoint with the given organization ID', async () => {
            const expectedData = { success: true };
            axios.put.mockResolvedValueOnce({ data: expectedData });

            const result = await api.organization.updateResources(testOrgId);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${API_URL}/organization/resources/${testOrgId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('deleteOrg', () => {
        it('should make a DELETE request to the deleteOrg endpoint with the given ID', async () => {
            const expectedData = { success: true };
            axios.delete.mockResolvedValueOnce({ data: expectedData });

            const result = await api.organization.deleteOrg(testOrgId);

            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/organization/${testOrgId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('deleteOrgByUserId', () => {
        it('should make a DELETE request to the deleteOrgByUserId endpoint with the given user ID', async () => {
            const expectedData = { success: true };
            axios.delete.mockResolvedValueOnce({ data: expectedData });

            const result = await api.organization.deleteOrgByUserId(testUserId);

            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/organization/user/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });
});

describe('bills', () => {
    const testBuildingId = 'testbuildingid';
    const testUserId = 'testuserid';
    const testOrganizationId = 'testorganizationid';

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchBills', () => {
        it('should make a GET request to the fetchBills endpoint with the given building ID', async () => {
            const expectedData = [{ name: 'Bill 1' }, { name: 'Bill 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.bills.fetchBills(testBuildingId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/bills/buildings/${testBuildingId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('addBills', () => {
        it('should make a POST request to the addBills endpoint with the given building ID and body', async () => {
            const expectedData = { name: 'Bill 1' };
            axios.post.mockResolvedValueOnce({ data: expectedData });

            const result = await api.bills.addBills(testBuildingId, { name: 'Bill 1' });

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/bills/add/${testBuildingId}`, { name: 'Bill 1' });
            expect(result).toEqual(expectedData);
        });
    });

    describe('updateBills', () => {
        it('should make a POST request to the updateBills endpoint with the given building ID and body', async () => {
            const expectedData = { name: 'Bill 1' };
            axios.post.mockResolvedValueOnce({ data: expectedData });

            const result = await api.bills.updateBills(testBuildingId, { name: 'Bill 1' });

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/bills/update/${testBuildingId}`, { name: 'Bill 1' });
            expect(result).toEqual(expectedData);
        });
    });

    describe('getBills', () => {
        it('should make a GET request to the getBills endpoint', async () => {
            const expectedData = [{ name: 'Bill 1' }, { name: 'Bill 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.bills.getBills();

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/bills`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('getBillsAggregated', () => {
        it('should make a GET request to the getBillsAggregated endpoint with the given user ID', async () => {
            const expectedData = { totalAmount: 100 };
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.bills.getBillsAggregated(testUserId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/bills/${testUserId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('getBillsByOrganizationId', () => {
        it('should make a GET request to the getBillsByOrganizationId endpoint with the given organization ID', async () => {
            const expectedData = [{ name: 'Bill 1' }, { name: 'Bill 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.bills.getBillsByOrganizationId(testOrganizationId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/bills/organization/${testOrganizationId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('getBillsByOrganizationIdAggregated', () => {
        it('should make a GET request to the getBillsByOrganizationIdAggregated endpoint with the given organization ID', async () => {
            const expectedData = { totalAmount: 100 };
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.bills.getBillsByOrganizationIdAggregated(testOrganizationId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/bills/organization/aggregated/${testOrganizationId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('getBillsRenewable', () => {
        it('should make a GET request to the getBillsRenewable endpoint with the given building ID', async () => {
            const expectedData = [{ name: 'Bill 1' }, { name: 'Bill 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.bills.getBillsRenewable(testBuildingId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/bills/renewable/${testBuildingId}`);
            expect(result).toEqual(expectedData);
        });
    });
});

describe('renewable', () => {
    const testId = 'testid';
    const testBuildingId = 'testbuildingid';
    const testOrganizationId = 'testorganizationid';

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchResources', () => {
        it('should make a GET request to the fetchResources endpoint with the given ID', async () => {
            const expectedData = { name: 'Resource 1' };
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.renewable.fetchResources(testId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/renewable/${testId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('fetchResourcesByBuildingId', () => {
        it('should make a GET request to the fetchResourcesByBuildingId endpoint with the given building ID', async () => {
            const expectedData = [{ name: 'Resource 1' }, { name: 'Resource 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.renewable.fetchResourcesByBuildingId(testBuildingId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/renewable/building/${testBuildingId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('fetchAll', () => {
        it('should make a GET request to the fetchAll endpoint', async () => {
            const expectedData = [{ name: 'Resource 1' }, { name: 'Resource 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.renewable.fetchAll();

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/renewable`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('fetchResourcesByOrganizationId', () => {
        it('should make a GET request to the fetchResourcesByOrganizationId endpoint with the given organization ID', async () => {
            const expectedData = [{ name: 'Resource 1' }, { name: 'Resource 2' }];
            axios.get.mockResolvedValueOnce({ data: expectedData });

            const result = await api.renewable.fetchResourcesByOrganizationId(testOrganizationId);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/renewable/organization/${testOrganizationId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('updateResourcesBuildingsById', () => {
        it('should make a PUT request to the updateResourcesBuildingsById endpoint with the given ID and body', async () => {
            const expectedData = { success: true };
            const testBody = { name: 'New Resource Name' };
            axios.put.mockResolvedValueOnce({ data: expectedData });

            const result = await api.renewable.updateResourcesBuildingsById(testId, testBody);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${API_URL}/renewable/${testId}`, testBody);
            expect(result).toEqual(expectedData);
        });
    });

    describe('updateResourcesBuildingsByBuildingId', () => {
        it('should make a PUT request to the updateResourcesBuildingsByBuildingId endpoint with the given building ID and body', async () => {
            const expectedData = { success: true };
            const testBody = { name: 'New Resource Name' };
            axios.put.mockResolvedValueOnce({ data: expectedData });

            const result = await api.renewable.updateResourcesBuildingsByBuildingId(testBuildingId, testBody);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${API_URL}/renewable/buildings/${testBuildingId}`, testBody);
            expect(result).toEqual(expectedData);
        });
    });

    describe('deleteResources', () => {
        it('should make a DELETE request to the deleteResources endpoint with the given ID', async () => {
            const expectedData = { success: true };
            axios.delete.mockResolvedValueOnce({ data: expectedData });

            const result = await api.renewable.deleteResources(testId);

            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/renewable/${testId}`);
            expect(result).toEqual(expectedData);
        });
    });

    describe('createResources', () => {
        it('should make a POST request to the createResources endpoint with the given body', async () => {
            const expectedData = { success: true };
            const testBody = { name: 'New Resource Name' };
            axios.post.mockResolvedValueOnce({ data: expectedData });

            const result = await api.renewable.createResources(testBody);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/renewable`, testBody);
            expect(result).toEqual(expectedData);
        });
    });
});