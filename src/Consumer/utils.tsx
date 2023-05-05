import { NavigateFunction } from "react-router-dom";
import IconFont from "../Iconfont";
import api from "../api";
import { Menu } from "antd";
import { LinkHover } from "../Components/CustomComponents";
import { logout } from "../reducers/user";
import { AppDispatch } from "../store";

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

export const stacked = {
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
};


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
    await api.bills.getBillsAggregated(id).then(res => setBills(res))
}

export const headerMenu = (type: string, dispatch: AppDispatch) => {
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

    return (
        <Menu
            style={{ borderRadius: 10 }}
            items={[
                {
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
            ]}
        />)
}
