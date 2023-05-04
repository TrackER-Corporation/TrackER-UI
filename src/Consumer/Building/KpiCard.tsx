import { Card, Col, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import "./style.css"
import IconFont from "../../Iconfont"

const KpiCard = ({ bills, item }: any) => {
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
        if (bills === null || bills === undefined)
            return
        if (bills?.all?.length <= 0)
            return
        const buildingBills = bills?.all?.find((el: any) => el.buildingId === item._id)
        buildingBills !== undefined &&
            buildingBills.bills.map((el: any) => {
                setElectric((old) => old + el.electric)
                setWater((old) => old + el.water)
                setGas((old) => old + el.gas)
            })
    }, [bills])


    const getWindowSize = () => window.innerWidth

    const [width, setWindowSize] = useState(getWindowSize());
    const handleWindowResize = () => setWindowSize(getWindowSize());


    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Row align="top" gutter={[32, 32]} >
            <Col md={8} sm={24} xs={24} >
                <Card className="kpi" hoverable style={{ borderRadius: 20, }}>
                    <Row gutter={[32, 32]} justify={width <= 768 ? "center" : "space-between"} align="middle">
                        <Col md={6} sm={24} xs={24}>
                            <IconFont type="i-electricity"
                                style={{
                                    color: "#1196db",
                                    fontSize: "40px",
                                    width: "40px",
                                    height: "40px",
                                }}
                            />
                        </Col>
                        <Col md={18} sm={24} xs={24}>
                            <Statistic title={`Electricity Consumption`} value={metricElectric ? electric / 1000 : electric} suffix={metricElectric ? "Kilowatt (kW)" : "Watt"} precision={2} />
                        </Col>
                    </Row>
                    <Row align="middle" >
                        <IconFont type="i-arrow_up_down_circle" onClick={() => setMetricElectric(!metricElectric)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} />
                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricElectric ? "Kilowatt (kW)" : "Watt"}</p>
                    </Row>
                </Card>
            </Col>

            <Col md={8} sm={24} xs={24}>
                <Card className="kpi" hoverable style={{ borderRadius: 20, }}>
                    <Row gutter={[32, 32]} justify={width <= 768 ? "center" : "space-between"} align="middle">
                        <Col md={6} sm={24} xs={24}>
                            <IconFont type="i-water" style={{
                                color: "#1196db",
                                fontSize: "40px",
                                width: "40px",
                                height: "40px",
                            }} />
                        </Col>
                        <Col md={18} sm={24} xs={24}>
                            <Statistic title="Water Consumption" value={metricWater ? water * 0.0001666667 : water} suffix={metricWater ? "Liter/Hours (l/h)" : "Liter"} precision={2} />
                        </Col>
                    </Row>
                    <Row align="middle" >
                        <IconFont type="i-arrow_up_down_circle" onClick={() => setMetricWater(!metricWater)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} />
                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricWater ? "Liter/Hours (l/h)" : "Liter"}</p>
                    </Row>
                </Card>
            </Col>

            <Col md={8} sm={24} xs={24}>
                <Card className="kpi" hoverable style={{ borderRadius: 20, }}>
                    <Row gutter={[32, 32]} justify={width <= 768 ? "center" : "space-between"} align="middle">
                        <Col md={6} sm={24} xs={24}>
                            <IconFont type="i-fire-line" style={{
                                color: "#1196db",
                                fontSize: "40px",
                                width: "40px",
                                height: "40px",
                            }} />
                        </Col>
                        <Col md={18} sm={24} xs={24}>
                            <Statistic title={`Gas Consumption`} value={metricGas ? gas * 0.0454249414 / 1000 : gas} suffix={metricGas ? "Gas/m³" : "Gallon"} precision={2} />
                        </Col>
                    </Row>
                    <Row align="middle" >
                        <IconFont type="i-arrow_up_down_circle" onClick={() => setMetricGas(!metricGas)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} />
                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricGas ? "Gas/m³" : "Gallon"}</p>
                    </Row>
                </Card>
            </Col>
        </Row>
    )

}
export default KpiCard