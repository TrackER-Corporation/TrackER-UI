import { NavigateFunction, Route, Routes } from "react-router-dom";
import IconFont from "../Iconfont";
import api from "../api";
import { Avatar, Col, Menu, Row } from "antd";
import { LinkHover } from "../Components/CustomComponents";
import { logout } from "../reducers/user";
import { AppDispatch } from "../store";
import { DefaultFooter, ProLayout } from "@ant-design/pro-components";
import { GithubOutlined } from "@ant-design/icons";
import { Building, Organization, UserProps } from "../types";
import Dashboard from "./Dashboard";
import BuildingsTab from "./Building/BuildingsTab";
import AddNewBuildings from "./Building/AddNewBuilding";
import Organizations from "./Organizations/Organizations";
import Account from "../Account/Account";
import Invoices from "./Invoices/Invoices";
import { MenuProps } from "antd/lib/menu";
import moment from "moment";
import { ApexOptions } from "apexcharts";

export const statebar = (type: string, color: any) => ({
    options: {
        noData: {
            text: "No data to show...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "blue",
                fontSize: '12px',
            }
        },
        title: {
            text: type,
            align: "center",
            offsetY: 10
        },
        style: {
            fontSize: '14px',
            fontWeight: '300',
            fontFamily: 'Manrope',
            fontVariant: "tabular-nums",
            fontFeatureSettings: "tnum",
            color: '#263238'
        },
        colors: [color],
        grid: { show: false },
        chart: {
            animations: {
                enabled: true,
                easing: "easein",
                dynamicAnimation: {
                    speed: 1000
                }
            },
            type: 'bar',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            labels: {
                show: false,
                formatter: function () {
                    return "";
                }
            },
            categories: [type, type, type],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            tooltip: {
                enabled: false,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
            }
        },
    },
});

export const stateradial = (color: string) => ({
    series: [40],
    options: {
        colors: [color, "#000000"],
        chart: {
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: "70%"
                },
                dataLabels: {
                    showOn: "always",
                    name: {
                        show: false,
                    },
                    value: {
                        color: "#111",
                        fontSize: "30px",
                        show: true
                    }
                }
            }
        },
    },
});

export const stackedOptions: ApexOptions = {
    noData: {
        text: "No data to show...",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
            color: "blue",
            fontSize: '12px',
        }
    },
    colors: ['#ffcf45', '#022cf7', '#00cbff', '#26f8c9'],
    grid: {
        show: false
    },
    chart: {
        type: 'bar',
        height: 360,
        stacked: true,
        stackType: '100%',
        toolbar: { show: false }
    },
    plotOptions: {
        bar: {
            horizontal: true,
        },
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    xaxis: {
        labels: {
            show: false
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
    },
    yaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            formatter: function () {
                return "";
            }
        }
    },
    tooltip: {
        y: {
            formatter: function (val: number) {
                return (val / 1000).toFixed(2) + "kW"
            }
        }
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: 'left',
        horizontalAlign: 'left',
        offsetY: 25,
        offsetX: -20
    }
}


export const linear = (text: string, unit: string, color: string) => ({
    options: {
        noData: {
            text: "No data to show...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "blue",
                fontSize: '12px',
            }
        },
        chart: {
            id: text,
            group: 'social',
        },
        colors: [color],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        title: {
            text: text,
            align: 'center'
        },
        xaxis: {
            type: 'datetime',
            tooltip: {
                enabled: false
            }

        },
        tooltip: {
            enabled: true,
            theme: "light",
            x: {
                show: true,
                format: "dd-MM-yyyy HH:mm"
            },
            y: {
                formatter: (val: any) => val + " " + unit
            }
        },
    }
});

export const invoices = {
    options: {
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {

            categories: [],
        }
    }
};

