import { useEffect } from "react";
import { useState } from 'react';
import { GithubOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { DefaultFooter, ProLayout } from '@ant-design/pro-components';
import Header from "./Header/Header";
import { Avatar, Col, Row } from "antd";
import { userPreference } from "../reducers/preference";
import { LinkHover } from "../Components/CustomComponents";
import { setAllOrganization } from "../reducers/allOrganization";
import { setAllUser } from "../reducers/allUsers";
import { useAppDispatch, useAppSelector } from "../hooks";
import { DefaultRoute, MenuLayout, defaultLogo, defaultProps } from "./utils";
import api from "../api";
import "./Dashboard.less"

const DashboardRoutes = () => {
    const [pathname, setPathname] = useState('/Dashboard');
    const [width, setWidth] = useState(window.innerWidth);

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const user = useAppSelector((state) => state.user.user)
    const preference = useAppSelector((state) => state.preference.preference)
    const allOrganization = useAppSelector((state) => state.allOrganization.organization)
    const allUser = useAppSelector((state) => state.allUser.user)
    const check = useAppSelector((state) => state.preference)

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

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        fetchOrganization()
        fetchPreference()
    }, [user])



    if (check === null) fetchPreference()

    useEffect(() => {
        setPathname(url)
    }, [url])


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
            headerRender={() =>
                width >= 768 ? <Header avatar={userAvatar} /> :
                    MenuLayout(navigate, pathname, userAvatar, setPathname, user, allOrganization, allUser)
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
                    {!props?.collapsed &&
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
    );
}

export default () => <DashboardRoutes />
