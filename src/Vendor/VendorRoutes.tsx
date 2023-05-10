import { GithubOutlined } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LinkHover } from "../Components/CustomComponents";
import Account from "../Account/Account";
import "./Vendor.less"
import Dashboard from "./Dashboard";
import api from "../api";
import { userPreference } from "../reducers/preference";
import { fetchOrganization } from "../reducers/organization";
import CompleteOrganization from "./CompleteOrganization";
import Header from "../Consumer/Header/Header";
import Customers from "./Customers/Customers";
import EditPlan from "./Edit/EditPlan";
import Electric from "./Pages/Electric";
import Gas from "./Pages/Gas";
import Water from "./Pages/Water";
import Resources from "./Pages/Resources";
import { setAllBuildings } from "../reducers/allOrganization";
import { useAppDispatch, useAppSelector } from "../hooks";
import { DefaultFooter, ProLayout } from "@ant-design/pro-components";


const VendorRoutes = () => {
    let navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user)
    const organization = useAppSelector((state) => state.organization.organization)
    const edited = organization !== null ? organization?.type?.length : 0
    const icon = organization !== null ? organization.icon : ""
    const [bills, setBills] = useState<any>([])

    const dispatch = useAppDispatch()
    const fetchPreference = async () => {
        await api.preference.fetchPreference(user._id).then(data => dispatch(userPreference(data))).catch(e => console.log("Error"))
    }
    const getOrganization = async () => {
        await api.organization.getByUserId(user._id).then(data => dispatch(fetchOrganization(data))).catch(e => console.log("Error"))
    }
    const getBills = async () => {
        await api.bills.getBillsByOrganizationIdAggregated(organization._id).then(res => setBills(res)).catch(e => console.log("Error"))
    }

    const getBuildings = async () => {
        await api.buildings.getBuildingsByOrganizationId(organization._id).then((res) => dispatch(setAllBuildings(res))).catch(err => dispatch(setAllBuildings([])))
    }

    useEffect(() => {
        if (organization === null || organization === undefined)
            getOrganization()
        fetchPreference()
        getBills()
        getBuildings()
    }, [user])




    const url = window.location.pathname
    useEffect(() => {
        setPathname(url)
    }, [url])

    if (organization === null) {
        fetchPreference()
        getOrganization()
    }

    let defaultProps = {
        route: {
            path: '/',
            routes: [
                {
                    path: '/Dashboard',
                    name: 'Dashboard',
                    disabled: edited === 0,
                    icon: <span className="anticon iconfont">&#x100d9;</span>
                },
                organization !== null && organization?.type?.includes("Electric") && {
                    path: '/Electric',
                    name: 'Electric Supplier',
                    disabled: edited === 0,
                    icon: <span className="anticon iconfont">&#xe61d;</span>
                },
                organization !== null && organization?.type?.includes("Water") && {
                    path: '/Water',
                    name: 'Water Supplier',
                    disabled: edited === 0,
                    icon: <span className="anticon iconfont">&#xe730;</span>
                },
                organization !== null && organization?.type?.includes("Gas") && {
                    path: '/Gas',
                    name: 'Gas Supplier',
                    disabled: edited === 0,
                    icon: <span className="anticon iconfont">&#xe657;</span>
                },
                organization !== null && organization?.type?.includes("Distributed") && {
                    path: '/Resources',
                    name: 'Energy Resources',
                    disabled: edited === 0,
                    icon: <span className="anticon iconfont">&#xe927;</span>
                },
                {
                    path: '/Customers',
                    name: 'Customers',
                    disabled: edited === 0,
                    icon: <span className="anticon iconfont">&#x100e5;</span>
                },
                {
                    path: '/Edit',
                    name: 'Edit Plan',
                    disabled: edited === 0,
                    icon: <span className="anticon iconfont">&#x100e9;</span>
                },
                {
                    path: '/Profile',
                    name: 'Organization',
                    disabled: edited === 0,
                    icon: <span className="anticon iconfont" >&#x100da;</span>,
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
    };
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    const settings = { fixSiderbar: true, };
    const [pathname, setPathname] = useState('/Dashboard');
    return (
        <ProLayout
            logo={<img onClick={() => navigate("/Dashboard")} src="https://res.cloudinary.com/dgfnyulqh/image/upload/v1658845429/nbnkxykkyymhethjdiek.jpg" alt="Tracker Logo" />}
            title="TrackER"
            {...defaultProps}
            location={{ pathname, }}
            navTheme="light"
            menu={{ defaultOpenAll: edited !== 0 }}
            waterMarkProps={{ content: 'TrackER', }}
            headerRender={() => width >= 768 ? <Header avatar={icon} /> :
                <ProLayout
                    logo={<img onClick={() => navigate("/Dashboard")} src="https://res.cloudinary.com/dgfnyulqh/image/upload/v1658845429/nbnkxykkyymhethjdiek.jpg" alt="Tracker Logo" />}
                    title="TrackER"
                    {...defaultProps}
                    location={{ pathname, }}
                    navTheme="light"
                    menu={{ defaultOpenAll: edited !== 0 }}
                    waterMarkProps={{ content: 'TrackER', }}
                    footerRender={() =>
                        <DefaultFooter style={{ backgroundColor: "#f7fafd", }}
                            copyright="2022 by TrackER"
                            links={[
                                {
                                    key: 'github',
                                    title: <GithubOutlined />,
                                    href: 'https://github.com/DallasCorporation/TrackER',
                                    blankTarget: true,
                                },]}
                        />
                    }
                    menuFooterRender={(props: any) => {
                        return (
                            <Row
                                justify="center"
                                style={{ marginBottom: 20 }}
                                gutter={[16, 16]}
                            >
                                <Col style={{ alignSelf: "center" }}>
                                    <Avatar size={40} src={icon} />
                                </Col>
                                {!props?.collapsed &&
                                    <Col style={{ alignSelf: "center", }}>
                                        <div>{user.name} {user.surname} <br></br>
                                            <LinkHover to="/Profile/Edit" >View Profile</LinkHover>
                                        </div>
                                    </Col>
                                }
                            </Row>
                        );
                    }}
                    menuItemRender={(item: any, dom: any) => (
                        <p
                            onClick={() => {
                                setPathname(item.path || '/Dashboard');
                                navigate(item.path!, { replace: true });
                            }}
                        >
                            {dom}
                        </p>
                    )}
                    {...settings}
                >
                    {organization !== null && Object.keys(organization?.details).length === 0 ? <CompleteOrganization />
                        :
                        <Routes >
                            <Route path="*" element={<Dashboard  />} />
                            <Route path="/Dashboard" element={<Dashboard />} />
                            <Route path="/Electric" element={<Electric bills={bills} cost={organization.details.electric} />} />
                            <Route path="/Gas" element={<Gas  bills={bills} cost={organization.details.gas} />} />
                            <Route path="/Water" element={<Water  bills={bills} cost={organization.details.water} />} />
                            <Route path="/Resources" element={<Resources />} />
                            <Route path="/Customers" element={<Customers organization={organization} />} />
                            <Route path="/Edit" element={<EditPlan />} />
                            <Route path="/Profile/Edit" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
                            <Route path="/Profile/Notification" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
                            <Route path="/Profile/Activity" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
                            <Route path="/Profile/Security" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
                            <Route path="/Profile/Password" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
                        </Routes>
                    }
                </ProLayout >


            }
            footerRender={() =>
                <DefaultFooter style={{ backgroundColor: "#f7fafd", }}
                    copyright="2022 by TrackER"
                    links={[
                        {
                            key: 'github',
                            title: <GithubOutlined />,
                            href: 'https://github.com/DallasCorporation/TrackER',
                            blankTarget: true,
                        },]}
                />
            }
            menuFooterRender={(props: any) => {
                return (
                    <Row
                        justify="center"
                        style={{ marginBottom: 20 }}
                        gutter={[16, 16]}
                    >
                        <Col style={{ alignSelf: "center" }}>
                            <Avatar size={40} src={icon} />
                        </Col>
                        {!props?.collapsed &&
                            <Col style={{ alignSelf: "center", }}>
                                <div>{user.name} {user.surname} <br></br>
                                    <LinkHover to="/Profile/Edit" >View Profile</LinkHover>
                                </div>
                            </Col>
                        }
                    </Row>
                );
            }}
            menuItemRender={(item: any, dom: any) => (
                <p
                    onClick={() => {
                        setPathname(item.path || '/Dashboard');
                        navigate(item.path!, { replace: true });
                    }}
                >
                    {dom}
                </p>
            )}
            {...settings}
        >
            { organization !== null && Object.keys(organization?.details).length === 0 ? <CompleteOrganization />
                :
                <Routes >
                    <Route path="*" element={<Dashboard />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Electric" element={<Electric bills={bills} cost={organization?.details?.electric} />} />
                    <Route path="/Gas" element={<Gas bills={bills} cost={organization?.details?.gas} />} />
                    <Route path="/Water" element={<Water bills={bills} cost={organization?.details?.water} />} />
                    <Route path="/Resources" element={<Resources />} />
                    <Route path="/Customers" element={<Customers organization={organization}  />} />
                    <Route path="/Edit" element={<EditPlan />} />
                    <Route path="/Profile/Edit" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Notification" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Activity" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Security" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Password" element={<Account avatar={icon} user={user} updateRoute={(val: any) => { setPathname(val); navigate(val) }} />} />
                </Routes>
            }
        </ProLayout >
    );
}

export default () => <VendorRoutes />;
