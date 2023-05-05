import { PageHeader } from "@ant-design/pro-components"
import { Breadcrumb, Card, Carousel, Col, Divider, Empty, Layout, Row, Statistic } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import IconFont from "../../Iconfont"
import { ApexOptions } from "apexcharts"

const optionsLine: ApexOptions = {
    noData: {
        text: "No data to show...",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
            color: "blue",
            fontSize: '20px',
        }
    },
    legend: {
        position: "top",
        horizontalAlign: "center",
        // align: "right"
    },
    chart: {
        id: 'area-datetime',
        type: 'area',
        // autoSelected: 'selection',
        animations: {
            enabled: true,
            easing: 'easein',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
        },
        toolbar: { show: true, },
    },
    colors: ['#ffcf45'],
    stroke: {
        curve: 'smooth',
        width: 2,
        lineCap: 'butt',
    },
    dataLabels: {
        enabled: false
    },

    xaxis: {
        type: 'datetime',
        tooltip: {
            enabled: false
        },
        labels: {
            show: true,
            datetimeUTC: false,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        },
    },
    tooltip: {
        enabled: true,
        followCursor: true,
        theme: "light",
        x: {
            show: true,
            format: "dd-MM-yyyy HH:mm"
        },
        y: {
            formatter: function (val: number) {
                return val + "W"
            },
            title: {
                formatter: () => {
                    return "Electric Usage"
                },
            },
        }
    }

}

const week = moment().subtract(7, 'days');
const month = moment().subtract(1, 'months');
const year = moment().subtract(1, 'years');

const ElectricInvoices = ({ bills, cost, aggregated, filtered }: any) => {
    const [metricCubic, setMetric] = useState(true)
    const [electricSum, setElectricSum] = useState(0)
    const [allElectricLine, setAllElectricLine] = useState<any>([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)

    const options: ApexOptions = {
        noData: {
            text: "You have no data...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "blue",
                fontSize: '12px',
            }
        },
        chart: {
            height: 390,
            type: 'pie',
        },
        plotOptions: {
            polarArea: {
                // offsetY: 0,
                // startAngle: 0,
                // endAngle: 270,
                // hollow: {
                //     margin: 10,
                //     size: '40%',
                //     background: 'transparent',
                // },
                // dataLabels: {
                //     name: {
                //         fontSize: '14px',
                //         show: true,

                //     },
                // }
            }
        },
        labels: ["Organization Cost", "Tax Cost", "Delivery Cost", "Supplier Cost"],
        colors: ["#1984f5", "#00c2f6", "#00cbc8", "#00cbff",],
        // value: {
        //     formatter: function (value) { return value + " €" },
        // },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (value) { return value + " €" },
            },

        },
        legend: {
            show: true,
            fontSize: '16px',
            position: 'right',
            labels: {
                useSeriesColors: true,
            },
            markers: {
                width: 0,
                height: 0
            },
            formatter: function (seriesName, opts) {
                return seriesName + " " + opts.w.globals.series[opts.seriesIndex].toFixed(2) + " €"
            },
            itemMargin: {
                vertical: 3
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
    }

    useEffect(() => {
        if (bills === null)
            return
        setAllElectricLine([])
        setElectricSum(0)
        if (bills.hasOwnProperty("all"))
            setElectricSum(bills.totalElectric.toFixed(2))
        else
            filtered.map((el: any) => setElectricSum(old => old + el[1]))


        if (cost !== undefined && Object.keys(cost).length > 0) {
            cost.forEach((el: any) => {
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
        if (aggregated === undefined) {
            filtered.forEach((el: any) => {
                tmp.push([el[0], el[1]])
            })
            setAllElectricLine([{ data: tmp }])
        } else {
            Object.values(aggregated).map((el: any) => {
                tmp.push([el.date, el.electric])
            })
            setAllElectricLine([{ data: tmp }])
        }
    }, [filtered, metricCubic, aggregated, cost, electricSum, bills])


    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>{window.location.pathname.split("/")[1]}</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Electric Supplier Details"
                subTitle="Check your supplier earnings and productions"
            />
            {Object.keys(bills).length === 0 ?
                <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                    < Empty />
                </Card>
                :
                <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                    <Row align="top" gutter={[32, 32]} >
                        <Col md={6} sm={12}>
                            <Statistic title="Total Electric Usage" value={metricCubic ? electricSum / 1000 : electricSum} suffix={metricCubic ? "Kilowatt (kW)" : "Watt"} precision={4} />
                            <Row align="middle">
                                <IconFont type="i-arrow_up_down_circle" onClick={() => setMetric(!metricCubic)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} />
                                <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricCubic ? "Kilowatt (kW)" : "Watt"}</p>
                            </Row>
                        </Col>
                        <Col md={6} sm={12} style={{ height: 90 }} >
                            <Statistic title="Organization Cost" value={totalEarning} suffix={"Euro (€)"} precision={2} />
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
                            <ReactApexChart options={optionsLine} series={allElectricLine} type="line" height={320} />
                        </Col>
                        <Divider />
                        <Col span={24}>
                            <p style={{ fontSize: 18, fontWeight: 500 }}> Cost Overview</p>
                            <Row justify="center">
                                <ReactApexChart options={options} series={[totalEarning, totalTaxCost, delivery, supplier]} type="pie" width={700} />
                            </Row>
                        </Col>
                    </Row>
                </Card>
            }
        </Layout>
    )
}
export default ElectricInvoices