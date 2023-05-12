import axios from "axios";
import { Credentials, UserApi } from "./types";

const API_URL = `http://localhost:3000/api`;

export default {
    user: {
        login: (credentials: Credentials) =>
            axios.post(`${API_URL}/users/login`, { ...credentials })
                .then((res) => res.data),
        signUp: (user: UserApi) =>
            axios.post(`${API_URL}/users/register`, { ...user })
                .then((res) => res.data),
        confirm: (token: any) =>
            axios.post(`${API_URL}/users/confirmation`, { token })
                .then((res) => res),
        get: (id: string) =>
            axios.get(`${API_URL}/users/${id}`)
                .then((res) => res.data),
        update: (id: string, data: any) =>
            axios.put(`${API_URL}/users/${id}`, data),
        updatePassword: (id: string, data: any) =>
            axios.put(`${API_URL}/users/password/${id}`, data),
        delete: (id: string) => {
            axios
                .delete(`${API_URL}/users/${id}`).then(res => res.data)
        },
        fetchAll: () =>
            axios.get(`${API_URL}/users/all`)
                .then((res) => res.data),
    },
    activity: {
        fetchActivity: (userId: string) =>
            axios.get(`${API_URL}/activity/${userId}`)
                .then((res) => res.data),
        updateActivity: (userId: string) =>
            axios.post(`${API_URL}/activity`, { userId: userId })
                .then((res) => res.data),
    },
    preference: {
        fetchPreference: (userId: string) =>
            axios.get(`${API_URL}/preference/${userId}`)
                .then((res) => res.data),
        getAvatar: (userId: string) =>
            axios.get(`${API_URL}/preference/avatar/${userId}`)
                .then((res) => res.data),
        updatePreference: (userId: string, body: any) =>
            axios.put(`${API_URL}/preference/${userId}`, body)
                .then((res) => res.data),
        createPreference: (userId: string) =>
            axios.post(`${API_URL}/preference/${userId}`)
                .then((res) => res.data),
        deletePreferenceByUserId: (userId: string) =>
            axios.delete(`${API_URL}/preference/${userId}`)
                .then((res) => res.data),
    },
    buildings: {
        fetchBuildingsByUserId: (userId: string) =>
            axios.get(`${API_URL}/buildings/user/${userId}`)
                .then((res) => res.data),
        getBuilding: (id: string) =>
            axios.get(`${API_URL}/buildings/${id}`)
                .then((res) => res.data),
        getBuildingsByOrganizationId: (organizationId: string) =>
            axios.get(`${API_URL}/buildings/organization/${organizationId}`)
                .then((res) => res.data),
        addBuilding: (body: any) =>
            axios.post(`${API_URL}/buildings/register`, body)
                .then((res) => res.data),
        updateBuilding: (buildingId: string, body: any) =>
            axios.put(`${API_URL}/buildings/${buildingId}`, body)
                .then((res) => res.data),
        updateBuildingResources: (buildingId: string, body: any) =>
            axios.put(`${API_URL}/buildings/resources/${buildingId}`, body)
                .then((res) => res.data),
        deleteBuilding: (userId: string) =>
            axios.delete(`${API_URL}/buildings/${userId}`)
                .then((res) => res.data),
        deleteBuildingByUserId: (userId: string) =>
            axios.delete(`${API_URL}/buildings/user/${userId}`)
                .then((res) => res.data),
    },
    organization: {
        create: (body: any) =>
            axios.post(`${API_URL}/organization`, body)
                .then((res) => res.data),
        getByUserId: (userId: string) =>
            axios.get(`${API_URL}/organization/user/${userId}`)
                .then((res) => res.data),
        update: (id: string, body: any) =>
            axios.put(`${API_URL}/organization/${id}`, body)
                .then((res) => res.data),
        fetch: () =>
            axios.get(`${API_URL}/organization/all`)
                .then((res) => res.data),
        getById: (organizationId: string) =>
            axios.get(`${API_URL}/organization/${organizationId}`)
                .then((res) => res.data),
        updateResources: (organizationId: string) =>
            axios.put(`${API_URL}/organization/resources/${organizationId}`)
                .then((res) => res.data),
        deleteOrg: (id: string) =>
            axios.delete(`${API_URL}/organization/${id}`)
                .then((res) => res.data),
        deleteOrgByUserId: (id: string) =>
            axios.delete(`${API_URL}/organization/user/${id}`)
                .then((res) => res.data)
    },
    bills: {
        fetchBills: (buildingId: string) =>
            axios.get(`${API_URL}/bills/buildings/${buildingId}`)
                .then((res) => res.data),
        addBills: (buildingId: string, body: any) =>
            axios.post(`${API_URL}/bills/add/${buildingId}`, body)
                .then((res) => res.data),
        updateBills: (buildingId: string, body: any) =>
            axios.post(`${API_URL}/bills/update/${buildingId}`, body)
                .then((res) => res.data),
        getBills: () =>
            axios.get(`${API_URL}/bills`)
                .then((res) => res.data),
        getBillsAggregated: (userId: string) =>
            axios.get(`${API_URL}/bills/${userId}`)
                .then((res) => res.data),
        getBillsByOrganizationId: (organizationId: string) =>
            axios.get(`${API_URL}/bills/organization/${organizationId}`)
                .then((res) => res.data),
        getBillsByOrganizationIdAggregated: (organizationId: string) =>
            axios.get(`${API_URL}/bills/organization/aggregated/${organizationId}`)
                .then((res) => res.data),
        getBillsRenewable: (buildingId: string) =>
            axios.get(`${API_URL}/bills/renewable/${buildingId}`)
                .then((res) => res.data),
    },
    renewable: {
        fetchResources: (id: string) =>
            axios.get(`${API_URL}/renewable/${id}`)
                .then((res) => res.data),
        fetchResourcesByBuildingId: (id: string) =>
            axios.get(`${API_URL}/renewable/building/${id}`)
                .then((res) => res.data),
        fetchAll: () =>
            axios.get(`${API_URL}/renewable`)
                .then((res) => res.data),
        fetchResourcesByOrganizationId: (organizationId: string) =>
            axios.get(`${API_URL}/renewable/organization/${organizationId}`)
                .then((res) => res.data),
        updateResourcesBuildingsById: (renewableId: string, body: any) =>
            axios.put(`${API_URL}/renewable/${renewableId}`, body)
                .then((res) => res.data),
        updateResourcesBuildingsByBuildingId: (buildingId: string, body: any) =>
            axios.put(`${API_URL}/renewable/buildings/${buildingId}`, body)
                .then((res) => res.data),
        deleteResources: (id: string) =>
            axios.delete(`${API_URL}/renewable/${id}`)
                .then((res) => res.data),
        createResources: (body: string) =>
            axios.post(`${API_URL}/renewable`, body)
                .then((res) => res.data),
    },
};
