import { Card, Carousel, Col, Divider, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { useNavigate } from "react-router-dom"
import CustomerDrawer from "../CustomerDrawer"
import CustomersBuildingTable from "../CustomersBuildingTable"
import { Pages } from "../../types"
import { useAppSelector } from "../../hooks"
import Wrapper from "./Wrapper"
import { columns, options, optionsBar, optionsLine } from "./utils"

const Gas = ({ bills, cost }: Pages) => {
    const navigate = useNavigate()
    const allBuildings = useAppSelector((state: any) => state.allOrganization.allBuildings)
    const [metricCubic, setMetric] = useState(true)
    const [buildingId, setBuildingId] = useState("")
    const [visible, setVisible] = useState(false)
    const [gasSum, setGasSum] = useState("0")
    const [allGas, setAllGas] = useState<any>([])
    const [allGasLine, setAllGasLine] = useState<any>([])
    const [labels, setLabels] = useState<any>([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [series, setSeries] = useState<any>([])

    useEffect(() => {
        setLabels([])
        setAllGas([])
        setGasSum("0")
        if (Object.keys(bills).length === 0)
            return
        setGasSum((bills.totalGas).toFixed(2))
        let earning = 0
        let costTot = 0
        cost.forEach((el: any) => {
            if (el.name === "Gas Cost at m³") {
                setTotalEarning(bills.totalGas * 0.0454249414 / 1000 * el.price)
                earning += bills.totalGas * 0.0454249414 / 1000 * el.price
            }
            if (el.name === "Supplier Gas Cost") {
                setSupplier(bills.result.length * el.price)
                earning += bills.result.length * el.price
            }
            if (el.name === "Gas Delivery Cost") {
                setDelivery(bills.result.length * el.price)
                costTot += bills.result.length * el.price
            }
            if (el.name === "Gas Tax Percentage") {
                setTotalTax(bills.totalGas * 0.0454249414 / 1000 * el.price / 100)
                costTot += bills.totalGas * 0.0454249414 / 1000 * el.price / 100
            }
        });

        setSeries({
            data: [
                {
                    x: 'Organization Earnings',
                    y: earning.toFixed(2),
                    fillColor: '#00E396'

                }, {
                    x: 'Organization Cost',
                    y: costTot.toFixed(2),
                    fillColor: "#d40000"
                }
            ]
        })
        const tmp: any = []
        Object.values(bills.aggregated).map((el: any) => {
            tmp.push([el.date, el.gas])
        })
        setAllGasLine([{ data: tmp }])
        bills.result.forEach((bill: any) => {
            let sum = 0
            bill.bills.forEach((singleBill: any) => {
                sum += singleBill.gas
            })
            setLabels((old: any) => [...old, allBuildings.find((el: any) => el._id === bill.buildingId).name])
            setAllGas((old: any) => [...old, parseFloat(Number(sum).toFixed(4))])
        })
    }, [bills, metricCubic])


    const getData = (data: any) => {
        if (data === undefined)
            return []
        return data.map((build: any) => allBuildings.find((el: any) => el._id === build.buildingId))
    }
    return (
        <Wrapper navigate={navigate} title="Gas Supplier Details" >
            <>
                <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                    <Row align="middle" gutter={[32, 32]} >
                        <Col md={6} sm={12}>
                            <Statistic title="Total Gas Usage" value={metricCubic ? Number(gasSum) * 0.0454249414 / 1000 : gasSum} suffix={metricCubic ? "Gas/m³" : "Gallon"} precision={2} />
                            <Row align="middle">
                                <span onClick={() => setMetric(!metricCubic)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} className="anticon iconfont">&#xe615;</span>
                                <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricCubic ? "Gas/m³" : "Gallon"}</p>
                            </Row>
                        </Col>
                        <Col md={6} sm={12} style={{ height: 90 }} >
                            <Statistic title="Total Energy Earning" value={totalEarning} suffix={"Euro (€)"} precision={2} />
                        </Col>
                        <Col md={6} sm={12} style={{ height: 90 }} >
                            <Statistic title="Total Delivery Cost" value={delivery} suffix={"Euro (€)"} precision={2} />
                        </Col>
                        <Col md={6} sm={12} style={{ height: 90 }} >
                            <Carousel autoplay dots={false} autoplaySpeed={3500}>
                                <Statistic title="Total Tax Cost" value={totalTaxCost.toFixed(2)} suffix={"Euro (€)"} precision={2} />
                                <Statistic title="Total Supplier Cost" value={supplier} suffix={"Euro (€)"} precision={2} />
                            </Carousel>
                        </Col>
                    </Row>
                    <Divider />

                    <Row style={{ marginTop: 32 }} justify="center" align="middle">
                        <Col span={24}>
                            <p style={{ fontSize: 18, fontWeight: 500 }}> Gas Usage</p>
                            <ReactApexChart options={optionsLine} series={allGasLine} type="line" height={320} />
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginTop: 32 }} justify="space-between" align="middle">
                        <Col md={10} sm={24} xs={24}>
                            <p style={{ fontSize: 18, fontWeight: 500 }}> Profit</p>
                            <ReactApexChart options={optionsBar} series={[series]} type="bar" height={250} />
                        </Col>
                        <Col md={12} sm={24} xs={24} >
                            <p style={{ fontSize: 18, fontWeight: 500 }}>Buildings Gas Usage</p>
                            <ReactApexChart options={options(labels, metricCubic, ["m³", "Gallon"])} series={allGas} type="polarArea" />
                        </Col>
                        <Col span={24} style={{ marginTop: 32 }}>
                            <CustomersBuildingTable
                                headerTitle="Organization Building Gas Overview"
                                columns={columns(setVisible, setBuildingId)}
                                data={getData(bills.result)} />
                        </Col>
                    </Row>
                </Card>
                <CustomerDrawer showElectric={false} showWater={false} visible={visible} setVisible={setVisible} buildingId={buildingId} />
            </>
        </Wrapper>
    )
}
export default Gas