import { PageHeader } from "@ant-design/pro-components"
import { Breadcrumb, Card, Carousel, Col, Divider, Empty, Layout, Row, Statistic } from "antd"
import ReactApexChart from "react-apexcharts"
import { pieOptions } from "./utilsInvoices"
import IconFont from "../../Iconfont"

interface ChangeTitle {
    first: string,
    second: string
}

interface InvoicesWrapper {
    title: string,
    bills: any,
    multiplier: number,
    change: boolean,
    setChange: (arg: boolean) => void
    totalSum: number
    totalEarning: number
    delivery: number
    totalTaxCost: number,
    supplier: number
    chart: JSX.Element
    changeTitle: ChangeTitle
}

const InvoicesWrapper = ({
    title,
    bills,
    multiplier,
    totalSum,
    totalEarning,
    delivery,
    totalTaxCost,
    supplier,
    chart,
    change,
    setChange,
    changeTitle
}: InvoicesWrapper) => {


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
                title={title}
                subTitle="Check your supplier earnings and productions"
            />

            {Object.keys(bills).length === 0 ?
                <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                    < Empty />
                </Card>
                :
                <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                    <Row align="top" gutter={[32, 32]}>
                        <Col md={6} sm={12}>
                            <Statistic title={title.replace("Details", "Usage")}
                                value={change ? totalSum * multiplier : totalSum}
                                suffix={change ? changeTitle.first : changeTitle.second}
                                precision={4}
                            />
                            <Row align="middle">
                                <IconFont
                                    data-testid="test"
                                    type="i-arrow_up_down_circle"
                                    onClick={() => setChange(!change)}
                                    style={{ color: "blue", marginRight: 6, cursor: "pointer" }}
                                />
                                <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>
                                    {!change ? changeTitle.first : changeTitle.second}
                                </p>
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
                        {chart}
                    </Row>
                </Card>}
        </Layout>
    )
}

export default InvoicesWrapper