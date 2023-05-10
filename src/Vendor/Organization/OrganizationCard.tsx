import { Badge, Card, Col, Row } from "antd"
import "./Organization.css"
import { OrganizationCard } from "../../types"
const OrganizationCard = ({ description, title, selected = true }: OrganizationCard) => {
    return (
        <Badge.Ribbon text="Selected" style={{ visibility: selected ? "visible" : "hidden" }} >
            <Card className={selected ? "organizationClassActive" : "organizationClass"} style={{ minHeight: 310, textAlign: "center", justifyContent: "center" }} hoverable>
                <Row justify="center" style={{ paddingTop: "52px" }} className="test">
                    {title.includes("Gas") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe657;</span>}
                    {title.includes("Electric") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe61d;</span>}
                    {title.includes("Water") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe730;</span>}
                    {title.includes("Resources") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe927;</span>}
                </Row>
                <Row>

                    <Col span={24}>
                        <p className="title" style={{ marginTop: "22px", fontSize: "24px", height: "15px" }}>{title}</p>
                    </Col>
                    <Col span={24}>
                        <p className="description">{description}</p>
                    </Col>
                </Row>

            </Card>
        </Badge.Ribbon>
    )
}

export default OrganizationCard