import { Badge, Card, Col, Row } from "antd"
import { OrganizationCard } from "../../types"
import "./Organization.css"
import IconFont from "../../Iconfont"

const OrganizationCard = ({ description, title, selected = true }: OrganizationCard) =>
    <Badge.Ribbon text="Selected" style={{ visibility: selected ? "visible" : "hidden" }} >
        <Card className={selected ? "organizationClassActive" : "organizationClass"} style={{ minHeight: 310, textAlign: "center", justifyContent: "center" }} hoverable>
            <Row justify="center" style={{ paddingTop: "52px" }} className="test">
                {title.includes("Gas") && <IconFont type="i-fire-line" />}
                {title.includes("Electric") && <IconFont type="i-fire-line" />}
                {title.includes("Water") && <IconFont type="i-fire-line" />}
                {title.includes("Resources") && <IconFont type="i-fire-line" />}
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

export default OrganizationCard