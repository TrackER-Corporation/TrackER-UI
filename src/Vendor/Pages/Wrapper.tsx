import { PageHeader } from "@ant-design/pro-components";
import { Breadcrumb, Card, Carousel, Col, Divider, Layout, Row, Statistic } from "antd";
import { NavigateFunction } from "react-router-dom";
import CustomerDrawerComp from "../CustomerDrawer";
import { CustomerDrawer } from "../../types";
import IconFont from "../../Iconfont";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import CustomersBuildingTable from "../CustomersBuildingTable";
import { columns, options, optionsBar, optionsLine } from "./utils";

interface WrapperProps {
    title: string,
    navigate: NavigateFunction,
    drawer: CustomerDrawer,
    pages: any
}

const getData = (data: any, allBuildings:any) => {
    if (data === undefined)
        return []
    return data.map((build: any) => allBuildings
        .find((el: any) => el._id === build.buildingId))
        .filter((res: any) => res != undefined)
}

const Wrapper = (
    { title, navigate, drawer, pages }: WrapperProps
) =>
    <Layout
        className="site-layout-background"
        style={{
            paddingLeft: 24,
            paddingRight: 24,
        }}
    >
        <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
            <Breadcrumb
                items={[
                    {
                        title: 'Home',
                    },
                    {
                        title: <a>{window.location.pathname.split("/")[1]}</a>
                    }
                ]}
            />
        </Row>
        <PageHeader
            style={{ paddingLeft: 0 }}
            className="site-page-header"
            title={title}
            subTitle="Check your supplier earnings and productions"
            onBack={() => navigate("/Dashboard")}
        />
        <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                    <Row align="middle" gutter={[32, 32]} >
                        <Col md={6} sm={12}>
                            <Statistic title={pages.title}
                                value={pages.metricCubic ? Number(pages.sum) * 0.0833333 / 1000 : pages.sum}
                                suffix={pages.metricCubic ? pages.metricSwap[0] : pages.metricSwap[1]}
                                precision={2}
                            />
                            <Row align="middle">
                                <IconFont onClick={() => pages.setMetric(!pages.metricCubic)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} className="anticon iconfont" type="i-arrow_up_down_circle" />
                                <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>
                                    {!pages.metricCubic ? pages.metricSwap[0] : pages.metricSwap[1]}
                                </p>
                            </Row>
                        </Col>
                        <Col md={6} sm={12} style={{ height: 90 }} >
                            <Statistic title="Total Energy Earning" value={pages.totalEarning} suffix={"Euro (€)"} precision={2} />
                        </Col>
                        <Col md={6} sm={12} style={{ height: 90 }} >
                            <Statistic title="Total Delivery Cost" value={pages.delivery} suffix={"Euro (€)"} precision={2} />
                        </Col>
                        <Col md={6} sm={12} style={{ height: 90 }} >
                            <Carousel autoplay dots={false} autoplaySpeed={3500}>
                                <Statistic title="Total Tax Cost" value={pages.totalTaxCost.toFixed(2)} suffix={"Euro (€)"} precision={2} />
                                <Statistic title="Total Supplier Cost" value={pages.supplier} suffix={"Euro (€)"} precision={2} />
                            </Carousel>
                        </Col>
                    </Row>
                    <Divider />

                    <Row style={{ marginTop: 32 }} justify="center" align="middle">
                        <Col span={24}>
                            <p style={{ fontSize: 18, fontWeight: 500 }}>{pages.usage}</p>
                            <ReactApexChart
                                options={optionsLine as ApexOptions}
                                series={pages.allLine}
                                type="line"
                                height={320} />
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginTop: 32 }} justify="space-between" align="middle">
                        <Col md={10} sm={24} xs={24}>
                            <p style={{ fontSize: 18, fontWeight: 500 }}> Profit</p>
                            <ReactApexChart options={optionsBar} series={[pages.series]} type="bar" height={250} />
                        </Col>
                        <Col md={12} sm={24} xs={24}>
                            <p style={{ fontSize: 18, fontWeight: 500 }}>Buildings {pages.usage}</p>
                            <ReactApexChart options={options(pages.labels, pages.metricCubic, pages.unit) as ApexOptions} series={pages.all} type="polarArea" />
                        </Col>
                        <Col span={24} style={{ marginTop: 32 }}>
                            <CustomersBuildingTable
                                headerTitle="Organization Building Electric Overview"
                                columns={columns(pages.setVisible, pages.setBuildingId)}
                                data={getData(pages.resultBills.result, pages.allBuildings)} />
                        </Col>
                    </Row>
                </Card>
        <CustomerDrawerComp {...drawer}/>
    </Layout>

export default Wrapper