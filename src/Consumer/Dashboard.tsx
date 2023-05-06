import { useEffect } from "react";
import { Avatar, Col, Layout, Row, } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProCard } from "@ant-design/pro-components";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getBillsAggregated, getBillsRenewable, getData, statebar } from "./utils";
import { useAppSelector } from "../hooks";
import { avatarImages } from "../globalUtils";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import BannerCard from "./DashboardCards/BannerCard";
import LineCard from "./DashboardCards/LineCard";
import StatsCard from "./DashboardCards/StatsCard";
import ExpensiveChart from "./DashboardCards/ExpensiveChart";
import TableCard from "./DashboardCards/TableCard";
import RevenueCard from "./DashboardCards/RevenueCard";
import EarningsCard from "./DashboardCards/EarningsCard";
import DownloadCard from "./DashboardCards/DownloadCard";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.user)
  const buildings = useAppSelector((state) => state.buildings.buildings)
  const [bills, setBills] = useState<any>({})
  const [totalRen, setTotalRen] = useState(0)
  const [energy, setEnergy] = useState({
    gas: { name: "Gas", data: [0] },
    water: { name: "Water", data: [0] },
    electric: { name: "Electric", data: [0] },
    solar: { name: "Solar", data: 0 },
    wind: { name: "Wind", data: 0 },
    hydro: { name: "Hydro", data: 0 },
    geo: { name: "Geo", data: 0 },
  });

  const navigate = useNavigate();


  useEffect(() => {
    if (buildings === null || buildings === undefined) return

    const ids = Object.values(buildings).filter((el: any) =>
      el.resources.length !== 0).map((el: any) => el._id)

    getBillsAggregated(user._id, setBills, energy, setEnergy)

    ids.forEach(id => getBillsRenewable(id, buildings, energy, setEnergy, setTotalRen))
  }, [user, buildings])

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
        <Col lg={18} md={24} xs={24}>
          <Row gutter={[0, 32]}>
            <BannerCard name="Get exclusive discounts for your bills" />
            <LineCard data={getData(bills)} />
          </Row>
          <Row justify="center" gutter={[32, 32]} style={{ marginTop: "32px" }}>
            <Col lg={8} md={8} xs={8} >
              <StatsCard
                color={"#ebfafa"}
                chart={<ReactApexChart options={statebar("Water", "#008ffb").options as ApexOptions}
                  series={[energy.water] as ApexAxisChartSeries}
                  type="bar" height={150} />}
              />
            </Col>
            <Col lg={8} md={8} xs={8}>
              <StatsCard
                color={"#fff9e9"}
                chart={<ReactApexChart
                  options={statebar("Electric", "#ffcf45").options as ApexOptions}
                  series={[energy.electric] as ApexAxisChartSeries}
                  type="bar" height={150} />}
              />
            </Col>
            <Col lg={8} md={8} xs={8}>
              <StatsCard
                color={"#ebfafa"}
                chart={
                  <ReactApexChart
                    options={statebar("Gas", "#19e396").options as ApexOptions}
                    series={[energy.gas] as ApexAxisChartSeries} type="bar"
                    height={150} />}
              />
            </Col>
          </Row>

          <Row style={{ marginTop: "32px" }}>
            <ProCard bordered style={{
              borderRadius: "10px"
            }}>
              <Row justify="space-between" align="middle" >
                <Col span={12}>
                  <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Our Organization</h4>
                  <Row justify="center" align="top">
                    <Col span={24}>
                      <p style={{ margin: 0 }}>Highest saved this month:</p>
                    </Col>
                    <Col span={24}>
                      <b style={{ fontSize: 22 }}>442.98€</b>
                    </Col>
                  </Row>
                </Col>
                <Col span={8} style={{ marginRight: 32 }}>
                  <p>Check <a>TrackER</a> Organization and more</p>
                  <Row justify="space-between" align="middle" gutter={[32, 32]}>
                    <Avatar size={40} src={avatarImages['Avatar-1.svg']} />
                    <Avatar size={40} src={avatarImages['Avatar-2.svg']} />
                    <Avatar size={40} src={avatarImages['Avatar-3.svg']} />
                    <Avatar size={40} src={avatarImages['Avatar-4.svg']} />
                    <Avatar size={40} src={avatarImages['Avatar-5.svg']} />
                    <Avatar size={40} src={avatarImages['Avatar-6.svg']} />
                    <ArrowRightOutlined style={{ fontSize: 22, color: "blue" }} onClick={() => navigate("/Organizations")} />
                  </Row>
                </Col>
              </Row>
            </ProCard>
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <EarningsCard
              series={[energy.solar, energy.hydro, energy.wind, energy.geo]}
              total={Number((totalRen / 1000).toFixed(2))}
            />
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <TableCard buildings={buildings} />
          </Row>
        </Col>
        <Col lg={6} md={24} xs={24}>
          <Row gutter={[8, 32]} justify="center" align="middle">
            <ExpensiveChart bills={bills} />
            <DownloadCard />
            <RevenueCard bills={bills.aggregated} />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
export default () => <Dashboard />
