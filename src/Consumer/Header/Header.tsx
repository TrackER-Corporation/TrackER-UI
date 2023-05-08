import { Col, Dropdown, Row, Space } from "antd";
import { AvatarHover } from "../../Components/CustomComponents";
import { useAppDispatch, useAppSelector } from "../../hooks";
import IconFont from "../../Iconfont";
import { headerMenu } from "../utils";

interface Header {
    avatar: string
}

const Header = ({ avatar }: Header) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.user)
    const type = user.type
    const items = headerMenu(type, dispatch)

    return (
        <Row justify="center" style={{ marginTop: "15px" }}>
            <Row style={{
                fontWeight: 500,
                width: "95%",
                backgroundColor: "white",
                borderRadius: "10px",
                paddingRight: 30,
                paddingLeft: 30,
                height: 50,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}
                align="middle"
                justify="space-between">
                <Row align="middle">
                    <Col style={{ borderRadius: 10, height: 32, width: 32, background: "#ebfafa", textAlign: "center", marginRight: 5 }}>
                        <IconFont type="i-zixun" style={{ color: "blue", verticalAlign: "baseline", fontSize: 27 }} />
                    </Col>
                    <p style={{ margin: 0 }}>Do you know the latest update of our 2023? 🎉 </p>
                    <p style={{ color: "#fea5b1", margin: 0, marginLeft: 5 }}>Check our program for 2022.</p>
                </Row>
                <Space>
                    <Dropdown
                        menu={{ items }}
                        placement="bottomRight"
                        overlayStyle={{ borderRadius: 10 }}
                    >
                        <Row justify="space-between" align="middle" >
                            <p style={{ color: "blue", margin: 0, marginRight: 6 }}>{user.name} {user.surname}</p>
                            <AvatarHover size={"default"} src={avatar} />
                        </Row>
                    </Dropdown>
                </Space>
            </Row>
        </Row>
    )
}

export default Header