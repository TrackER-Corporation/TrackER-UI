import { useEffect } from "react";
import { GithubOutlined, } from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard'
import Account from '../Account/Account';
import BuildingsTab from './Building/BuildingsTab';
import { DefaultFooter, ProLayout } from '@ant-design/pro-components';
import Header from "./Header/Header";
import AddNewBuildings from "./Building/AddNewBuilding";
import { Avatar, Col, Row } from "antd";
import { userPreference } from "../reducers/preference";
import api from "../api";
import { LinkHover } from "../Components/CustomComponents";
import { setAllOrganization } from "../reducers/allOrganization";
import Organizations from "./Organizations/Organizations";
import { setAllUser } from "../reducers/allUsers";
import Invoices from "./Invoices/Invoices";
import { useAppDispatch, useAppSelector } from "../hooks";
import { defaultLogo, defaultProps } from "./utils";
import "./Dashboard.less"

const DashboardRoutes = () => {
    const user = useAppSelector((state) => state.user.user)
    const [pathname, setPathname] = useState('/Dashboard');
    const [width, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const preference = useAppSelector((state) => state.preference.preference)
    const allOrganization = useAppSelector((state) => state.allOrganization.organization)
    const allUser = useAppSelector((state) => state.allUser.user)
    const userAvatar = preference !== null ? preference.avatar : ""
    const settings = { fixSiderbar: true, };
    const url = window.location.pathname

    const fetchPreference = async () => {
        await api.preference.fetchPreference(user._id).then(data => dispatch(userPreference(data)))
    }

    const fetchOrganization = async () => {
        await api.organization.fetch().then(res => {
            dispatch(setAllOrganization(res))
        })
        await api.user.fetchAll().then(res => {
            dispatch(setAllUser(res))
        })
    }

    useEffect(() => {
        fetchOrganization()
        fetchPreference()
    }, [user])

    const check = useAppSelector((state) => state.preference)
    if (check === null)
        fetchPreference()

    useEffect(() => {
        setPathname(url)
    }, [url])

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            console.log(width)
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (
        <ProLayout
            logo={defaultLogo(navigate)}
            title="TrackER"
            {...defaultProps}
            location={{ pathname }}
            navTheme="light"
            menu={{ defaultOpenAll: true }}
            waterMarkProps={{ content: 'TrackER', }}
            headerRender={() => width >= 768 ? <Header avatar={userAvatar} /> :
                <ProLayout
                    logo={defaultLogo(navigate)}
                    title="TrackER"
                    {...defaultProps}
                    location={{ pathname, }}
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
                    menuFooterRender={(props: any) => {
                        return (
                            <Row
                                justify="center"
                                style={{ marginBottom: 20 }}
                                gutter={[16, 16]}
                            >
                                <Col style={{ alignSelf: "center" }}>
                                    <Avatar size={40} src={userAvatar} />
                                </Col>
                                {!props.collapsed &&
                                    <Col style={{ alignSelf: "center", }}>
                                        <div>{user.name} {user.surname} <br></br>
                                            <LinkHover to="/Profile/Edit" >View Profile</LinkHover>
                                        </div>
                                    </Col>
                                }
                            </Row>
                        );
                    }}
                    menuItemRender={(item: any, dom) => (
                        <p
                            onClick={() => {
                                setPathname(item.path || '/Dashboard');
                                navigate(item.path, { replace: true });
                            }}
                        >
                            {dom}
                        </p>
                    )}
                    {...settings}
                >
                    <Routes >
                        <Route path="*" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/buildings" element={<BuildingsTab
                            updateRoute={() => {
                                setPathname("/building/New");
                                navigate("/building/New")
                            }} />} />
                        <Route path="/building/New" element={<AddNewBuildings {...user} />} />
                        <Route path="/Organizations" element={<Organizations user={user}
                            allOrganization={allOrganization}
                            allUser={allUser} />}
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
                </ProLayout >
            }
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
                    {!props.hide &&
                        <Col style={{ alignSelf: "center", }}>
                            <div>{user.name} {user.surname} <br></br>
                                <LinkHover to="/Profile/Edit" >View Profile</LinkHover>
                            </div>
                        </Col>
                    }
                </Row>
            }
            menuItemRender={(item: any, dom) => (
                <p
                    onClick={() => {
                        setPathname(item.path || '/Dashboard');
                        navigate(item.path, { replace: true });
                    }}
                >
                    {dom}
                </p>
            )}
            {...settings}
        >
            <Routes >
                <Route path="*" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/buildings"
                    element={<BuildingsTab
                        updateRoute={() => { setPathname("/building/New"); navigate("/building/New") }}
                    />} />
                <Route path="/building/New" element={<AddNewBuildings {...user} />} />
                <Route path="/Organizations" element={<Organizations user={user} allOrganization={allOrganization} allUser={allUser} />} />
                <Route path="/Invoices/Weekly" element={<Invoices user={user} />} />
                <Route path="/Invoices/Monthly" element={<Invoices user={user} />} />
                <Route path="/Invoices/Yearly" element={<Invoices user={user} />} />
                <Route path="/Profile/Edit" element={<Account avatar={userAvatar} user={user} updateRoute={(val: string) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Notification" element={<Account avatar={userAvatar} user={user} updateRoute={(val: string) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Activity" element={<Account avatar={userAvatar} user={user} updateRoute={(val: string) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Security" element={<Account avatar={userAvatar} user={user} updateRoute={(val: string) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Password" element={<Account avatar={userAvatar} user={user} updateRoute={(val: string) => { setPathname(val); navigate(val) }} />} />
            </Routes>
        </ProLayout >
    );
}

export default () => <DashboardRoutes />
