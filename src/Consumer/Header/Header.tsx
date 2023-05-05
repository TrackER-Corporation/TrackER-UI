import { Col, Dropdown, Row, Space } from "antd";
import { AvatarHover } from "../../Components/CustomComponents";
import { useAppDispatch, useAppSelector } from "../../hooks";
import IconFont from "../../Iconfont";
import { headerMenu } from "../utils";

const Header = ({ avatar }: any) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.user)
    const type = user.type

    return (
        <Row justify="center" style={{ marginTop: "15px", }}>
            <Row style={{ fontWeight: 500, width: "95%", backgroundColor: "white", borderRadius: "10px", paddingRight: 30, paddingLeft: 30, height: 50 }} align="middle" justify="space-between">
                <Row align="middle">
                    <Col style={{ borderRadius: 10, height: 40, width: 40, background: "#ebfafa", textAlign: "center", marginRight: 5 }}>
                        <IconFont type="i-zixun" style={{ color: "blue", verticalAlign: "baseline" }} />
                    </Col>
                    <Col>
                        <p style={{ height: "32px" }}> Do you know the latest update of our 2023? 🎉 </p>
                    </Col>
                    <Col>
                        <p style={{ color: "#fea5b1", height: "32px", marginLeft: 5 }}>Check our program for 2022.</p>
                    </Col>
                </Row>
                <Space>
                    <Dropdown menu={headerMenu(type, dispatch) as any} placement="bottomRight" overlayStyle={{ borderRadius: 10 }}>
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