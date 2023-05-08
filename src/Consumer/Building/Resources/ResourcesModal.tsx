import { Modal, Tabs } from "antd"
import ResourcesContent from "./ResourcesContent"
import { getKey } from "./utils"
import IconFont from "../../../Iconfont"

interface ResourcesModal {
    defaultActiveKey?: string,
    building: any,
    visible: boolean,
    setVisible: (arg: boolean) => void,
    data: any
}


const ResourcesModal = ({ defaultActiveKey = "1", building, visible, setVisible, data }: ResourcesModal) =>
    <Modal
        destroyOnClose
        zIndex={1000}
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1200}
    >
        <Tabs defaultActiveKey={getKey(defaultActiveKey)} centered size="large">
            <Tabs.TabPane tab={<><IconFont type="i-solar-panels" />Solar</>} key="1">
                <ResourcesContent data={data} type="Solar" building={building} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><IconFont type="i-ecology" />Geo</>} key="2" >
                <ResourcesContent data={data} type="Geo" building={building} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><IconFont type="i-turbine" />Windy</>} key="3">
                <ResourcesContent data={data} type="Wind" building={building} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><IconFont type="i-hydro-power" />Hydro</>} key="4">
                <ResourcesContent type="Hydro" data={data} building={building} />
            </Tabs.TabPane>
        </Tabs>
    </Modal>
export default ResourcesModal