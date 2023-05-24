import { Button, Card, Col, Divider, Row, Statistic, message } from "antd"
import { ApexOptions } from "apexcharts"
import IconFont from "../../Iconfont"
import { PageHeader } from "@ant-design/pro-components"
import ReactApexChart from "react-apexcharts"
import Empty from "../../Components/Empty"
import api from "../../api"
import { Building, EnergyType, Organization } from "../../types"
import { fetchBuildings } from "../../reducers/buildings"
import { AppDispatch } from "../../store"
import { sortDate } from "../utils"

export const optionsBar: ApexOptions = {
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
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ["Total Earnings", "Installation Cost"],
    }
}

export const optionsLine: ApexOptions = {
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


export const RenewableCardRender = (
    title: string,
    totalSum: number,
    metric: boolean,
    filter: EnergyType,
    icon: string,
    setFilter: (arg: EnergyType) => void,
    setVisible: (arg: boolean) => void,
) => {

    return (
        <Col lg={6} sm={24} md={12}>
            <Card hoverable
                style={{ borderRadius: 20, textAlign: "center" }}
                onClick={() => {
                    setFilter(filter)
                    setVisible(true)
                }}>
                <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>{title}</p>
                <IconFont
                    type={icon}
                    color="#1196db"
                    style={{
                        color: "#1196db",
                        fontSize: "80px",
                        alignSelf: "center",
                        verticalAlign: "middle",
                    }} />
                <Statistic
                    style={{ marginTop: 15 }}
                    value={!metric ? totalSum : totalSum / 1000}
                    suffix={metric ? "kW" : "W"}
                    precision={2} />
            </Card>
        </Col>
    )
}



const getSeries = (deviceEarning: number, totalSum: number, deviceCost: number) =>
    [
        {
            data: [
                {
                    x: 'Organization Earnings',
                    y: (deviceEarning * totalSum / 1000).toFixed(2),
                    fillColor: '#00E396'

                }, {
                    x: 'Organization Cost',
                    y: Number(deviceCost.toFixed(2)),
                    fillColor: "#d40000"
                }
            ]
        }
    ]

export const renderRenewableData = (
    filter: string,
    metric: boolean,
    totalSum: number,
    deviceEarning: number,
    deviceCost: number,
    allBills: any,
    setMetric: (arg: boolean) => void,
    setVisible: (arg: boolean) => void
) =>
    <>
        <PageHeader
            style={{ paddingLeft: 0 }}
            className="site-page-header"
            title={filter + " Devices Production"}
            subTitle="Check your devices earnings and productions"
        />
        <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
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

            {allBills?.length > 0 ?
                <>
                    <Row style={{ marginTop: 32 }} justify="center" align="middle">
                        <Col span={24}>
                            <p style={{ fontSize: 18, fontWeight: 500 }}> {filter} Production</p>
                            <ReactApexChart options={optionsLine} series={[{ data: allBills }]} type="line" height={320} />
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginTop: 32 }} justify="space-between" align="middle">
                        <Col span={24}>
                            <p style={{ fontSize: 18, fontWeight: 500 }}> Total Profit</p>
                            <ReactApexChart options={optionsBar} series={getSeries(deviceEarning, totalSum, deviceCost)} type="bar" height={250} />
                        </Col>
                    </Row>
                </> :
                <Empty description={<span>  This building has <a>NO {filter}</a> resources installed yet</span>}>
                    <Button onClick={() => setVisible(true)} type="primary" style={{ borderRadius: 20 }}>Install One Now</Button>
                </Empty>
            }
        </Card>
    </>

export const getAllDataRenewable = async (
    resources: any,
    bills: any,
    item: any,
    filter: EnergyType,
    setHydroSum: (arg: number) => void,
    setSolarSum: (arg: number) => void,
    setWindSum: (arg: number) => void,
    setGeoSum: (arg: number) => void,
    setTotalSum: (arg: number) => void,
    setDeviceEarning: (arg: number) => void,
    setDeviceCost: (arg: number) => void,
    setAllBills: (arg: any) => void,
) => {
    try {
        let hydroSum = 0;
        let solarSum = 0;
        let windSum = 0;
        let geoSum = 0;
        let totalSum = 0;
        let deviceEarning = 0;
        let deviceCost = 0;
        const allBills: Array<any> = [];

        const resArray = resources.map((el: any) => Object.keys(el)[0]);

        if (!bills || !bills.all || bills.all.length === 0) {
            return [];
        }

        const buildingBills = bills.all.find((el: any) => el.buildingId === item._id);

        if (!buildingBills) {
            return [];
        }

        const device = await api.renewable.fetchResourcesByBuildingId(buildingBills.buildingId);

        deviceEarning += device.earning;
        deviceCost += device.price;

        buildingBills.bills.forEach((bill: any) => {
            const resources = bill.resources.find((resource: any) => resArray.includes(Object.keys(resource)[0]));

            if (!resources) {
                return;
            }

            const [resourceName, resourceValue] = Object.entries(resources)[0];

            switch (resourceName) {
                case "Solar":
                    solarSum += Number(resourceValue);

                    if (device.resourcesType === "Solar" && filter === "Solar") {
                        totalSum += Number(resourceValue);
                        allBills.push([{x:bill.date, y:Number(resourceValue).toFixed(2)}]);
                    }
                    break;
                case "Hydro":
                    hydroSum += Number(resourceValue);
                    if (device.resourcesType === "Hydro" && filter === "Hydro") {
                        totalSum += Number(resourceValue);
                        allBills.push([{x:bill.date, y:Number(resourceValue).toFixed(2)}]);
                    }
                    break;
                case "Geo":
                    geoSum += Number(resourceValue);

                    if (device.resourcesType === "Geo" && filter === "Geo") {
                        totalSum += Number(resourceValue);
                        allBills.push({x:bill.date, y:Number(resourceValue).toFixed(2)});
                    }
                    break;
                case "Wind":
                    windSum += Number(resourceValue);

                    if (device.resourcesType === "Wind" && filter === "Wind") {
                        totalSum += Number(resourceValue);
                        allBills.push([{x:bill.date, y:Number(resourceValue).toFixed(2)}]);
                    }
                    break;
                default:
                    break;
            }
        });

        setHydroSum(hydroSum);
        setSolarSum(solarSum);
        setWindSum(windSum);
        setGeoSum(geoSum);
        setTotalSum(totalSum);
        setDeviceEarning(deviceEarning);
        setDeviceCost(deviceCost);
        sortDate(allBills)
        setAllBills(allBills);
    } catch (error) {
        console.log(error);
    }
};


export const deleteBuilding = async (
    id: string,
    userId: string,
    setMessage: (arg: string) => void,
    setShow: (arg: boolean) => void,
    setBuildingsFilter: (arg: Array<Building>) => void,
    dispatch: AppDispatch
) => {
    try {
        setMessage("Deleting...");
        setShow(true);
        await api.buildings.deleteBuilding(id);
        await api.buildings.fetchBuildingsByUserId(userId).then((updatedBuildings: Array<Building>) => {
            setBuildingsFilter(updatedBuildings);
            dispatch(fetchBuildings(updatedBuildings));
            setShow(false);
            message.success("Building deleted correctly");
            window.scroll(0, 0);
        })
    } catch (error) {
        setShow(false);
        message.error("Failed to delete building");
        console.error(error);
    }
}

export const showBills = (allOrg: Array<Organization>, type: string, orgId: string) => allOrg.find((el) => el._id === orgId)?.type?.includes(type)