import { Card, Col, Row, Statistic } from "antd"
import { useState } from "react";

interface DataType {
    name: string
    price: number | string
}

interface TypeCard {
    title?: string
    data?: Array<DataType>
}

const TypeCard = ({ title, data }: TypeCard) => {
    const [load, setLoad] = useState(true)

    setTimeout(() => {
        setLoad(false)
    }, 1000);

    return (
        <Card style={{
            borderRadius: 20,
            boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)"
        }}>

            <Row gutter={[32, 16]}>
                <Col span={24}>
                    <p style={{
                        overflow: "hidden",
                        color: "rgba(0, 0, 0, 0.85)",
                        fontWeight: "bold",
                        fontSize: "20px",
                        lineHeight: 1.5715,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: 0
                    }}>{title}</p>
                </Col>

                {data?.map(el =>
                    <Col span={12}>
                        <Statistic suffix="€" title={el.name} value={el.price} loading={load} />
                    </Col>
                )}
            </Row>
        </Card>
    )
}
export default TypeCard