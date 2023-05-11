import { GithubOutlined } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkHover } from "../Components/CustomComponents";
import "./Vendor.less"
import api from "../api";
import { userPreference } from "../reducers/preference";
import { fetchOrganization } from "../reducers/organization";
import Header from "../Consumer/Header/Header";
import { setAllBuildings } from "../reducers/allOrganization";
import { useAppDispatch, useAppSelector } from "../hooks";
import { DefaultFooter, ProLayout } from "@ant-design/pro-components";
import { getWindowSize } from "../globalUtils";
import { defaultLogo } from "../Consumer/utils";
import { DefaultVendorRoute, defaultProps } from "./utils";
import { setAllUser } from "../reducers/allUsers";


const VendorRoutes = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user)
    const organization = useAppSelector((state) => state.organization.organization)
    const edited = organization !== null ? organization.type?.length : 0
    const icon = organization !== null ? organization.icon : ""
    const [bills, setBills] = useState<any>([])

    const dispatch = useAppDispatch()
    const fetchPreference = async () => {
        await api.preference.fetchPreference(user._id)
            .then(data => dispatch(userPreference(data)))
            .catch(e => console.log(e))
    }
    const getOrganization = async () => {
        await api.organization.getByUserId(user._id)
            .then(data => dispatch(fetchOrganization(data)))
            .catch(e => console.log(e))
    }
    const getBills = async () => {
        await api.bills.getBillsByOrganizationIdAggregated(organization._id)
            .then(res => setBills(res))
            .catch(e => console.log(e))
    }

    const getBuildings = async () => {
        console.log(organization)
        await api.buildings.getBuildingsByOrganizationId(organization._id).then((res) =>
            dispatch(setAllBuildings(res)))
            .catch(() => dispatch(setAllBuildings([])))
    }
    const fetchAllUser = async () => {
        await api.user.fetchAll().then(res => {
            dispatch(setAllUser(res))
        }).catch(e => console.log(e))
    }
    useEffect(() => {
        fetchAllUser()
        if (organization === null || organization === undefined) {
            getOrganization()
            fetchPreference()
            getBills()
            getBuildings()
        }
    }, [user, organization])



    if (organization === null) {
        fetchPreference()
        getOrganization()
    }

    const settings = { fixSiderbar: true, };
    const [pathname, setPathname] = useState('/Dashboard');
    return (
        <ProLayout
            logo={defaultLogo(navigate)}
            title="TrackER"
            {...defaultProps(organization, edited)}
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
            {getWindowSize() >= 768 && <Header avatar={icon} />}
            {DefaultVendorRoute(organization, icon, user, bills, navigate, setPathname)}
        </ProLayout >
    );
}

export default () => <VendorRoutes />
