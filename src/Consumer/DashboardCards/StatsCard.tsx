import { Col, Row } from "antd";

interface StatsCard {
    chart: JSX.Element,
    color?: string
}

const StatsCard = ({ chart, color = "#FFFFFF" }: StatsCard) =>
    <Col span={24} style={{ background: color, borderRadius: 10 }}>
        <Row align="middle" justify="center" style={{ width: "100%", }} gutter={[12, 12]}>
            <Col span={24}>{chart}</Col>
        </Row>
    </Col>

export default StatsCard