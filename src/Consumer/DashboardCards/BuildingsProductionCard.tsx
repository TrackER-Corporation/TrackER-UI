import { Card, Col, Empty, Layout, Row, Statistic, Tabs } from "antd"
import { useState } from "react"
import api from "../../api"
import { PageHeader } from "@ant-design/pro-components"
import { useAppSelector } from "../../hooks"
import IconFont from "../../Iconfont"

const BuildingsProductionCard = () => {
    const buildings = useAppSelector(state => state.buildings.buildings)
    const [resourceApi, setResourceApi] = useState<Array<any>>([])
    const [build, setBuild] = useState({})
    const [bills, setBills] = useState<any>({})


    const fetchResources = async (id: string) => {
        if (id === build)
            return
        setBuild(id)
        await api.renewable.fetchResourcesByBuildingId(id).then(res => setResourceApi(res))
        await api.bills.getBillsRenewable(id).then(res => setBills(res))
    }


    const renderIcon = (building: any) => {
        switch (building.type) {
            case "Residential":
                return <Row align="middle"> <IconFont type="i--house" /> {building.name}</Row>
            case "Factory":
                return <Row align="middle"><IconFont type="i-factory" /> {building.name} </Row >

            case "Skyscraper":
                return <Row align="middle"><IconFont type="i--skyline" /> {building.name} </Row >

            case "School":
                return <Row align="middle"><IconFont type="i-school" /> {building.name}</Row >

            case "University":
                return <Row align="middle"><IconFont type="i-university" /> {building.name} </Row >

            case "Hospital":
                return <Row align="middle"><IconFont type="i-ambulance" /> {building.name} </Row >

            case "Police Station":
                return <Row align="middle"><IconFont type="i-police" /> {building.name} </Row >

            case "Bank":
                return <Row align="middle"><IconFont type="i-bank" /> {building.name} </Row >

            case "Shopping Mall":
                return <Row align="middle"><IconFont type="i--shopping-mal" /> {building.name} </Row >

            case "Court":
                return <Row align="middle"><IconFont type="i-museum" /> {building.name} </Row >

            case "Airport":
                return <Row align="middle"><IconFont type="i-airport" /> {building.name} </Row >

            case "City Hall":
                return <Row align="middle"><IconFont type="i--orthodoxian" /> {building.name} </Row >
            default:
        }
    }

    const getIcon = (resources: any) => {
        if (resources.resourcesType === undefined)
            return
        if (resources.resourcesType.includes("Solar"))
            return (
                <Row justify="center" align="middle">
                    <h3 style={{ margin: 0, marginRight: 20, fontWeight: 500 }}>{resources.name}</h3>
                    <div >
                        <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe65f;</span>
                    </div>
                </Row>)
        if (resources.resourcesType.includes("Wind"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe661;</span>
        if (resources.resourcesType.includes("Geo"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe64b;</span>
        if (resources.resourcesType.includes("Hydro"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe650;</span>
    }

    const getTotal = (type: string | undefined) => {
        if (type === undefined)
            return 0
        if (type.includes("Solar"))
            return bills.totalSolar / 1000
        if (type.includes("Hydro"))
            return bills.totalHydro / 1000
        if (type.includes("Geo"))
            return bills.totalGeo / 1000
        if (type.includes("Wind"))
            return bills.totalWind / 1000
        return 0
    }

    const renderData = (buildingId: string) => {
        fetchResources(buildingId)
        return resourceApi.map((resources: any) => {
            const totPrice = resources.earning * getTotal(resources.resourcesType)
            return (
                Object.keys(resources).length !== 0 && Object.keys(bills).length !== 0 &&
                <Col span={12}>
                    <Card style={{ borderRadius: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }} title={getIcon(resourceApi)}>
                        <Row justify="space-around" align="top">
                            <Statistic
                                title={`Total ${resources.resourcesType} Production`}
                                value={getTotal(resources.resourcesType)}
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
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{ height: 100, }}
                                        description={<span>  This building has <a>NO resources installed</a> yet</span>}
                                    >
                                    </Empty> :
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