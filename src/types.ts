import { SpinSize } from "antd/lib/spin"
import { DefaultOptionType } from "rc-cascader"

export interface LoadingSpinnerProps {
    message?: string,
    size?: SpinSize
}

export interface EditAccountModalProps {
    visible: boolean
    setVisible: (visible: boolean) => void,
    user: UserProps
}
export interface AccountActivity {
    user: UserProps
}

export type BannerProps = {
    dataSource: any,
    isMobile: any
}

export interface GetItem {
    label: string,
    key: string,
    icon: JSX.Element
}

export interface Credentials {
    email: string,
    password: string
}

export interface UserApi {
    type: string,
    email: string,
    password: string,
    name: string,
    surname: string,
}

export interface UserProps {
    _id: string,
    name: string
    surname: string
    email: string
    password: string
    token: string
    type: string
}

export interface User {
    logged: boolean,
    user: UserProps
}

export interface UserPreference {
    userId: string;
    activityLog: boolean;
    notification: boolean;
    news: boolean;
    avatar: string;
}

export interface Renewable {
    organizationId: string;
    buildings: Array<any>;
    price: number;
    name: string;
    type: string;
    resourcesType: string;
    earning: number;
    organization: number;
}

export interface Customers {
    building: string
    user: string
}

export interface Organization {
    _id: string;
    name: string;
    description?: string;
    userId?: string;
    type: Array<string>;
    icon: string;
    customers?: Array<Customers>;
    details?: any;
    createAt: Date;
}

export interface Building {
    _id: string,
    name: string;
    contact: string;
    userId?: string;
    organizationId: string;
    address: string;
    type: string;
    sqft?: number;
    lat: string;
    long: string;
    resources: Array<any>;
    date: Date;
}

export interface Bills {
    buildingId?: string;
    organizationId?: string;
    bills?: Array<any>;
    totalElectric?: number
}

export interface Activity {
    userId?: string;
    country_code?: string;
    country_name?: string;
    city?: string;
    IPv4?: string;
    state?: string;
}

export type TimeStamp = "Weekly" | "Monthly" | "Yearly" | ""
export type EnergyType = "Solar" | "Hydro" | "Geo" | "Wind"

export interface BillsAggregated {
    totalElectric: number,
    totalGas: number,
    totalWater: number,
    result: Array<any>,
    aggregated: any
}

export interface Pages {
    cost: Array<any>
}

export interface Data {
    price: number,
    name: string,
    type: string,
    organization: number,
    earning: number,
    organizationId: string,
    resourcesType: any
    buildings?: Array<any>
}

export interface ResourcesModal {
    visible: boolean,
    setVisible: (arg: boolean) => void,
    data: Data,
    options: string[] | DefaultOptionType[] | undefined
}
export interface ElementName {
    name: string
}

export interface ResourcesCard {
    element: ElementName,
    onClick: (React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLButtonElement>) | undefined
}

export interface RenewableDetailsModal {
    filter: string,
    data: Data,
    setVisible: (arg: boolean) => void,
    visible: boolean
}

export interface Step1 {
    gas: boolean,
    setGas: (arg: boolean) => void,
    electric: boolean,
    setElectric: (arg: boolean) => void,
    water: boolean,
    setWater: (arg: boolean) => void,
    distributed: boolean,
    setDistributed: (arg: boolean) => void,
    setPrices: (arg: any) => void,
    prices: Array<any>,

}

export interface Step2 {
    name: string,
    setDescription: (arg: string) => void,
    setIcon: (arg: any) => void,
    description: string
}

export interface Step3 {
    name: string,
    owner: string,
    icon: any,
    createAt: Date,
    type: Array<string | boolean>,
    description: string,
    prices: Array<any>,
    setData: (arg: object) => void
}

export interface OrganizationCard {
    description: string,
    title: string,
    selected: boolean
}

export interface EditCard {
    data: any,
    type: string
}

export interface VendorCustomers {
    organization: Organization
}

export interface CarouselKpi {
    loading: boolean,
    gasSum: number,
    kWhSum: number,
    waterSum: number,
    gasCost: number,
    kWhCost: number,
    waterCost: number,
    sold: number,
    renewable: number
}

export interface CustomerModal {
    visible: boolean,
    user: UserProps,
    setVisible: (arg: boolean) => void
}

export interface CustomersBuildingTable {
    data: readonly Record<string, any>[] | undefined,
    columns: any,
    headerTitle?: React.ReactNode
}


export interface CustomerDrawer {
    visible: boolean,
    buildingId: string,
    setVisible: (arg: boolean) => void,
    showWater?: boolean,
    showElectric?: boolean,
    showGas?: boolean
}
