import { NavigateFunction, Route, Routes } from "react-router-dom";
import { Bills, Organization, UserProps } from "../types";
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
            <span className="anticon iconfontMedium3" style={{ color: "#1196db" }}>{props.icon}</span>
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