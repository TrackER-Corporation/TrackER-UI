import { Col, Modal, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import ResourcesModal from "./Resources/ResourcesModal"
import IconFont from "../../Iconfont"
import { RenewableCardRender, getAllDataRenewable, renderRenewableData } from "./utils"
import { EnergyType } from "../../types"

interface RenewableCards {
    item: any,
    bills: any,
    resources: any
}

const RenewableCards = ({ item, bills, resources }: RenewableCards) => {
    const [visible, setVisible] = useState(false)
    const [visibleResource, setVisibleResource] = useState(false)
    const [filter, setFilter] = useState<EnergyType>("Solar")
    const [geoSum, setGeoSum] = useState(0)
    const [hydroSum, setHydroSum] = useState(0)
    const [windSum, setWindSum] = useState(0)
    const [solarSum, setSolarSum] = useState(0)
    const [totalSum, setTotalSum] = useState(0)
    const [allBills, setAllBills] = useState<any>([])
    const [deviceEarning, setDeviceEarning] = useState(0)
    const [deviceCost, setDeviceCost] = useState(0)
    const [metric, setMetric] = useState(true)

    useEffect(() => {
        setAllBills([])
        getAllDataRenewable(
            resources,
            bills,
            item,
            filter,
            setHydroSum,
            setSolarSum,
            setWindSum,
            setGeoSum,
            setTotalSum,
            setDeviceEarning,
            setDeviceCost,
            setAllBills
        )
    }, [filter])

    return (
        <Row justify="center" gutter={[32, 32]}>
            <Col span={24}>
                <Statistic title="Total Energy Production"
                    value={
                        metric ? (solarSum + geoSum + hydroSum + windSum) / 1000 :
                            (solarSum + geoSum + hydroSum + windSum)
                    }
                    suffix={metric ? "KiloWatt (kW)" : "Watt"} precision={2} />
                <Row align="middle">
                    <IconFont
                        type="i-arrow_up_down_circle"
                        onClick={() => setMetric(!metric)}
                        style={{ color: "blue", marginRight: 6, cursor: "pointer" }}
                    />
                    <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>
                        {!metric ? "Total in Kilowatt (kW)" : "Total in Watt (W)"}
                    </p>
                </Row>
            </Col>
            {RenewableCardRender("Total Solar Production", solarSum, metric, "Solar", "i-solar-panels", setFilter, setVisible)}
            {RenewableCardRender("Total Hydro Production", hydroSum, metric, "Hydro", "i-hydro-power", setFilter, setVisible)}
            {RenewableCardRender("Total Windy Production", windSum, metric, "Wind", "i-turbine", setFilter, setVisible)}
            {RenewableCardRender("Total Geothermic Production", geoSum, metric, "Geo", "i-ecology", setFilter, setVisible)}
            <Modal
                destroyOnClose
                open={visible}
                onCancel={() => setVisible(false)}
                width={800}
                title={"Total " + filter + " Production"}
            >
                {renderRenewableData(
                    filter,
                    metric,
                    totalSum,
                    deviceEarning,
                    deviceCost,
                    allBills,
                    setMetric,
                    setVisibleResource
                )}
            </Modal>
            <ResourcesModal
                defaultActiveKey={filter}
                building={item}
                visible={visibleResource}
                setVisible={setVisibleResource}
                data={item.resources}
            />
        </Row >
    )
}
export default RenewableCards