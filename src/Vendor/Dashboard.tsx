import { Card, Col, Divider, Layout, Row, Statistic, } from "antd";
import { useEffect, useState } from "react";
import api from "../api"
import UsersCard from "./DashboardCards/UsersCard";
import CarouselKpi from "./DashboardCards/CarouselKpi";
import ConsumeCard from "./DashboardCards/ConsumeCard";
import CustomerModal from "./CustomerModal";
import { useAppSelector } from "../hooks";
import { CarouselWrapper, getBillsAggregated, getBillsByOrganizationIdAggregated, renderCarouselCard } from "./utils";
import { UserProps } from "../types";
import IconFont from "../Iconfont";


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
        if (id !== undefined && id !== "undefined") {
            try {
                getBillsAggregated(id, organization, setkWh, setkWhCost, setGas, setGasCost, setWater, setWaterCost, setCost, setSold)
                await api.renewable.fetchResourcesByOrganizationId(organization._id).then(res => {
                    let sum = 0
                    res.map((el: any) => sum += el.buildings.length)
                    setSold(sum)
                })
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                    setLoadingRenew(false)
                    setLoading(false)
                }, 1000);
            }
        }
    }

    useEffect(() => {
        getBillsByOrganizationIdAggregated(organization._id, buildings).then((data: any) => {
            setTotalGeo(data.geo)
            setTotalHydro(data.hydro)
            setTotalWind(data.wind)
            setTotalSolar(data.solar)
            setTotalRenew(data.geo + data.hydro + data.solar + data.wind)
        })
    }, [])

    useEffect(() => {
        setLoadingRenew(true)
        setLoading(true)
        const tmp = users
        if (organization === null || organization === undefined)
            return
        organization.customers?.forEach(async (customer) => {
            const res = allUser.find((el) => el._id === customer.user)
            if (res != undefined && !tmp.includes(res)) {
                tmp.push(res)
                getKpi(customer.user)
            }
        });
        setUsers(tmp)
    }, [organization, buildings, allUser])


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
                        <CarouselKpi
                            loading={loading}
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
                            <IconFont type="i-speed" style={{ color: "#1196db", fontSize: 30 }} />
                        </Row>
                        <ConsumeCard />
                    </Card>
                </Col>
                <Col md={8} xs={24} sm={24}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
                            <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>Organization Total Cost</p>
                            <IconFont type="i-money-euro-circle-line" style={{ color: "#1196db", fontSize: 30 }} />
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
                            <IconFont type="i-green-energy" style={{ color: "#1196db", fontSize: 30 }} />
                        </Row>
                        <CarouselWrapper style={{ justifyContent: "center" }} autoplay={!loadingRenew}>
                            {renderCarouselCard(loadingRenew, { icon: "i-solar-panels", title: "Total Solar Production", value: totalSolar })}
                            {renderCarouselCard(loadingRenew, { icon: "i-hydro-power", title: "Total Hydro Production", value: totalHydro })}
                            {renderCarouselCard(loadingRenew, { icon: "i-turbine", title: "Total Windy Production", value: totalWind })}
                            {renderCarouselCard(loadingRenew, { icon: "i-ecology", title: "Total Geothermic Production", value: totalGeo })}
                        </CarouselWrapper>
                    </Card>

                </Col>
            </Row>
            <CustomerModal visible={visible} setVisible={setVisible} user={userPassed} />
        </Layout>
    );
}
export default () => <Dashboard />
