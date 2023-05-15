import { Col, Divider, Row } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { InvoicesProps, optionsLine, pieOptions } from "./utilsInvoices"
import InvoicesWrapper from "./InvoicesWrapper"
import { sortDate } from "../utils"

const WaterInvoices = ({ bills, cost, aggregated, filtered }: InvoicesProps) => {
    const [metricCubic, setMetric] = useState(true)
    const [waterSum, setWaterSum] = useState(0)
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [allWaterLine, setAllWaterLine] = useState<any>([])

    useEffect(() => {
        if (bills === null) return
        setWaterSum(0)
        setAllWaterLine([])
        if ("all" in bills) setWaterSum((bills.totalGas).toFixed(2))
        else filtered?.map((el: any) => setWaterSum(old => old + el[1]))

        let totalWater = 0
        if (aggregated === undefined || aggregated === "undefined") {
            filtered?.forEach((el: any) => totalWater += el[1])
            if (filtered?.length === 0) return
        } else {
            Object.values(aggregated)?.map((el: any) => {
                totalWater += el.water
            })
        }

        setWaterSum(Number(totalWater.toFixed(2)))
        if (cost !== undefined && Object.keys(cost).length > 0) {
            cost?.forEach((el: any) => {
                if (el.name === "Water Cost at kWh") {
                    setTotalEarning(totalWater * 0.0001666667 * el.price)
                }
                if (el.name === "Water Supplier Cost") {
                    setSupplier(el.price)
                }
                if (el.name === "Water Delivery Cost") {
                    setDelivery(el.price)
                }
                if (el.name === "Water Tax Percentage") {
                    setTotalTax(totalWater * 0.0001666667 * el.price / 100)
                }
            });
        }

        const tmp: Array<any> = []
        if (aggregated === undefined || aggregated === "undefined") {
            filtered?.forEach((el: any) => {
                tmp.push({ x: el[0], y: el[1] })
            })
            sortDate(tmp)
            setAllWaterLine([{ data: tmp }])
        } else {
            Object.values(aggregated).map((el: any) => {
                tmp.push({ x: el.date, y: el.gas })
            })
            setAllWaterLine([{ data: tmp }])
        }
    }, [filtered, aggregated, metricCubic, bills, cost])

    return (
        <InvoicesWrapper
            title="Water Supplier Details"
            bills={bills}
            change={metricCubic}
            delivery={delivery}
            multiplier={0.0001666667}
            setChange={setMetric}
            supplier={supplier}
            totalEarning={totalEarning}
            totalSum={waterSum}
            totalTaxCost={totalTaxCost}
            changeTitle={{
                first: "Liter/Hours (l/h)",
                second: "Liter"
            }}
            chart={
                <Row style={{ marginTop: 32 }} justify="center" align="middle">
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Water Usage</p>
                        <ReactApexChart
                            options={optionsLine("Water Usage", "l", "#008ffb")}
                            series={allWaterLine}
                            type="line"
                            height={320}
                        />
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Cost Overview</p>
                        <Row justify="center">
                            <ReactApexChart
                                options={pieOptions}
                                series={[totalEarning, totalTaxCost, delivery, supplier]}
                                type="pie"
                                width={700}
                            />
                        </Row>
                    </Col>
                </Row>
            }
        />
    )
}
export default WaterInvoices