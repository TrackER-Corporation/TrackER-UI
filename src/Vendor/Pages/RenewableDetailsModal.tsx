import { Card, Col, Divider, Modal, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import api from "../../api"
import { PageHeader } from "@ant-design/pro-components"
import { ApexOptions } from "apexcharts"
import { RenewableDetailsModal } from "../../types"
import { sortDate } from "../../Consumer/utils"
import IconFont from "../../Iconfont"
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
                    return ["Customers Production Earnings: ", "Installation Earnings: "][props.dataPointIndex]
                },
            },
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ["Customers Production Earnings", "Installation Earnings "],
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
                return (val / 1000).toFixed(2) + "kWh"
            },
            title: {
                formatter: () => {
                    return "Electric Usage"
                },
            },
        }
    }

}


const RenewableDetailsModal = ({ filter, data, setVisible, visible }: RenewableDetailsModal) => {
    const [dataRenewable, setData] = useState<any>({})
    const [dataEarning, setDataEarning] = useState(0)
    const [totalProduction, setTotalProduction] = useState(0)
    const [metric, setMetric] = useState(false)

    const getData = () => {
        if (data.buildings === undefined) {
            return
        }
        data.buildings.map(async (buildingId: string) => {
            const tmp: any = []
            await api.bills.getBillsRenewable(buildingId).then(res => {
                res.renewable.map((el: any) => {
                    el.resources.map((resource: any) => {
                        if (Object.keys(resource).includes(filter))
                            tmp.push({ x: el.date, y: Number(Object.values(resource)).toFixed(2) })
                    })
                })
                sortDate(tmp)
                setData(tmp)
                switch (filter) {
                    case "Solar":
                        setDataEarning(res.totalSolar / 1000 * data.organization / 100)
                        setTotalProduction(res.totalSolar)
                        break;
                    case "Wind":
                        setDataEarning(res.totalWind / 1000 * data.organization / 100)
                        setTotalProduction(res.totalSolar)
                        break;
                    case "Hydro":
                        setDataEarning(res.totalHydro / 1000 * data.organization / 100)
                        setTotalProduction(res.totalHydro)
                        break;
                    case "Geo":
                        setDataEarning(res.totalGeo / 1000 * data.organization / 100)
                        setTotalProduction(res.totalGeo)
                        break;
                    default:
                        break;
                }
            }).catch(() => { return })
        })
    }

    const getSeries = () => {
        if (Object.keys(data).length === 0 || data.buildings === undefined)
            return []
        return [
            {
                data: [
                    {
                        x: 'Organization Earnings',
                        y: dataEarning.toFixed(2),
                        fillColor: '#00E396'

                    }, {
                        x: 'Organization Cost',
                        y: Number(data.price * data.buildings.length).toFixed(2),
                        fillColor: "#008ffb"
                    }
                ]
            }
        ]
    }
    useEffect(() => {
        getData()
    }, [data, filter, visible])


    return (
        <Modal
            title={data.name + " resources details"}
            width={1000}
            open={visible}
            onCancel={() => setVisible(false)}
            onOk={() => setVisible(false)}
            destroyOnClose
        >
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title={filter + " Devices Production"}
                subTitle="Check your devices earnings and productions"
            />
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row align="top" gutter={[32, 32]} >
                    <Col span={12}>
                        <Statistic title="Total Electric Usage"
                            value={!metric ? totalProduction : totalProduction / 1000}
                            suffix={metric ? "Kilowatt (kW)" : "Watt"}
                            precision={2} />
                        <Row align="middle">
                            <IconFont type="i-arrow_up_down_circle"
                                onClick={() => setMetric(!metric)}
                                style={{ color: "blue", marginRight: 6, cursor: "pointer" }}
                                className="anticon iconfont" />
                            <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metric ? "Kilowatt (kWh)" : "Watt"}</p>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Earnings"
                            value={dataEarning}
                            suffix={"€"}
                            precision={2} />
                    </Col>
                </Row>
                <Divider />

                <Row style={{ marginTop: 32 }} justify="center" align="middle">
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> {filter} Usage</p>
                        <ReactApexChart options={optionsLine as ApexOptions} series={[{ data: dataRenewable }]} type="line" height={320} />
                    </Col>
                </Row>
                <Divider />
                <Row style={{ marginTop: 32 }} justify="space-between" align="middle">
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Total Profit</p>
                        <ReactApexChart options={optionsBar as ApexOptions} series={getSeries()} type="bar" height={250} />
                    </Col>
                </Row>
            </Card>
        </Modal>
    )
}
export default RenewableDetailsModal