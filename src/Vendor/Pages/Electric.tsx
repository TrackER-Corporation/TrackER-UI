import { Card, Carousel, Col, Divider, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { useNavigate } from "react-router-dom"
import CustomerDrawer from "../CustomerDrawer"
import CustomersBuildingTable from "../CustomersBuildingTable"
import { ApexOptions } from "apexcharts"
import { BillsAggregated, Pages } from "../../types"
import { useAppSelector } from "../../hooks"
import Wrapper from "./Wrapper"
import { columns, options, optionsBar, optionsLine } from "./utils"
import api from "../../api"
import { sortDate } from "../../Consumer/utils"
import IconFont from "../../Iconfont"

const Electric = ({ cost }: Pages) => {
    const navigate = useNavigate()
    const allBuildings = useAppSelector((state) => state.allOrganization.allBuildings)
    const organization = useAppSelector((state) => state.organization.organization)
    const [metricCubic, setMetric] = useState(true)
    const [buildingId, setBuildingId] = useState("")
    const [visible, setVisible] = useState(false)
    const [electricSum, setElectricSum] = useState("0")
    const [allElectric, setAllElectric] = useState<any>([])
    const [allElectricLine, setAllElectricLine] = useState<any>([])
    const [labels, setLabels] = useState<any>([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [series, setSeries] = useState<any>([])
    const [resultBills, setResultBills] = useState<BillsAggregated | any>([])


    const getBills = async () => {
        await api.bills.getBillsByOrganizationIdAggregated(organization._id)
            .then((bills: BillsAggregated) => {
                setResultBills(bills)
                setElectricSum(bills.totalElectric.toString())
                let earning = 0
                let costTot = 0
                cost.forEach((el) => {
                    if (el.name === "Electricity Cost at kWh") {
                        setTotalEarning(bills.totalElectric * 0.0833333 / 1000 * el.price)
                        earning += bills.totalElectric * 0.0833333 / 1000 * el.price
                    }
                    if (el.name === "Electricity Supplier Cost") {
                        setSupplier(bills.result.length * el.price)
                        earning += bills.result.length * el.price
                    }
                    if (el.name === "Electricity Delivery Cost") {
                        setDelivery(bills.result.length * el.price)
                        costTot += bills.result.length * el.price
                    }
                    if (el.name === "Electricity Tax Percentage") {
                        setTotalTax(bills.totalElectric * 0.0833333 / 1000 * el.price / 100)
                        costTot += bills.totalElectric * 0.0833333 / 1000 * el.price / 100
                    }
                });

                setSeries({
                    data: [{
                        x: 'Organization Earnings',
                        y: earning.toFixed(2),
                        fillColor: '#00E396'

                    }, {
                        x: 'Organization Cost',
                        y: costTot.toFixed(2),
                        fillColor: "#d40000"
                    }]
                })
                const tmp: any = []
                Object.values(bills.aggregated).map((el: any) => {
                    if (el.date)
                        tmp.push({ x: el.date, y: el.electric })
                })
                sortDate(tmp)
                setAllElectricLine([{ data: tmp }])
                bills.result.forEach((bill) => {
                    let sum = 0
                    bill.bills.forEach((singleBill: any) => {
                        sum += singleBill.electric
                    })
                    const name = allBuildings.find((el: any) => el._id === bill.buildingId)?.name
                    if (name !== undefined) {
                        setLabels((old: any) => [...old, name])
                        setAllElectric((old: any) => [...old, (sum).toFixed(2)])
                    }
                    console.log(allElectric)
                    console.log(labels)
                })
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        setLabels([])
        setAllElectric([])
        setElectricSum("0")
        getBills()
    }, [])


    const getData = (data: any) => {
        if (data === undefined)
            return []
        return data.map((build: any) => allBuildings
            .find((el: any) => el._id === build.buildingId))
            .filter((res: any) => res != undefined)
    }
    return (
        <Wrapper navigate={navigate} title="Electric Supplier Details" >
            <>
                <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                    <Row align="middle" gutter={[32, 32]} >
                        <Col md={6} sm={12}>
                            <Statistic title="Total Electric Usage"
                                value={metricCubic ? Number(electricSum) * 0.0833333 / 1000 : electricSum}
                                suffix={metricCubic ? "Kilowatt (kW)" : "Watt"}
                                precision={2}
                            />
                            <Row align="middle">
                                <IconFont onClick={() => setMetric(!metricCubic)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} className="anticon iconfont" type="i-arrow_up_down_circle" />
                                <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>
                                    {!metricCubic ? "Kilowatt (kW)" : "Watt"}
                                </p>
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
                            <p style={{ fontSize: 18, fontWeight: 500 }}> Electric Usage</p>
                            <ReactApexChart
                                options={optionsLine as ApexOptions}
                                series={allElectricLine}
                                type="line"
                                height={320} />
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginTop: 32 }} justify="space-between" align="middle">
                        <Col md={10} sm={24} xs={24}>
                            <p style={{ fontSize: 18, fontWeight: 500 }}> Profit</p>
                            <ReactApexChart options={optionsBar} series={[series]} type="bar" height={250} />
                        </Col>
                        <Col md={12} sm={24} xs={24}>
                            <p style={{ fontSize: 18, fontWeight: 500 }}>Buildings Electric Usage</p>
                            <ReactApexChart options={options(labels, metricCubic, ["kWh", "w"]) as ApexOptions} series={allElectric} type="polarArea" />
                        </Col>
                        <Col span={24} style={{ marginTop: 32 }}>
                            <CustomersBuildingTable
                                headerTitle="Organization Building Electric Overview"
                                columns={columns(setVisible, setBuildingId)}
                                data={getData(resultBills.result)} />
                        </Col>
                    </Row>
                </Card>
                <CustomerDrawer
                    showGas={false}
                    showWater={false}
                    visible={visible}
                    setVisible={setVisible}
                    buildingId={buildingId}
                />
            </>
        </Wrapper>
    )
}
export default Electric