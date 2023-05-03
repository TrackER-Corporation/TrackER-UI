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