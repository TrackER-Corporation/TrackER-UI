import { Button, Card, Col, Row } from "antd"
import { ResourcesCard } from "../../types"
import IconFont from "../../Iconfont"

const ResourcesCard = ({ element, onClick }: ResourcesCard) =>
    <Card className={"organizationClass"} style={{ minHeight: 310, textAlign: "center", justifyContent: "center", cursor: "default" }} hoverable>
        <Row justify="center" style={{ paddingTop: "52px" }} className="test">
            {element.name.includes("Solar") && <IconFont className="anticon iconfontLarge" type="i-solar-panels" style={{ fontSize: "80px", color: "#1196db", }} />}
            {element.name.includes("Hydro") && <IconFont className="anticon iconfontLarge" type="i-hydro-power" style={{ fontSize: "80px", color: "#1196db", }} />}
            {element.name.includes("Geo") && <IconFont className="anticon iconfontLarge" type="i-ecology" style={{ fontSize: "80px", color: "#1196db", }} />}
            {element.name.includes("Wind") && <IconFont className="anticon iconfontLarge" type="i-turbine" style={{ fontSize: "80px", color: "#1196db", }} />}
            <Col span={24} style={{ marginTop: 22 }}>
                <p className={element.name} style={{ marginTop: "22px", fontSize: "24px", height: "15px" }}>
                    Check and create <b>{element.name}</b> Configuration
                </p>
            </Col>
        </Row>
        <Button onClick={onClick} type="primary" style={{ borderRadius: 20, marginTop: 36 }}>Add a configuration</Button>
    </Card>

export default ResourcesCard