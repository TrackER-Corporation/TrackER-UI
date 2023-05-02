import axios from "axios";

const API_URL = "http://localhost:3000/api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    user: {
        login: (credentials: any) =>
            axios.post(`${API_URL}/user/login`, { ...credentials })
                .then((res) => res.data),
        signUp: (user: any) =>
            axios.post(`${API_URL}/user/register`, { ...user })
                .then((res) => res.data),
        confirm: (token: any) =>
            axios.post(`${API_URL}/user/confirmation`, { token })
                .then((res) => res),
        get: (id: string) =>
            axios.get(`${API_URL}/user/${id}`)
                .then((res) => res.data),
        update: (id: string, data: any) =>
            axios.put(`${API_URL}/user/${id}`, data),
        updatePassword: (id: string, data: any) =>
            axios.put(`${API_URL}/user/password/${id}`, data),
        delete: (id: string) => {
            axios
                .delete(`${API_URL}/user/${id}`).then(res => res.data)
        },
        fetchAll: () =>
            axios.get(`${API_URL}/user/all`)
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
        fetchBuildings: (userId: string) =>
            axios.get(`${API_URL}/building/${userId}`) // to review
                .then((res) => res.data),
        addBuilding: (body: any) =>
            axios.post(`${API_URL}/building/register`, body)
                .then((res) => res.data),
        updateBuilding: (buildingId: string, body: any) =>
            axios.put(`${API_URL}/building/${buildingId}`, body)
                .then((res) => res.data),
        updateBuildingResources: (buildingId: string, body: any) =>
            axios.put(`${API_URL}/building/resources/${buildingId}`, body)
                .then((res) => res.data),
        deleteBuilding: (userId: string) =>
            axios.delete(`${API_URL}/building/${userId}`)
                .then((res) => res.data),
        getBuilding: (id: string) =>
            axios.get(`${API_URL}/building/${id}`) // to review
                .then((res) => res.data),
        getBuildingsByOrganizationId: (organizationId: string) =>
            axios.get(`${API_URL}/building/organization/${organizationId}`)
                .then((res) => res.data),
        getBuilding: () =>
            axios.get(`${API_URL}/building`)
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
