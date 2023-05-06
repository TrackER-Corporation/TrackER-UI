import { Avatar, Col, Layout, Row, } from "antd";
import { useEffect } from "react";
import BannerCard from "./DashboardCards/BannerCard";
import ReactApexChart from "react-apexcharts";
import LineCard from "./DashboardCards/LineCard";
import StatsCard from "./DashboardCards/StatsCard";
import { getData, statebar } from "./utils";
import ExpensiveChart from "./DashboardCards/ExpensiveChart";
import { ProCard } from "@ant-design/pro-components";
import { ArrowRightOutlined } from "@ant-design/icons";
import TableCard from "./DashboardCards/TableCard";
import RevenueCard from "./DashboardCards/RevenueCard";
import EarningsCard from "./DashboardCards/EarningsCard";
import DownloadCard from "./DashboardCards/DownloadCard";
import api from "../api";
import { useState } from "react";
import moment from "moment"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { ApexOptions } from "apexcharts";
import { avatarImages } from "../globalUtils";



const Dashboard = () => {
  const user = useAppSelector((state) => state.user.user)
  const buildings = useAppSelector((state) => state.buildings.buildings)
  const [bills, setBills] = useState<any>({})
  const [gas, setGas] = useState({})
  const [water, setWater] = useState({})
  const [electric, setElectric] = useState({})
  const day = moment().subtract(31, 'days');
  const [solar, setSolar] = useState({})
  const [wind, setWind] = useState({})
  const [hydro, setHydro] = useState({})
  const [geo, setGeo] = useState({})
  const [totalRen, setTotalRen] = useState(0)

  const navigate = useNavigate();

  const getBillsRenewable = async (id: string) => {
    await api.bills.getBillsRenewable(id).then(res => {

      const type = Object.values(buildings).filter((el) => el._id === id)
      let sumSolar = 0
      let sumWind = 0
      let sumHydro = 0
      let sumGeo = 0
      type.forEach((el) => el.resources?.forEach((el: any) => {
        switch (Object.keys(el)[0]) {
          case "Solar":
            sumSolar += res.totalSolar
            break;
          case "Hydro":
            sumHydro += res.totalHydro
            break;
          case "Wind":
            sumWind += res.totalWind
            break;
          case "Geo":
            sumGeo += res.totalGeo
            break;
          default:
            break
        }
      }))
      setSolar({ name: "Solar", data: [sumSolar] })
      setHydro({ name: "Hydro", data: [sumHydro] })
      setGeo({ name: "Geo", data: [sumGeo] })
      setWind({ name: "Wind", data: [sumWind] })
      setTotalRen(sumSolar + sumGeo + sumHydro + sumWind)
    })
  }

  const getBillsAggregated = async () => {
    await api.bills.getBillsAggregated(user._id).then(res => {
      console.log(res)
      setBills(res)
      let oldMoment = moment("01/01/17", "MM/D/YYYY")
      const billDates = Object.values(res.aggregated).filter((el: any) => moment(el.date).isBetween(day, undefined))
      let water: any = []
      let gas: any = []
      let electric: any = []
      let sumGas = 0
      let sumWater = 0
      let sumElectric = 0
      billDates.map((el: any) => {
        if (moment(el.date).isSame(oldMoment, "day")) {
          sumWater = +sumWater + +el.water
          sumElectric = +sumElectric + +el.electric
          sumGas = +sumGas + +el.gas
          oldMoment = el.date
        } else {
          water.push(Number(sumWater).toFixed(3))
          electric.push(Number(sumElectric).toFixed(3))
          gas.push(Number(sumGas).toFixed(3))
          sumWater = Number(el.water)
          sumElectric = Number(el.electric)
          sumGas = Number(el.gas)
          oldMoment = el.date
        }
      })
      electric.shift()
      gas.shift()
      water.shift()
      electric = electric.slice(-3)
      gas = gas.slice(-3)
      water = water.slice(-3)

      setWater({ name: "Water", data: water })
      setGas({ name: "Gas", data: gas })
      setElectric({ name: "Electric", data: electric })
    })
  }

  useEffect(() => {
    if (buildings === null || buildings === undefined)
      return
    const ids = Object.values(buildings).filter((el: any) => el.resources.length !== 0).map((el: any) => el._id)
    getBillsAggregated()
    ids.forEach(id => getBillsRenewable(id))
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
                  series={[water] as ApexAxisChartSeries}
                  type="bar" height={150} />}
              />
            </Col>
            <Col lg={8} md={8} xs={8}>
              <StatsCard
                color={"#fff9e9"}
                chart={<ReactApexChart
                  options={statebar("Electric", "#ffcf45").options as ApexOptions}
                  series={[electric] as ApexAxisChartSeries}
                  type="bar" height={150} />}
              />
            </Col>
            <Col lg={8} md={8} xs={8}>
              <StatsCard
                color={"#ebfafa"}
                chart={
                  <ReactApexChart
                    options={statebar("Gas", "#19e396").options as ApexOptions}
                    series={[gas] as ApexAxisChartSeries} type="bar"
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
            <EarningsCard series={[solar, hydro, wind, geo]} total={(totalRen / 1000).toFixed(2)} />
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