export const defaultProps = {
    route: {
        path: '/',
        routes: [
            {
                path: '/Dashboard',
                name: 'Dashboard',
                icon: <IconFont type="i-gaishuai" />,

            },
            {
                path: '/Buildings',
                name: 'Buildings',
                icon: <IconFont type="i-xiaoxi" />
            },
            {
                path: '/Building/New',
                name: 'Add new Building',
                icon: <IconFont type="i-fenlei" />
            },
            {
                path: '/Organizations',
                name: 'Organizations',
                icon: <IconFont type="i-dianpu" />
            },
            {
                path: '/Invoices',
                name: 'Invoices',
                icon: <IconFont type="i-riqi" />,
                routes: [
                    {
                        path: '/Invoices/Weekly',
                        name: 'Weekly',

                    },
                    {
                        path: '/Invoices/Monthly',
                        name: 'Monthly',

                    },
                    {
                        path: '/Invoices/Yearly',
                        name: 'Yearly',

                    },
                ],
            },
            {
                path: '/Profile',
                name: 'Profile',
                icon: <IconFont type="i-shouye" />,
                routes: [
                    {
                        path: '/Profile/Edit',
                        name: 'Personal Information',
                    },
                    {
                        path: '/Profile/Notification',
                        name: 'Notification',
                    },
                    {
                        path: '/Profile/Activity',
                        name: 'Activity Monitor',
                    },
                    {
                        path: '/Profile/Security',
                        name: 'Security Settings',
                    },
                    {
                        path: '/Profile/Password',
                        name: 'Change Password',
                    },
                ],
            },
        ],
    },
    location: {
        pathname: '/',
    },
};


export const defaultLogo = (navigate: NavigateFunction) =>
    <img
        onClick={() => navigate("/Dashboard")}
        src="https://res.cloudinary.com/dgfnyulqh/image/upload/v1658845429/nbnkxykkyymhethjdiek.jpg"
        alt="Tracker Logo"
    />

export const getBills = async (id: string, setBills: (arg: any) => void) => {
    if (id !== undefined && id !== "undefined") {
        await api.bills.getBillsAggregated(id).then(res => setBills(res)).catch(err => console.log(err))
    }
}

export const headerMenu = (type: string, dispatch: AppDispatch): MenuProps['items'] => {
    let addOn: any = {}
    if (type === "Buildings") {
        addOn = { type: "divider" },
        {
            key: '2',
            type: 'group',
            children: [
                {
                    key: '2-1',
                    label: (
                        <LinkHover to="/Building">View Building</LinkHover>
                    ),
                },
                {
                    key: '2-2',
                    label: (
                        <LinkHover to="/Organizations">View Organizations</LinkHover>
                    ),
                },
                {
                    key: '2-3',
                    label: (
                        <LinkHover to="/Invoices/Yearly">View Invoices</LinkHover>
                    ),
                }],
            label: <h3>Profile Actions</h3>
        }
    }

    return [{
        key: '1',
        type: 'group',
        children: [
            {
                key: '1-1',
                label: (
                    <LinkHover to="/Profile/Edit">View Profile</LinkHover>
                ),
            },
            {
                key: '1-2',
                label: (
                    <LinkHover to="/Profile/Security">Settings</LinkHover>
                ),
            },],
        label: <h3>Profile Settings</h3>
    },
        addOn,
    {
        type: "divider",
    },
    {
        key: '3',
        type: 'group',
        children: [
            {
                key: '3-1',
                label: (
                    <div onClick={() => dispatch(logout())}>Logout</div>
                ),
            }],
        label: <h3 >Exit Profile</h3>,
    },
    ]
}


export const DefaultRoute = (
    navigate: NavigateFunction,
    userAvatar: string,
    setPathname: (arg: string) => void,
    user: UserProps,
    allOrganization: Array<Organization>,
    allUser: Array<UserProps>
) =>
    <Routes >
        <Route path="*" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buildings" element={<BuildingsTab
            updateRoute={() => {
                setPathname("/building/New");
                navigate("/building/New")
            }} />} />
        <Route path="/building/New" element={<AddNewBuildings {...user} />} />
        <Route path="/Organizations"
            element={
                <Organizations
                    allOrganization={allOrganization}
                    allUser={allUser}
                />
            }
        />
        <Route path="/Invoices/Weekly" element={<Invoices user={user} />} />
        <Route path="/Invoices/Monthly" element={<Invoices user={user} />} />
        <Route path="/Invoices/Yearly" element={<Invoices user={user} />} />
        <Route path="/Profile/Edit"
            element={<Account avatar={userAvatar} user={user} updateRoute={(val: string) => {
                setPathname(val);
                navigate(val)
            }} />} />
        <Route path="/Profile/Notification"
            element={<Account avatar={userAvatar} user={user} updateRoute={(val: string) => {
                setPathname(val);
                navigate(val)
            }} />} />
        <Route path="/Profile/Activity" element={<Account avatar={userAvatar}
            user={user} updateRoute={(val: string) => {
                setPathname(val);
                navigate(val)
            }} />} />
        <Route path="/Profile/Security" element={<Account avatar={userAvatar} user={user}
            updateRoute={(val: string) => {
                setPathname(val);
                navigate(val)
            }} />} />
        <Route path="/Profile/Password" element={<Account avatar={userAvatar} user={user}
            updateRoute={(val: string) => {
                setPathname(val);
                navigate(val)
            }} />} />
    </Routes>

