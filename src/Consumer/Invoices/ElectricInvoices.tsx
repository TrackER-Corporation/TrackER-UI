import { Col, Divider, Row } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { InvoicesProps, optionsLine, pieOptions } from "./utilsInvoices"
import InvoicesWrapper from "./InvoicesWrapper"
import { sortDate } from "../utils"

const ElectricInvoices = ({ bills, cost, aggregated, filtered }: InvoicesProps) => {
    const [metricCubic, setMetric] = useState(true)
    const [electricSum, setElectricSum] = useState(0)
    const [allElectricLine, setAllElectricLine] = useState<any>([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)

    useEffect(() => {
        if (bills === null)
            return
        setAllElectricLine([])
        setElectricSum(0)
        if ("all" in bills)
            setElectricSum(bills.totalElectric.toFixed(2))
        else
            filtered?.map((el: any) => setElectricSum(old => old + el[1]))


        if (cost !== undefined && Object.keys(cost).length > 0) {
            cost?.forEach((el: any) => {
                if (el.name === "Electricity Cost at kWh") {
                    setTotalEarning((electricSum * 0.0833333 / 1000 * el.price))
                }
                if (el.name === "Electricity Supplier Cost") {
                    setSupplier(el.price)
                }
                if (el.name === "Electricity Delivery Cost") {
                    setDelivery(el.price)
                }
                if (el.name === "Electricity Tax Percentage") {
                    setTotalTax(electricSum * 0.0833333 / 1000 * el.price / 100)
                }
            });
        }
        const tmp: Array<any> = []
        if (aggregated === undefined || aggregated === "undefined") {
            filtered?.forEach((el: any) => {
                tmp.push({ x: el[0], y: el[1] })
            })
            sortDate(tmp)
            setAllElectricLine([{ data: tmp }])
        } else {
            Object.values(aggregated).map((el: any) => {
                tmp.push({ x: el.date, y: el.electric })
            })
            setAllElectricLine([{ data: tmp }])
        }
    }, [filtered, metricCubic, aggregated, cost, electricSum, bills])


    return (

        <InvoicesWrapper
            bills={bills}
            change={metricCubic}
            setChange={setMetric}
            supplier={supplier}
            title="Electric Supplier Details"
            totalEarning={totalEarning}
            totalSum={electricSum}
            totalTaxCost={totalTaxCost}
            multiplier={0.0001}
            delivery={delivery}
            changeTitle={{
                first: "Kilowatt (kW)",
                second: "Watt"
            }}
            chart={
                <Row style={{ marginTop: 32 }} justify="center" align="middle">
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Electric Usage</p>
                        <ReactApexChart options={optionsLine("Electric Usage", "W", "#ffcf45")} series={allElectricLine} type="line" height={320} />
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Cost Overview</p>
                        <Row justify="center">
                            <ReactApexChart options={pieOptions} series={[totalEarning, totalTaxCost, delivery, supplier]} type="pie" width={700} />
                        </Row>
                    </Col>
                </Row>
            }
        />
    )
}
export default ElectricInvoices