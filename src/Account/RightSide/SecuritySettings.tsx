import { QuestionCircleOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Popconfirm, Row, Switch } from "antd"
import { useState } from "react"
import { AccountSubTitle, AccountTitle, GreyParagraph } from "../../Components/CustomComponents"
import LoadingSpinner from "../../Components/LoadingSpinner"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { deleteAccount, updatePref } from "../../accountUtils"

const SecuritySettings = ({ user, updateRoute, socket }: any) => {

    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false)
    const checked = useAppSelector((state) => state.preference.preference.activityLog)

    return (
        <div>
            {show && <LoadingSpinner message="Deleting your information..." />}
            <Col>
                <AccountTitle>Security Settings</AccountTitle>
                <GreyParagraph>These settings are helps you keep your account secure.</GreyParagraph>
            </Col>
            <Divider />
            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Save my Activity Logs</AccountSubTitle>
                    <GreyParagraph>You can save your all activity logs including unusual activity detected.</GreyParagraph>
                </Col>
                <Col style={{ marginRight: "20px" }}>
                    <Switch data-testid="switch" defaultChecked={checked} onChange={(val) => updatePref(val, user, dispatch)} />
                </Col>
            </Row>
            <Divider />
            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Change Password</AccountSubTitle>
                    <GreyParagraph>Set a unique password to protect your account.</GreyParagraph>
                </Col>
                <Col>
                    <Button
                        onClick={() => { updateRoute() }}
                        type="primary" style={{ borderRadius: 6, marginRight: "20px", height: 40 }}>Change Password</Button>
                </Col>
            </Row>
            <Divider />
            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Delete your Account</AccountSubTitle>
                    <GreyParagraph>Remove your account and your personal information from the network.</GreyParagraph>
                </Col>
                <Col>
                    <Popconfirm icon={<QuestionCircleOutlined style={{ color: 'red' }} />} title="Are you sure? This action is not reversible" okText="Yes" cancelText="No" onConfirm={() => deleteAccount(user, dispatch, setShow)}>
                        <Button danger style={{ borderRadius: 6, marginRight: "20px", height: 40 }}>Delete Account</Button>
                    </Popconfirm>
                </Col>
            </Row>

        </div >
    )
}
export default SecuritySettings