const settings = { fixSiderbar: true, };

export const MenuLayout = (
    navigate: NavigateFunction,
    pathname: string,
    userAvatar: string,
    setPathname: (arg: string) => void,
    user: UserProps,
    allOrganization: Array<Organization>,
    allUser: Array<UserProps>
) =>
    <ProLayout
        logo={defaultLogo(navigate)}
        title="TrackER"
        {...defaultProps}
        location={{ pathname }}
        navTheme="light"
        menu={{ defaultOpenAll: true }}
        waterMarkProps={{ content: 'TrackER', }}
        footerRender={() =>
            <DefaultFooter style={{ backgroundColor: "#f7fafd", }}
                copyright="2023 by TrackER All Rights Reserved"
                links={[
                    {
                        key: 'github',
                        title: <GithubOutlined />,
                        href: 'https://github.com/TrackER-Corporation',
                        blankTarget: true,
                    },]}
            />
        }
        menuFooterRender={(props: any) =>
            <Row
                justify="center"
                style={{ marginBottom: 20 }}
                gutter={[16, 16]}
            >
                <Col style={{ alignSelf: "center" }}>
                    <Avatar size={40} src={userAvatar} />
                </Col>
                {props?.collapsed &&
                    <Col style={{ alignSelf: "center", }}>
                        <div>{user.name} {user.surname} <br></br>
                            <LinkHover to="/Profile/Edit" >View Profile</LinkHover>
                        </div>
                    </Col>
                }
            </Row>
        }
        menuItemRender={(item: any, dom: any) => (
            <p onClick={() => {
                setPathname(item.path || '/Dashboard');
                navigate(item.path, { replace: true });
            }}>
                {dom}
            </p>
        )}
        {...settings}
    >
        {DefaultRoute(navigate, userAvatar, setPathname, user, allOrganization, allUser)}
    </ProLayout >


export const renderIcon = (building: Building) => {
    switch (building.type) {
        case "Residential":
            return <Row align="middle"> <IconFont type="i--house" /> {building.name}</Row>
        case "Factory":
            return <Row align="middle"><IconFont type="i-factory" /> {building.name} </Row >

        case "Skyscraper":
            return <Row align="middle"><IconFont type="i--skyline" /> {building.name} </Row >

        case "School":
            return <Row align="middle"><IconFont type="i-school" /> {building.name}</Row >

        case "University":
            return <Row align="middle"><IconFont type="i-university" /> {building.name} </Row >

        case "Hospital":
            return <Row align="middle"><IconFont type="i-ambulance" /> {building.name} </Row >

        case "Police Station":
            return <Row align="middle"><IconFont type="i-police" /> {building.name} </Row >

        case "Bank":
            return <Row align="middle"><IconFont type="i-bank" /> {building.name} </Row >

        case "Shopping Mall":
            return <Row align="middle"><IconFont type="i--shopping-mal" /> {building.name} </Row >

        case "Court":
            return <Row align="middle"><IconFont type="i-museum" /> {building.name} </Row >

        case "Airport":
            return <Row align="middle"><IconFont type="i-airport" /> {building.name} </Row >

        case "City Hall":
            return <Row align="middle"><IconFont type="i--orthodoxian" /> {building.name} </Row >
        default:
    }
}

export const fetchResources = async (
    id: string,
    oldId: string,
    setOldId: (arg: string) => void,
    setResourceApi: (arg: any) => void,
    setBills: (arg: any) => void,
) => {
    if (id === oldId) return
    setOldId(id)
    await api.renewable.fetchResourcesByBuildingId(id).then(res => setResourceApi([res]))
    await api.bills.getBillsRenewable(id).then(res => setBills(res))
}

interface EnergyBills {
    totalSolar: number;
    totalHydro: number;
    totalGeo: number;
    totalWind: number;
}


export const getTotal = (energySourceType: string | undefined, bills: EnergyBills): number => {
    if (energySourceType === undefined || energySourceType === "undefined") return 0;

    switch (energySourceType) {
        case "Solar":
            return bills.totalSolar / 1000;
        case "Hydro":
            return bills.totalHydro / 1000;
        case "Geo":
            return bills.totalGeo / 1000;
        case "Wind":
            return bills.totalWind / 1000;
        default:
            return 0;
    }
};

