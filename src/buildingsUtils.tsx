import { message } from "antd";
import api from "./api";
import { fetchBuildings } from "./reducers/buildings";
import { UserProps } from "./types";
import { AppDispatch } from "./store";

export const onSelect = (
    value: string,
    options: any,
    setAddress: (arg: string) => void,
    setLat: (arg: number) => void,
    setLon: (arg: number) => void,
) => {
    setAddress(value)
    const res = options.filter((el: any) => el.value === value)[0].props
    setLat(res.lat)
    setLon(res.lon)
};

export const handleCoords = async (address: string, setOptions: (arg: any) => void) => {
    const requestOptions = {
        method: 'GET',
    };
    await fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=811f21d574e34738a95aca463b9dfd74`, requestOptions)
        .then(response => response.json())
        .then(({ results }) => {
            const tmp = results.map((element: any) => ({
                label: element.formatted,
                value: element.formatted,
                key: element.place_id,
                props: element
            }))
            setOptions(tmp)
        })
        .catch(error => console.log('error', error));
}

export const addBuilding = async (
    name: string,
    contact: string,
    address: string,
    sqft: string,
    type: string,
    lat: number,
    long: number,
    organizationId: Array<any>,
    user: UserProps,
    setShow: (arg: boolean) => void,
    dispatch: AppDispatch
) => {
    if (name === "" || contact === "" || address === "" || sqft === "" || type === "" || organizationId.length === 0)
        message.error("Fill the form to submit a building")
    const data = {
        name,
        contact,
        userId: user._id,
        address,
        sqft,
        type,
        lat,
        long,
        organizationId: organizationId
    }
    setShow(true)
    await api.buildings.addBuilding(data).then(async () => {
        setTimeout(() => {
            setShow(false)
            message.success("Building created!")
        }, 1000);
    }).catch(() => {
        setTimeout(() => {
            setShow(false)
            message.error("Building not created!")
        }, 1000);
    })
    await api.buildings.fetchBuildings(user._id).then((res) => {
        dispatch(fetchBuildings(res))
    })
}