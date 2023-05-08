import { Card, Col, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import "./style.css"
import IconFont from "../../Iconfont"
import { getWindowSize } from "../../globalUtils"
import { Building } from "../../types"

const renderKpi = (
    value: number,
    changeMetric: boolean,
    setMetric: (arg: boolean) => void,
    iconName: string,
    options: { title: string, first: string, second: string },
    multiplier: number
) =>
    <Col md={8} sm={24} xs={24} >
        <Card className="kpi" hoverable style={{ borderRadius: 20, }}>
            <Row gutter={[32, 32]}
                justify={getWindowSize() <= 768 ? "center" : "space-between"}
                align="middle"
            >
                <Col md={6} sm={24} xs={24}>
                    <IconFont
                        type={iconName}
                        style={{
                            color: "#1196db",
                            fontSize: "40px",
                            width: "40px",
                            height: "40px",
                        }}
                    />
                </Col>
                <Col md={18} sm={24} xs={24}>
                    <Statistic title={options.title}
                        value={changeMetric ? value * multiplier : value}
                        suffix={changeMetric ? options.first : options.second}
                        precision={2}
                    />
                </Col>
            </Row>
            <Row align="middle" >
                <IconFont
                    data-testid={options.title}
                    type="i-arrow_up_down_circle"
                    onClick={() => setMetric(!changeMetric)}
                    style={{ color: "blue", marginRight: 6, cursor: "pointer" }}
                />
                <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>
                    {!changeMetric ? options.first : options.second}
                </p>
            </Row>
        </Card>
    </Col>

interface KpiCardProps {
    item: Building,
    bills: any
}

const KpiCard = ({ bills, item }: KpiCardProps) => {
    const [metricGas, setMetricGas] = useState(false)
    const [metricWater, setMetricWater] = useState(false)
    const [metricElectric, setMetricElectric] = useState(false)
    const [electric, setElectric] = useState(0)
    const [gas, setGas] = useState(0)
    const [water, setWater] = useState(0)

    useEffect(() => {
        setElectric(0)
        setGas(0)
        setWater(0)
        if (bills === null || bills === undefined) return
        if (bills?.all?.length <= 0) return
        const buildingBills = bills?.all?.find((el: any) => el.buildingId === item._id)
        buildingBills !== undefined &&
            buildingBills.bills.map((el: any) => {
                setElectric((old) => old + el.electric)
                setWater((old) => old + el.water)
                setGas((old) => old + el.gas)
            })
    }, [bills])

    return (
        <Row align="top" gutter={[32, 32]} >
            {renderKpi(
                electric,
                metricElectric,
                setMetricElectric,
                "i-electricity",
                {
                    title: "Electricity Consumption",
                    first: "Kilowatt (kW)",
                    second: "Watt"
                },
                0.001
            )}
            {renderKpi(
                water,
                metricWater,
                setMetricWater,
                "i-water",
                {
                    title: "Water Consumption",
                    first: "Liter/Hours (l/h)",
                    second: "Liter"
                },
                0.0001666667
            )}
            {renderKpi(
                gas,
                metricGas,
                setMetricGas,
                "i-fire-line",
                {
                    title: "Gas Consumption",
                    first: "Gas/m³",
                    second: "Gallon"
                },
                0.0000454249414
            )}
        </Row>
    )

}
export default KpiCard