export const getIcon = (resources: any) => {
    if (resources.resourcesType === undefined || resources.resourcesType === "undefined")
        return
    if (resources.resourcesType.includes("Solar"))
        return (
            <Row justify="center" align="middle">
                <h3 style={{ margin: 0, marginRight: 20, fontWeight: 500 }}>{resources.name}</h3>
                <div >
                    <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe65f;</span>
                </div>
            </Row>)
    if (resources.resourcesType.includes("Wind"))
        return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe661;</span>
    if (resources.resourcesType.includes("Geo"))
        return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe64b;</span>
    if (resources.resourcesType.includes("Hydro"))
        return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe650;</span>
}

export const sortDate = (array: any) => {
    array.sort(function (a: any, b: any) {
        const keyA = new Date(a.x)
        const keyB = new Date(b.x)
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
}

export const getData = (data: any) => {
    if (data === undefined || Object.keys(data).length === 0) return []
    let series = []
    let electric: any = []
    let gas: any = []
    let water: any = []
    Object.values(data.aggregated).forEach((el: any) => {
        electric.push({
            x: el.date,
            y: el.electric === undefined ? null : el.electric
        })
        gas.push({
            x: el.date,
            y: el.gas === undefined ? null : el.gas
        })
        water.push({
            x: el.date,
            y: el.water === undefined ? null : el.water
        })
    })

    sortDate(electric)
    sortDate(water)
    sortDate(gas)

    electric = {
        type: 'area',
        name: "Electric",
        data: electric
    }
    gas = {
        type: 'area',
        name: "Gas",
        data: gas
    }
    water = {
        type: 'area',
        name: "Water",
        data: water
    }
    series = [
        electric,
        gas,
        water,
    ]
    return series
}


export const getBillsRenewable = async (
    id: string,
    buildings: Array<Building>,
    energy: any,
    setEnergy: (...props: any) => void,
    setTotalRen: (arg: number) => void
) => {
    await api.bills.getBillsRenewable(id).then(res => {
        const building = Object.values(buildings).find((el) => el._id === id);
        let sumSolar = 0;
        let sumWind = 0;
        let sumHydro = 0;
        let sumGeo = 0;

        if (building) {
            building.resources?.forEach((resource: any) => {
                const [type, _] = Object.entries(resource)[0];
                switch (type) {
                    case "Solar":
                        sumSolar += res.totalSolar;
                        break;
                    case "Hydro":
                        sumHydro += res.totalHydro;
                        break;
                    case "Wind":
                        sumWind += res.totalWind;
                        break;
                    case "Geo":
                        sumGeo += res.totalGeo;
                        break;
                    default:
                        break;
                }
            });
        }
        console.log(energy)

        setEnergy({
            ...energy,
            solar: { name: "Solar", data: [sumSolar] },
            wind: { name: "Wind", data: [sumWind] },
            hydro: { name: "Hydro", data: [sumHydro] },
            geo: { name: "Geo", data: [sumGeo] },
        });

        setTotalRen(sumSolar + sumGeo + sumHydro + sumWind);
    }).catch(err => console.log(err))
};


export const getBillsAggregated = async (
    userId: string,
    setBills: (arg: any) => void,
    energy: any,
    setEnergy: (...props: any) => void,
) => {
    const day = moment().subtract(31, 'days')
    await api.bills.getBillsAggregated(userId).then(res => {
        setBills(res);

        let oldMoment = moment("01/01/17", "MM/D/YYYY");
        const billDates = Object.values(res.aggregated).filter((el: any) =>
            moment(el.date).isBetween(day, undefined)
        );

        let water: number[] = [];
        let gas: number[] = [];
        let electric: number[] = [];
        let sumGas = 0;
        let sumWater = 0;
        let sumElectric = 0;

        billDates.forEach((el: any) => {
            if (moment(el.date).isSame(oldMoment, "day")) {
                sumWater += Number(el.water);
                sumElectric += Number(el.electric);
                sumGas += Number(el.gas);
            } else {
                water.push(Number(sumWater.toFixed(3)));
                electric.push(Number(sumElectric.toFixed(3)));
                gas.push(Number(sumGas.toFixed(3)));
                sumWater = Number(el.water);
                sumElectric = Number(el.electric);
                sumGas = Number(el.gas);
                oldMoment = el.date;
            }
        });

        water.shift();
        electric.shift();
        gas.shift();
        electric = electric.slice(-3);
        gas = gas.slice(-3);
        water = water.slice(-3);

        setEnergy({
            ...energy,
            water: { name: "Water", data: water },
            gas: { name: "Gas", data: gas },
            electric: { name: "Electric", data: electric },
        });
    }).catch(err => console.log(err))
};
