import { SpinSize } from "antd/lib/spin"

export interface LoadingSpinnerProps {
    message?: string,
    size?: SpinSize
}

export interface EditAccountModalProps {
    visible: boolean
    setVisible: (visible: boolean) => void,
    user: any
}
export interface AccountActivity {
    user: any
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

export interface Organization {
    _id: string,
    name: string;
    description?: string;
    userId?: string;
    type?: Array<string>;
    icon?: string;
    customers?: Array<UserProps>;
    details?: any;
    createAt: Date;
}

export interface Building {
    _id: string,
    name: string;
    contact: string;
    userId?: string;
    organizationId?: string;
    address: string;
    type: string;
    sqft?: number;
    lat: string;
    long: string;
    resources?: Array<any>;
}

export interface Bills {
    buildingId?: string;
    organizationId?: string;
    bills?: Array<any>;
}

export interface Activity {
    userId?: string;
    country_code?: string;
    country_name?: string;
    city?: string;
    IPv4?: string;
    state?: string;
}