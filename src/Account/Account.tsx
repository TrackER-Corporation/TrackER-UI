import { PageHeader, ProCard } from "@ant-design/pro-components"
import { Avatar, Breadcrumb, Col, Dropdown, Layout, Menu, Row, Space } from "antd"
import { useLocation, useNavigate } from "react-router-dom";
import AccountActivity from "./RightSide/AccountActivity";
import ChangePassword from "./RightSide/ChangePassword";
import InfoAccount from "./RightSide/InfoAccount";
import SecuritySettings from "./RightSide/SecuritySettings";
import { MoreOutlined } from '@ant-design/icons';
import { useState } from "react";
import AvatarDrawer from "./AvatarDrawer";
import AccountNotification from "./RightSide/AccountNotification";
import OrganizationDrawer from "./OrganizationDrawer";
import { GetItem } from "../types";
import { accountMenu, getItem } from "../globalUtils";

const Account = ({ updateRoute, user, avatar, socket }: any) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [visible, setVisible] = useState(false)

    const items: Array<GetItem> = [
        getItem('Personal Information', '/Profile/Edit', <span className="iconfont anticon ">&#x100e5;</span>,),
        getItem('Notification', '/Profile/Notification', <span className="iconfont anticon">&#x100d9;</span>),
        getItem('Activity Monitor', '/Profile/Activity', <span className="iconfont anticon">&#x100e1;</span>),
        getItem('Security Settings', '/Profile/Security', <span className="iconfont anticon">&#x100df;</span>),
        getItem('Change Password', '/Profile/Password', <span className="iconfont anticon">&#xe6a9;</span>),
    ];

    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Profile</Breadcrumb.Item>
                    <Breadcrumb.Item>{window.location.pathname.split("/")[2]}</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Profile"
                subTitle="Check your profile and customize your preferences"
                onBack={() => navigate("/Dashboard")}
            />
            <ProCard style={{ borderRadius: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
                <Row gutter={[16, 16]}>
                    <Col md={5} sm={24} xs={24}>
                        <Row justify="end">
                            <Dropdown menu={accountMenu(user, setVisible)}>
                                <MoreOutlined style={{ fontSize: 23, fontWeight: "bold" }} />
                            </Dropdown>
                        </Row>
                        <Col style={{ textAlign: "center" }}>
                            <Avatar src={avatar} size={120} />
                            <h2 style={{ marginTop: 22, marginBottom: 2 }}>{user.name} {user.surname}</h2>
                            <p>{user.email}</p>
                        </Col>
                        <Menu
                            onClick={(el) => updateRoute(el.key)}
                            mode="inline"
                            items={items}
                            defaultSelectedKeys={['/']}
                            selectedKeys={[location.pathname]}
                        />
                    </Col>
                    <Col md={1} sm={0}>
                        <Space direction="vertical" style={{ width: "100%" }} />
                    </Col>
                    <Col md={18} sm={24} >
                        {location.pathname === "/Profile/Edit" && <InfoAccount socket={socket} user={user} />}
                        {location.pathname === "/Profile/Notification" && <AccountNotification user={user} />}
                        {location.pathname === "/Profile/Activity" && <AccountActivity user={user} />}
                        {location.pathname === "/Profile/Security" && <SecuritySettings socket={socket} user={user} updateRoute={() => updateRoute("/Profile/Password")} />}
                        {location.pathname === "/Profile/Password" && <ChangePassword user={user} />}
                    </Col>
                </Row>
            </ProCard>
            {user.type === "Building" && <AvatarDrawer user={user} visible={visible} onClose={() => setVisible(false)} />}
            {user.type === "Vendor" && <OrganizationDrawer user={user} visible={visible} onClose={() => setVisible(false)} />}
        </Layout>
    )
}
export default Account