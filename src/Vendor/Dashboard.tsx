import { Card, Col, Divider, Layout, Row, Statistic, } from "antd";
import { useEffect, useState } from "react";
import api from "../api"
import UsersCard from "./DashboardCards/UsersCard";
import CarouselKpi from "./DashboardCards/CarouselKpi";
import ConsumeCard from "./DashboardCards/ConsumeCard";
import CustomerModal from "./CustomerModal";
import { useAppSelector } from "../hooks";
import { CarouselWrapper, renderCarouselCard } from "./utils";
import { UserProps } from "../types";


const Dashboard = () => {
    const user = useAppSelector((state) => state.user.user)
    const organization = useAppSelector((state) => state.organization.organization)
    const buildings = useAppSelector((state) => state.allOrganization.allBuildings)
    const allUser = useAppSelector((state) => state.allUser.user)
    const [loading, setLoading] = useState(true)
    const [loadingRenew, setLoadingRenew] = useState(true)
    const [visible, setVisible] = useState(false)
    const [userPassed, setUserPassed] = useState<any | UserProps>({})
    const [kWhSum, setkWh] = useState(0)
    const [kWhCost, setkWhCost] = useState(0)
    const [gasSum, setGas] = useState(0)
    const [gasCost, setGasCost] = useState(0)
    const [waterSum, setWater] = useState(0)
    const [waterCost, setWaterCost] = useState(0)
    const [sold, setSold] = useState(0)
    const [totalGeo, setTotalGeo] = useState(0)
    const [totalWind, setTotalWind] = useState(0)
    const [totalSolar, setTotalSolar] = useState(0)
    const [totalHydro, setTotalHydro] = useState(0)
    const [totalRenew, setTotalRenew] = useState(0)
    const [cost, setCost] = useState<any>({})
    const [users, setUsers] = useState<Array<UserProps>>([])

    const getKpi = async (id: any) => {
        let kWh = 0
        let gas = 0
        let water = 0
        const tmpCost: any = {}
        try {
            await api.bills.getBillsAggregated(id).then(res => {
                if (organization?.type?.includes("Electric")) {
                    organization.details.electric.forEach((el: any) => {
                        if (el.name === "Electricity Cost at kWh")
                            kWh += res.totalElectric * 0.0833333 / 1000 * el.price
                        if (el.name === "Electricity Supplier Cost" || el.name === "Electricity Delivery Cost") {
                            kWh += el.price
                            tmpCost[el.name] = el.price
                        }
                        if (el.name === "Electricity Tax Percentage")
                            kWh += (res.totalElectric * el.price / 100)
                    });
                    setkWh((old) => old + res.totalElectric)
                    setkWhCost((old) => old + Number(kWh))
                }
                if (organization?.type?.includes("Gas")) {
                    organization.details.gas.forEach((el: any) => {
                        if (el.name === "Gas Cost at m³")
                            gas += res.totalGas * 0.0454249414 / 1000 * el.price
                        if (el.name === "Supplier Gas Cost" || el.name === "Gas Delivery Cost") {
                            gas += el.price
                            tmpCost[el.name] = el.price
                        }
                        if (el.name === "Gas Tax Percentage")
                            gas += (res.totalGas * el.price / 100)
                    });
                    setGas((old) => old + res.totalGas)
                    setGasCost((old) => old + Number(gas))
                }
                if (organization?.type?.includes("Water")) {
                    organization.details.water.forEach((el: any) => {
                        if (el.name === "Water Cost at m³")
                            water += res.totalWater * 0.0001666667 * el.price
                        if (el.name === "Water Supplier Cost" || el.name === "Water Delivery Cost") {
                            water += el.price
                            tmpCost[el.name] = el.price
                        }
                        if (el.name === "Water Tax Percentage")
                            water += (res.totalWater * el.price / 100)
                    });
                    setWater((old) => old + res.totalWater)
                    setWaterCost((old) => old + Number(water))
                }
                setCost(tmpCost)
            })
            await api.renewable.fetchResourcesByOrganizationId(organization._id).then(res => {
                let sum = 0
                res.map((el: any) => sum += el.buildings.length)
                setSold(sum)
            })

            await api.bills.getBillsByOrganizationIdAggregated(organization._id).then(res => {
                let solar = 0
                let geo = 0
                let wind = 0
                let hydro = 0
                setLoadingRenew(true)
                res.result.map((el: any) => {
                    const filter = buildings.find((build: any) => build._id === el.buildingId)
                    filter?.resources?.map((element: any) => {
                        el.bills.map((bill: any) => {
                            bill.resources.map((resource: any) => {
                                if (Object.keys(resource)[0].includes("Solar") && Object.keys(element)[0].includes("Solar")) {
                                    solar += Number(Object.values(resource))
                                }
                                if (Object.keys(resource)[0].includes("Wind") && Object.keys(element)[0].includes("Wind")) {
                                    wind += Number(Object.values(resource))
                                }
                                if (Object.keys(resource)[0].includes("Hydro") && Object.keys(element)[0].includes("Hydro")) {
                                    hydro += Number(Object.values(resource))
                                }
                                if (Object.keys(resource)[0].includes("Geo") && Object.keys(element)[0].includes("Geo")) {
                                    geo += Number(Object.values(resource))
                                }
                            })
                        })
                        setTotalGeo(geo / 1000)
                        setTotalHydro(hydro / 1000)
                        setTotalWind(wind / 1000)
                        setTotalSolar(solar / 1000)
                        setTotalRenew((geo + hydro + solar + wind) / 1000)
                    })
                })
                setTimeout(() => {
                    setLoadingRenew(false)
                }, 1000);
            })
        } catch (error) {
            console.log("Error")
        }
    }

    useEffect(() => {
        const tmp = users
        if (organization === null || organization === undefined)
            return
        organization.customers?.forEach(async (element: any) => {
            const res = allUser.find((el) => el._id === element.user)
            if (res != undefined && !tmp.includes(res)) {
                tmp.push(res)
                await getKpi(element.user).then(() => setLoading(false)).catch(() => setLoading(false))
            }
        });
        setUsers(tmp)
    }, [organization, buildings])

    return (
        <Layout
            style={{
                paddingRight: 24,
                paddingLeft: 24,
                minHeight: 280,
                marginTop: "32px"
            }}
        >
            <h1 style={{ fontSize: "24px", }}>Welcome back, {user.name} 👋</h1>
            <p style={{ color: "#636e72", fontSize: "14px", lineHeight: "21px" }}>Your current status and analytics are here</p>
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <Card style={{ borderRadius: 20 }}>
                        <CarouselKpi loading={loading}
                            waterCost={waterCost}
                            gasCost={gasCost}
                            kWhCost={kWhCost}
                            waterSum={waterSum}
                            gasSum={gasSum}
                            kWhSum={kWhSum}
                            sold={sold}
                            renewable={totalRenew}
                        />
                        <Divider />
                        <p style={{ fontSize: 18, fontWeight: 500 }}>Customers List</p>
                        <UsersCard
                            openModal={(user: UserProps) => {
                                setUserPassed(user)
                                setVisible(true)
                            }} />
                    </Card>
                </Col>
                <Col md={16} xs={24} sm={24}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
                            <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>Organization Overview </p>
                            <span className="anticon iconfont" style={{ color: "#1196db" }}>&#xe7a7;</span>
                        </Row>
                        <ConsumeCard />
                    </Card>
                </Col>
                <Col md={8} xs={24} sm={24}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
                            <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>Organization Total Cost</p>
                            <span className="anticon iconfont" style={{ color: "#1196db" }}>&#xe71b;</span>
                        </Row>
                        <Row>
                            {Object.keys(cost).map((el: any) =>
                                <Col span={12}>
                                    <Statistic title={el} value={cost[el] * users.length} suffix="€" precision={2} />
                                </Col>
                            )}
                        </Row>
                    </Card>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", marginTop: 32 }}>
                        <Row justify="space-between" align="middle">
                            <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>Organization Total Production</p>
                            <span className="anticon iconfont" style={{ color: "#1196db", }}>&#xe64f;</span>
                        </Row>
                        <CarouselWrapper style={{ justifyContent: "center" }} autoplay={!loadingRenew}>
                            {renderCarouselCard(loadingRenew, { icon: "", title: "Total Solar Production", value: totalSolar })}
                            {renderCarouselCard(loadingRenew, { icon: "", title: "Total Hydro Production", value: totalHydro })}
                            {renderCarouselCard(loadingRenew, { icon: "", title: "Total Windy Production", value: totalWind })}
                            {renderCarouselCard(loadingRenew, { icon: "", title: "Total Geothermic Production", value: totalGeo })}
                        </CarouselWrapper>
                    </Card>

                </Col>
            </Row>
            <CustomerModal visible={visible} setVisible={setVisible} user={userPassed} />
        </Layout>
    );
}
export default () => <Dashboard />
