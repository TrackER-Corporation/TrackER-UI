import { Card, Col, Layout, Row, Statistic, Tabs } from "antd"
import { useState } from "react"
import { PageHeader } from "@ant-design/pro-components"
import { useAppSelector } from "../../hooks"
import { fetchResources, getIcon, getTotal, renderIcon } from "../utils"
import Empty from "../../Components/Empty"

const BuildingsProductionCard = () => {
    const buildings = useAppSelector(state => state.buildings.buildings)
    const [resourceApi, setResourceApi] = useState<Array<any>>([])
    const [build, setBuild] = useState<string>("")
    const [bills, setBills] = useState<any>({})

    const renderData = (buildingId: string) => {
        fetchResources(buildingId, build, setBuild, setResourceApi, setBills)
        return resourceApi.map((resources: any) => {
            const totPrice = resources.earning * getTotal(resources.resourcesType, bills)
            return (
                Object.keys(resources).length !== 0 && Object.keys(bills).length !== 0 &&
                <Col span={12}>
                    <Card style={{ borderRadius: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
                        title={getIcon(resourceApi)}>
                        <Row justify="space-around" align="top">
                            <Statistic
                                title={`Total ${resources.resourcesType} Production`}
                                value={getTotal(resources.resourcesType, bills)}
                                suffix={"kWh"}
                                precision={2} />
                            <Statistic title={`Total Earnings`} value={totPrice} suffix={"€"} precision={2} />
                        </Row>
                    </Card>
                </Col>
            )
        })
    }

    return (
        <Layout
            className="site-layout-background"
            style={{
                marginTop: 22,
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title={"Buildings Devices Production"}
                subTitle="Check your buildings energy earnings and productions"
            />
            <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                {Object.keys(buildings).length === 0 ?
                    <Empty description="No data to show" />
                    :
                    <Tabs onChange={(el) => { setBuild(el) }}>
                        {buildings.map((el) =>
                            <Tabs.TabPane tab={<>{renderIcon(el)}</>} key={el._id}>
                                {el.resources?.length === 0 ?
                                    <Empty
                                        description={<span>  This building has <a>NO resources installed</a> yet</span>}
                                    /> :
                                    <Row justify="space-between" align="top" gutter={[32, 32]}>
                                        {renderData(el._id)}
                                    </Row>
                                }
                            </Tabs.TabPane>
                        )}
                    </Tabs>}
            </Card>
        </Layout>
    )

}
export default BuildingsProductionCard