import { Button, Card, Col, Divider, Empty, Modal, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import api from "../../api"
import ResourcesModal from "./Resources/ResourcesModal"
import { PageHeader } from "@ant-design/pro-components"
import IconFont from "../../Iconfont"
import { ApexOptions } from "apexcharts"

const optionsBar = {
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
            formatter: function (val: number) {
                return val + "€"
            },
            title: {
                formatter: (_: any, props: any) => {
                    return ["Total Earnings", "Installation Cost"][props.dataPointIndex]
                },
            },
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ["Total Earnings", "Installation Cost"],
    }
}

const optionsLine = {
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
    yaxis: {
        labels: {
            formatter: function (val: number) {
                return (val / 1000).toFixed(2) + " KW"
            },
        }
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
                return (val / 1000).toFixed(2) + "kW"
            },
            title: {
                formatter: () => {
                    return "Electric Usage"
                },
            },
        }
    }

}

const RenewableCards = ({ item, bills, resources }: any) => {
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [filter, setFilter] = useState("")
    const [geoSum, setGeoSum] = useState(0)
    const [hydroSum, setHydroSum] = useState(0)
    const [windSum, setWindSum] = useState(0)
    const [solarSum, setSolarSum] = useState(0)
    const [totalSum, setTotalSum] = useState(0)
    const [allBills, setAllBills] = useState<any>([])
    const [deviceEarning, setDeviceEarning] = useState(0)
    const [deviceCost, setDeviceCost] = useState(0)
    const [metric, setMetric] = useState(true)

    const getAllData = async () => {
        setHydroSum(0)
        setSolarSum(0)
        setWindSum(0)
        setGeoSum(0)
        setTotalSum(0)
        setDeviceEarning(0)
        setDeviceCost(0)
        setAllBills([])
        const resArray = resources.map((el: any) => Object.keys(el)[0])
        // if (bills === null || Object.keys(bills).length === 0)
        //     if (bills.all === undefined)
        //         return []
        const test = bills.all.find((el: any) => el.buildingId === item._id)
        if (test === undefined) return []
        await api.renewable.fetchResourcesByBuildingId(test.buildingId).then(res => res.map((devices: any) => {
            setDeviceEarning((old) => old + devices.earning)
            setDeviceCost((old) => old + devices.price)
            test.bills.map((el: any) => {
                el["resources"].forEach((element: any) => {
                    if (resArray.includes(Object.keys(element)[0])) {
                        switch (Object.keys(element)[0]) {
                            case "Solar":
                                setSolarSum((old) => old + Number(Object.values(element)))
                                if (devices.resourcesType === "Solar" && filter === "Solar") {
                                    setTotalSum((old) => old + Number(Object.values(element)))
                                    setAllBills((old: any) => [...old, [el.date, Number(Object.values(element)).toFixed(2)]])
                                }
                                break;
                            case "Hydro":
                                setHydroSum((old) => old + Number(Object.values(element)))
                                if (devices.resourcesType === "Hydro" && filter === "Hydro") {
                                    setTotalSum((old) => old + Number(Object.values(element)))
                                    setAllBills((old: any) => [...old, [el.date, Number(Object.values(element)).toFixed(2)]])
                                }
                                break;
                            case "Geo":
                                setGeoSum((old) => old + Number(Object.values(element)))
                                if (devices.resourcesType === "Geo" && filter === "Geo") {
                                    setTotalSum((old) => old + Number(Object.values(element)))
                                    setAllBills((old: any) => [...old, [el.date, Number(Object.values(element)).toFixed(2)]])
                                }
                                break;
                            case "Wind":
                                setWindSum((old) => old + Number(Object.values(element)))
                                if (devices.resourcesType === "Wind" && filter === "Wind") {
                                    setTotalSum((old) => old + Number(Object.values(element)))
                                    setAllBills((old: any) => [...old, [el.date, Number(Object.values(element)).toFixed(2)]])
                                }
                                break;
                            default:
                                break;
                        }
                    }
                })
            })
        }))
    }


    useEffect(() => {
        setAllBills([])
        getAllData()
    }, [filter])


    const getSeries = () => {
        return [
            {
                data: [
                    {
                        x: 'Organization Earnings',
                        y: (deviceEarning * totalSum / 1000).toFixed(2),
                        fillColor: '#00E396'

                    }, {
                        x: 'Organization Cost',
                        y: Number(deviceCost).toFixed(2),
                        fillColor: "#d40000"
                    }
                ]
            }
        ]
    }

    const renderData = (filter: string) =>
        <>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title={filter + " Devices Production"}
                subTitle="Check your devices earnings and productions"
            />
            {/* <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row align="top" gutter={[32, 32]} >
                    <Col span={12}>
                        <Statistic title={`Total ${filter} Production`} value={metric ? totalSum / 1000 : totalSum} suffix={metric ? "Kilowatt (kW)" : "Watt"} precision={2} />
                        <Row align="middle">
                            <IconFont type="i-arrow_up_down_circle" onClick={() => setMetric(!metric)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} />
                            <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metric ? "Kilowatt (kW)" : "Watt"}</p>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Earnings" value={(deviceEarning * totalSum / 1000).toFixed(2)} suffix={"Euro €"} precision={2} />
                    </Col>
                </Row>
                <Divider />

                {allBills.length > 0 ?
                    <>
                        <Row style={{ marginTop: 32 }} justify="center" align="middle">
                            <Col span={24}>
                                <p style={{ fontSize: 18, fontWeight: 500 }}> {filter} Production</p>
                                <ReactApexChart options={optionsLine as ApexOptions} series={[{ data: allBills }]} type="line" height={320} />
                            </Col>
                        </Row>
                        <Divider />
                        <Row style={{ marginTop: 32 }} justify="space-between" align="middle">
                            <Col span={24}>
                                <p style={{ fontSize: 18, fontWeight: 500 }}> Total Profit</p>
                                <ReactApexChart options={optionsBar as ApexOptions} series={getSeries()} type="bar" height={250} />
                            </Col>
                        </Row>
                    </> :
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{ height: 100, }}
                        description={<span>  This building has <a>NO {filter}</a> resources installed yet</span>}
                    >
                        <Button onClick={() => setVisible1(true)} type="primary" style={{ borderRadius: 20 }}>Install One Now</Button>
                    </Empty>
                }
            </Card> */}
        </>

    return (
        <Row justify="center" gutter={[32, 32]}>
            {/* <Col span={24}>
                <Statistic title="Total Energy Production" value={metric ? (solarSum + geoSum + hydroSum + windSum) / 1000 : (solarSum + geoSum + hydroSum + windSum)} suffix={metric ? "KiloWatt (kW)" : "Watt"} precision={2} />
                <Row align="middle">
                    <IconFont type="i-arrow_up_down_circle" onClick={() => setMetric(!metric)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} />
                    <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metric ? "Total in Kilowatt (kW)" : "Total in Watt (W)"}</p>
                </Row>
            </Col>
            <Col lg={6} sm={24} md={12}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Solar")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Solar Production</p>
                    <span className="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe65f;</span>
                    <Statistic value={!metric ? solarSum : solarSum / 1000} suffix={metric ? "kW" : "W"} precision={2} />
                </Card>
            </Col>
            <Col lg={6} sm={24} md={12}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Hydro")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Hydro Production</p>
                    <span className="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe650;</span>
                    <Statistic value={!metric ? hydroSum : hydroSum / 1000} suffix={metric ? "kW" : "W"} precision={2} />
                </Card>
            </Col>
            <Col lg={6} sm={24} md={12}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Wind")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Windy Production</p>
                    <span className="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe661;</span>
                    <Statistic value={!metric ? windSum : windSum / 1000} suffix={metric ? "kW" : "W"} precision={2} />
                </Card>
            </Col>
            <Col lg={6} sm={24} md={12}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Geo")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Geothermic Production</p>
                    <span className="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe64b;</span>
                    <Statistic value={!metric ? geoSum : geoSum / 1000} suffix={metric ? "kW" : "W"} precision={2} />
                </Card>
            </Col>
            <Modal
                destroyOnClose
                open={visible}
                onCancel={() => setVisible(false)}
                width={800}
                title={"Total " + filter + " Production"}
            >
                {renderData(filter)}
            </Modal>
            <ResourcesModal
                defaultActiveKey={filter}
                building={item}
                visible={visible1}
                setVisible={setVisible1}
                data={item.resources}
            /> */}
        </Row >
    )
}
export default RenewableCards