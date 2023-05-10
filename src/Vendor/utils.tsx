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

export const defaultProps = (organization: Organization, edited: number | undefined) => ({
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
