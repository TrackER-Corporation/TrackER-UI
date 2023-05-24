import { Col, Divider, Row } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { InvoicesProps, optionsLine, pieOptions } from "./utilsInvoices"
import InvoicesWrapper from "./InvoicesWrapper"
import { sortDate } from "../utils"

const GasInvoices = ({ bills, cost, aggregated, filtered }: InvoicesProps) => {
    const [metricCubic, setMetric] = useState(true)
    const [gasSum, setGasSum] = useState(0)
    const [allGasLine, setAllGasLine] = useState<Array<any>>([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)

    useEffect(() => {
        if (bills === null)
            return
        setGasSum(0)
        setAllGasLine([])
        if ("all" in bills)
            setGasSum((bills.totalGas).toFixed(2))
        else
            filtered?.map((el: any) => setGasSum(old => old + el[1]))
        if (cost !== undefined && Object.keys(cost).length > 0) {
            cost?.forEach((el: any) => {
                if (el.name === "Gas Cost at m³") {
                    setTotalEarning(gasSum * 0.0454249414 / 1000 * el.price)
                }
                if (el.name === "Supplier Gas Cost") {
                    setSupplier(el.price)
                }
                if (el.name === "Gas Delivery Cost") {
                    setDelivery(el.price)
                }
                if (el.name === "Gas Tax Percentage") {
                    setTotalTax(gasSum * 0.0454249414 / 1000 * el.price / 100)
                }
            });
        }
        const tmp: any = []
        if (aggregated === undefined || aggregated === "undefined") {
            filtered?.forEach((el: any) => {
                tmp.push({ x: el[0], y: el[1] })
            })
            sortDate(tmp)
            setAllGasLine([{ data: tmp }])
        } else {
            Object.values(aggregated).map((el: any) => {
                tmp.push({ x: el.date, y: el.gas })
            })
            sortDate(tmp)
            setAllGasLine([{ data: tmp }])
        }
    }, [filtered, metricCubic, aggregated, cost, bills])


    return (
        <InvoicesWrapper
            bills={bills}
            change={metricCubic}
            setChange={setMetric}
            supplier={supplier}
            title="Gas Supplier Details"
            totalEarning={totalEarning}
            totalSum={gasSum}
            totalTaxCost={totalTaxCost}
            multiplier={0.000454249414}
            delivery={delivery}
            changeTitle={{
                first: "Gas/m³",
                second: "Gallon"
            }}
            chart={
                <Row style={{ marginTop: 32 }} justify="center" align="middle">
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Gas Usage</p>
                        <ReactApexChart options={optionsLine("Gas Usage", "Gallon", "#19e396")} series={allGasLine} type="line" height={320} />
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
export default GasInvoices