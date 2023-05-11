import { Breadcrumb, Card, Col, Layout, Row } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ResourcesCard from "./ResourcesCard"
import ResourcesModal from "./ResourcesModal"
import { electricOptions, geoOptions, waterOptions, windOptions } from "./utils"
import { PageHeader } from "@ant-design/pro-components"

const Resources = () => {
    let navigate = useNavigate()
    const organization = useSelector((state:any) => state.organization.organization)
    const [resources, setResources] = useState(organization.details.resources)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState<any>({})
    const [options, setOptions] = useState<any>([])

    useEffect(() => {
        if (organization === null || organization.details === undefined)
            return
        setResources(organization.details.resources)
    }, [organization])

    const setProps = (data:any) => {
        setData(data)
        setVisible(true)
        if (data.name.includes("Solar"))
            setOptions(electricOptions)
        if (data.name.includes("Geo"))
            setOptions(geoOptions)
        if (data.name.includes("Wind"))
            setOptions(windOptions)
        if (data.name.includes("Hydro"))
            setOptions(waterOptions)
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
                title="Resources Details"
                subTitle="Check your energy resources sales"
                onBack={() => navigate("/Dashboard")}
            />
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <p style={{ fontSize: 18, fontWeight: 500 }}>Create and check your energy resources offer</p>
                <Row justify="center" gutter={[32, 32]}>
                    {resources.map((el:any) =>
                        <Col md={12} sm={24} xs={24}>
                            <ResourcesCard element={el} onClick={() => setProps(el)} />
                        </Col>
                    )}
                </Row>

            </Card>
            <ResourcesModal visible={visible} setVisible={setVisible} data={data} options={options} />
        </Layout>
    )
}
export default Resources