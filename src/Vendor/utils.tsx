import { NavigateFunction, Route, Routes } from "react-router-dom";
import { Bills, Building, Organization, UserProps } from "../types";
import Dashboard from "./Dashboard";
import Electric from "./Pages/Electric";
import Gas from "./Pages/Gas";
import Water from "./Pages/Water";
import Resources from "./Pages/Resources";
import Customers from "./Customers/Customers";
import EditPlan from "./Edit/EditPlan";
import Account from "../Account/Account";
import CompleteOrganization from "./CompleteOrganization";
import { Carousel, Col, Row, Statistic } from "antd";
import styled from "styled-components";
import IconFont from "../Iconfont";
import api from "../api";

export const defaultProps = (organization: Organization, edited: number | undefined) => ({
    route: {
        path: '/',
        routes: [
            {
                path: '/Dashboard',
                name: 'Dashboard',
                disabled: edited === 0,
                icon: <IconFont type="i-gaishuai" />
            },
            organization !== null && organization?.type?.includes("Electric") && {
                path: '/Electric',
                name: 'Electric Supplier',
                disabled: edited === 0,
                icon: <IconFont type="i-Energy" />
            },
            organization !== null && organization?.type?.includes("Water") && {
                path: '/Water',
                name: 'Water Supplier',
                disabled: edited === 0,
                icon: <IconFont type="i-water-flash-line" />
            },
            organization !== null && organization?.type?.includes("Gas") && {
                path: '/Gas',
                name: 'Gas Supplier',
                disabled: edited === 0,
                icon: <IconFont type="i-fire-line" />
            },
            organization !== null && organization?.type?.includes("Distributed") && {
                path: '/Resources',
                name: 'Energy Resources',
                disabled: edited === 0,
                icon: <IconFont type="i-a-EnergyResources" />
            },
            {
                path: '/Customers',
                name: 'Customers',
                disabled: edited === 0,
                icon: <IconFont type="i-shouye" />
            },
            {
                path: '/Edit',
                name: 'Edit Plan',
                disabled: edited === 0,
                icon: <IconFont type="i-bianxie" />
            },
            {
                path: '/Profile',
                name: 'Organization',
                disabled: edited === 0,
                icon: <IconFont type="i-fenlei" />,
                routes: [
                    {
                        path: '/Profile/Edit',
                        name: 'Personal Information',
                        disabled: edited === 0
                    },
                    {
                        path: '/Profile/Notification',
                        name: 'Notification',
                        disabled: edited === 0
                    },
                    {
                        path: '/Profile/Activity',
                        name: 'Activity Monitor',
                        disabled: edited === 0
                    },
                    {
                        path: '/Profile/Security',
                        name: 'Security Settings',
                        disabled: edited === 0
                    },
                    {
                        path: '/Profile/Password',
                        name: 'Change Password',
                        disabled: edited === 0
                    },
                ],
            },
        ],
    },
    location: {
        pathname: '/',
    },
});


export const DefaultVendorRoute = (
    organization: Organization,
    icon: string,
    user: UserProps,
    bills: Bills,
    navigate: NavigateFunction,
    setPathname: (arg: string) => void,

) =>
    Object.keys(organization).length === 0 ? <CompleteOrganization />
        :
        <Routes >
            <Route path="*" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Electric" element={<Electric bills={bills} cost={organization.details.electric} />} />
            <Route path="/Gas" element={<Gas bills={bills} cost={organization.details.gas} />} />
            <Route path="/Water" element={<Water bills={bills} cost={organization.details.water} />} />
            <Route path="/Resources" element={<Resources />} />
            <Route path="/Customers" element={<Customers organization={organization} />} />
            <Route path="/Edit" element={<EditPlan />} />
            <Route path="/Profile/Edit" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
            <Route path="/Profile/Notification" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
            <Route path="/Profile/Activity" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
            <Route path="/Profile/Security" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
            <Route path="/Profile/Password" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
        </Routes>

interface CarouselProps {
    icon: string,
    title: string,
    value: number,
}

export const renderCarouselCard = (
    loading: boolean,
    props: CarouselProps
) =>
    <Row justify="space-between" align="middle">
        <Col span={24} style={{ height: "200px", textAlign: "center", marginTop: 12 }}>
            <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>{props.title}</p>
            <IconFont type={props.icon} style={{ color: "#1196db", fontSize: 80, margin: 5 }} />
            <Statistic loading={loading} value={props.value} suffix="kW" precision={2} />
        </Col>
    </Row>

export const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background: grey;

  }
  > .slick-dots li.slick-active button {
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background: #1196db;
  }
