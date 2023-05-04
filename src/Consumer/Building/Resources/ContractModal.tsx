import { Checkbox, Col, Collapse, Modal, Row } from "antd"
import { useState } from "react"
import { check, eula, getExtra, privacy } from "./utils"
import { PageHeader } from "@ant-design/pro-components"
import { useAppSelector } from "../../../hooks"

interface ContractModal {
    visible: boolean,
    setVisible: (arg: boolean) => void,
    data: any,
    buildingId: string
}

const ContractModal = ({ visible, setVisible, data, buildingId }: ContractModal) => {
    const user = useAppSelector(state => state.user.user)
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)

    return (
        <Modal width={900}
            open={visible}
            onOk={() => { check(check1, check2, setVisible, data, buildingId, user) }}
            onCancel={() => setVisible(false)}
            destroyOnClose
        >
            <PageHeader
                title="Contract Rules"
                subTitle="Read and check the contract"
            />
            <Collapse defaultActiveKey={['1', "2"]} expandIconPosition="right" bordered={false}>
                <Collapse.Panel header={<h1>Terms of Service</h1>} key="1" extra={getExtra(true)}>
                    <Col span={24} style={{ overflow: "auto" }}>
                        {eula}
                        <Row justify="end" style={{ marginTop: 32 }}>
                            <Checkbox onChange={(e) => setCheck1(e.target.checked)}>
                                <p style={{ fontSize: 16 }}>I accept the <b>Terms of Service</b></p>
                            </Checkbox>
                        </Row>
                    </Col>
                </Collapse.Panel>
                <Collapse.Panel header={<h1>Privacy Policy</h1>} key="2" extra={getExtra()}>
                    <Col span={24} style={{ overflow: "auto" }}>
                        {privacy}
                        <Row justify="end" style={{ marginTop: 32 }}>
                            <Checkbox
                                onChange={(e) => setCheck2(e.target.checked)}>
                                <p style={{ fontSize: 16 }}>I agree to the <b>Privacy Policy</b></p>
                            </Checkbox>
                        </Row>
                    </Col>
                </Collapse.Panel>
            </Collapse>
        </Modal>
    )
}
export default ContractModal