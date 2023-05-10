import { Breadcrumb, Card, Carousel, Col, Divider, Layout, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { useNavigate } from "react-router-dom"
import CustomerDrawer from "../CustomerDrawer"
import CustomersBuildingTable from "../CustomersBuildingTable"
import { useAppSelector } from "../../hooks"
import { PageHeader } from "@ant-design/pro-components"
import { ApexOptions } from "apexcharts"
import { Pages } from "../../types"

let optionsBar = {
    chart: {
        type: 'bar',
        toolbar: { show: false, },
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: true,
        },
    },
    tooltip: {
        enabled: true,

        y: {
            formatter: function (val: any) {
                return val + "€"
            },
            title: {
                formatter: (_: any, props: any) => {
                    return ["Earnings", "Cost"][props.dataPointIndex]
                },
            },
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ["Earnings", "Cost"],
    }
}

let optionsLine = {
    legend: {
        position: "top",
        horizontalAlign: "center",
        align: "right"
    },
    chart: {
        id: 'area-datetime',
        type: 'area',
        autoSelected: 'selection',
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
    colors: ['#00E396'],
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
                return val + "€"
            },
            title: {
                formatter: () => {
                    return "Water Usage"
                },
            },
        }
    }

}

const Water = ({ bills, cost }: Pages) => {
    let navigate = useNavigate()
    const allBuildings = useAppSelector((state: any) => state.allOrganization.allBuildings)
    const [metricCubic, setMetric] = useState(true)
    const [buildingId, setBuildingId] = useState("")
    const [visible, setVisible] = useState(false)
    const [waterSum, setWaterSum] = useState("0")
    const [allWater, setAllWater] = useState<any>([])
    const [labels, setLabels] = useState<any>([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [series, setSeries] = useState<any>([])
    const [allWaterLine, setAllWaterLine] = useState<any>([])



    const options = {
        chart: {
            height: 390,
            type: 'polarArea',
        },
        plotOptions: {
            polarArea: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 10,
                    size: '40%',
                    background: 'transparent',
                },
                dataLabels: {
                    name: {
                        fontSize: '14px',
                        show: true,

                    },
                }
            }
        },
        labels: labels,
        colors: ["#1984f5", "#00c2f6", "#00cbc8",],
        value: {
            formatter: function (value: number) {
                return metricCubic ? (value * 0.0001666667).toFixed(2) + " kWh" : value + " w"
            },
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (value: number) {
                    return metricCubic ? (value * 0.0001666667).toFixed(2) + " kWh" : value + " w"
                },
            },

        },
        legend: {
            show: true,
            fontSize: '16px',
            position: 'left',
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName: string, opts: any) {
                let res = metricCubic ? (opts.w.globals.series[opts.seriesIndex] * 0.0001666667).toFixed(2) + " kWh" : opts.w.globals.series[opts.seriesIndex] + " w"
                return seriesName + " " + res
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
        setLabels([])
        setAllWater([])
        setWaterSum("0")
        if (Object.keys(bills).length === 0)
            return
        setWaterSum((bills.totalWater).toFixed(2))
        let earning = 0
        let costTot = 0
        cost.forEach((el: any) => {
            if (el.name === "Water Cost at kWh") {
                setTotalEarning(bills.totalWater * 0.0001666667 * el.price)
                earning += bills.totalWater * 0.0001666667 * el.price
            }
            if (el.name === "Water Supplier Cost") {
                setSupplier(bills.result.length * el.price)
                earning += bills.result.length * el.price
            }
            if (el.name === "Water Delivery Cost") {
                setDelivery(bills.result.length * el.price)
                costTot += bills.result.length * el.price
            }
            if (el.name === "Water Tax Percentage") {
                setTotalTax(bills.totalWater * 0.0001666667 * el.price / 100)
                costTot += bills.totalWater * 0.0001666667 * el.price / 100
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
        let tmp: any = []
        Object.values(bills.aggregated).map((el: any) => {
            tmp.push([el.date, el.water])
        })
        setAllWaterLine([{ data: tmp }])

        bills.result.forEach((bill: any) => {
            let sum = 0
            bill.bills.forEach((singleBill: any) => {
                sum += singleBill.water
            })
            setLabels((old: any) => [...old, allBuildings.find((el:any) => el._id === bill.buildingId).name])
            setAllWater((old: any) => [...old, (sum).toFixed(2)])
        })
    }, [bills, metricCubic])

    const columns = [
        {
            title: "#",
            dataIndex: 'index',
            valueType: 'index',
            key: 'index',
            width: 10,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
            width: 300,
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            key: 'option',
            valueType: 'option',
            render: (_: any, data: any) =>
                <a onClick={() => {
                    setVisible(true)
                    setBuildingId(data._id)
                }} key="1" >
                    See Details
                </a>
        },
    ];

    const getData = (data: any) => {
        if (data === undefined)
            return []
        let res = data.map((build: any) => allBuildings.find((el: any) => el._id === build.buildingId))
        return res
    }
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
                title="Water Supplier Details"
                subTitle="Check your supplier earnings and productions"
                onBack={() => navigate("/Dashboard")}
            />
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row align="middle" gutter={[32, 32]}>
                    <Col md={6} sm={12} >
                        <Statistic title="Total Water Usage" value={metricCubic ? Number(waterSum) * 0.0001666667 : waterSum} suffix={metricCubic ? "Liter/Hours (l/h)" : "Liter"} precision={3} />
                        <Row align="middle">
                            <span onClick={() => setMetric(!metricCubic)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} className="anticon iconfont">&#xe615;</span>
                            <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricCubic ? "Liter/Hours (l/h)" : "Liter"}</p>
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
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Water Usage</p>
                        <ReactApexChart options={optionsLine as ApexOptions} series={allWaterLine} type="line" height={320} />
                    </Col>
                </Row>
                <Divider />
                <Row style={{ marginTop: 32 }} justify="space-between" align="middle">
                    <Col md={10} sm={24} xs={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Profit</p>
                        <ReactApexChart options={optionsBar as ApexOptions} series={[series]} type="bar" height={250} />
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}>Buildings Water Usage</p>
                        <ReactApexChart options={options as ApexOptions} series={allWater} type="polarArea" />
                    </Col>
                    <Col span={24} style={{ marginTop: 32 }}>
                        <CustomersBuildingTable headerTitle="Organization Building Water Overview" columns={columns} data={getData(bills.result)} />
                    </Col>
                </Row>


            </Card>
            <CustomerDrawer showGas={false} showWater={false} visible={visible} setVisible={setVisible} buildingId={buildingId} />
        </Layout>
    )
}
export default Water