`;


export const getBillsByOrganizationIdAggregated = async (
    organizationId: string,
    buildings: Array<Building>,
) =>
    await api.bills.getBillsByOrganizationIdAggregated(organizationId).then(res => {
        let solar = 0
        let geo = 0
        let wind = 0
        let hydro = 0
        res.result.map((bill: any) => {
            const filter = buildings.find((build) => build._id === bill.buildingId)
            if (filter)
                filter?.resources?.map((buildingResource: any) => {
                    bill.bills.map((bill: any) => {
                        bill.resources.map((resource: any) => {
                            if (Object.keys(resource)[0].includes("Solar") && Object.keys(buildingResource)[0].includes("Solar")) {
                                solar += Number(Object.values(resource))
                            }
                            if (Object.keys(resource)[0].includes("Wind") && Object.keys(buildingResource)[0].includes("Wind")) {
                                wind += Number(Object.values(resource))
                            }
                            if (Object.keys(resource)[0].includes("Hydro") && Object.keys(buildingResource)[0].includes("Hydro")) {
                                hydro += Number(Object.values(resource))
                            }
                            if (Object.keys(resource)[0].includes("Geo") && Object.keys(buildingResource)[0].includes("Geo")) {
                                geo += Number(Object.values(resource))
                            }
                        })
                    })
                })
        })
        return ({
            geo: geo / 1000,
            hydro: hydro / 1000,
            wind: wind / 1000,
            solar: solar / 1000,
        })
    }).catch(() => ({
        geo: 0,
        hydro: 0,
        wind: 0,
        solar: 0,
    }))


export const getBillsAggregated = async (
    id: string,
    organization: Organization,
    setkWh: (arg: number) => void,
    setkWhCost: (arg: number) => void,
    setGas: (arg: number) => void,
    setGasCost: (arg: number) => void,
    setWater: (arg: number) => void,
    setWaterCost: (arg: number) => void,
    setCost: (arg: number) => void,
    setSold: (arg: number) => void,
) => {
    if (id !== undefined && id !== "undefined"){
        await api.bills.getBillsAggregated(id).then(res => {
            const tmpCost: Record<string, number> = {};
    
            if (organization?.type?.includes("Electric")) {
                const electricDetails = organization.details.electric;
                const electricityCostAtKwh = electricDetails.find((el: any) => el.name === "Electricity Cost at kWh");
                const electricitySupplierCost = electricDetails.find((el: any) => el.name === "Electricity Supplier Cost");
                const electricityDeliveryCost = electricDetails.find((el: any) => el.name === "Electricity Delivery Cost");
                const electricityTaxPercentage = electricDetails.find((el: any) => el.name === "Electricity Tax Percentage");
    
                let kWh = res.totalElectric * 0.0833333 / 1000 * electricityCostAtKwh?.price;
                if (electricitySupplierCost) {
                    kWh += electricitySupplierCost.price;
                    tmpCost[electricitySupplierCost.name] = electricitySupplierCost.price;
                }
                if (electricityDeliveryCost) {
                    kWh += electricityDeliveryCost.price;
                    tmpCost[electricityDeliveryCost.name] = electricityDeliveryCost.price;
                }
                if (electricityTaxPercentage) {
                    kWh += (res.totalElectric * electricityTaxPercentage.price / 100);
                    tmpCost[electricityTaxPercentage.name] = electricityTaxPercentage.price;
                }
    
                setkWh(old => old + res.totalElectric);
                setkWhCost(old => old + Number(kWh));
            }
    
            if (organization?.type?.includes("Gas")) {
                const gasDetails = organization.details.gas;
                const gasCostAtM3 = gasDetails.find((el: any) => el.name === "Gas Cost at m³");
                const supplierGasCost = gasDetails.find((el: any) => el.name === "Supplier Gas Cost");
                const gasDeliveryCost = gasDetails.find((el: any) => el.name === "Gas Delivery Cost");
                const gasTaxPercentage = gasDetails.find((el: any) => el.name === "Gas Tax Percentage");
    
                let gas = res.totalGas * 0.0454249414 / 1000 * gasCostAtM3?.price;
                if (supplierGasCost) {
                    gas += supplierGasCost.price;
                    tmpCost[supplierGasCost.name] = supplierGasCost.price;
                }
                if (gasDeliveryCost) {
                    gas += gasDeliveryCost.price;
                    tmpCost[gasDeliveryCost.name] = gasDeliveryCost.price;
                }
                if (gasTaxPercentage) {
                    gas += (res.totalGas * gasTaxPercentage.price / 100);
                    tmpCost[gasTaxPercentage.name] = gasTaxPercentage.price;
                }
    
                setGas(old => old + res.totalGas);
                setGasCost(old => old + Number(gas));
            }
    
            if (organization?.type?.includes("Water")) {
                const waterDetails = organization.details.water;
                const waterCostAtM3 = waterDetails.find((el: any) => el.name === "Water Cost at m³");
                const waterSupplierCost = waterDetails.find((el: any) => el.name === "Water Supplier Cost");
                const waterDeliveryCost = waterDetails.find((el: any) => el.name === "Water Delivery Cost");
                const waterTaxPercentage = waterDetails.find((el: any) => el.name === "Water Tax Percentage");
    
                let water = res.totalWater * 0.0001666667 * waterCostAtM3?.price;
                if (waterSupplierCost) {
                    water += waterSupplierCost.price;
                    tmpCost[waterSupplierCost.name] = waterSupplierCost.price;
                }
                if (waterDeliveryCost) {
                    water += waterDeliveryCost.price;
                    tmpCost[waterDeliveryCost.name] = waterDeliveryCost.price;
                }
                if (waterTaxPercentage) {
                    water += (res.totalWater * waterTaxPercentage.price / 100);
                    tmpCost[waterTaxPercentage.name] = waterTaxPercentage.price;
                }
                setWater(old => old + res.totalWater);
                setWaterCost(old => old + Number(water));
            }
    
            setCost(tmpCost);
        });
    }
    await api.renewable.fetchResourcesByOrganizationId(organization._id).then(res => {
        let sum = 0
        res.map((el: any) => sum += el.buildings.length)
        setSold(sum)
    })
}
