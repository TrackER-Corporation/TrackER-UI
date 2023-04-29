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