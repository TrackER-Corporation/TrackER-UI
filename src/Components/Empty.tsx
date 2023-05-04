import { Empty as AntdEmpty } from "antd";

interface Empty {
    children?: React.ReactNode
    description?: string | React.ReactNode
}

const Empty = ({ children, description }: Empty) =>
    <AntdEmpty
        children={children}
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
            height: 150,
        }}
        description={description}
    />

export default Empty