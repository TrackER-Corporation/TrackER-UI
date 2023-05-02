import { Col, Divider, message, Row, Switch } from "antd"
import api from "../../api"
import { AccountSubTitle, AccountTitle, GreyParagraph } from "../../Components/CustomComponents"
import { updatePreference } from "../../reducers/preference"
import { AccountActivity } from "../../types"
import { useAppDispatch } from "../../hooks"
import { setNotification } from "../../accountUtilis"

const AccountNotification = ({ user }: AccountActivity) => {
    const dispatch = useAppDispatch()

    return (
        <div>
            <Col>
                <AccountTitle>Notification Settings</AccountTitle>
                <GreyParagraph>Set up your notifications preferences.</GreyParagraph>
            </Col>
            <Divider />

            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Mails notifications</AccountSubTitle>
                    <GreyParagraph>Receive mails about your account operation.</GreyParagraph>
                </Col>
                <Col style={{ marginRight: "20px" }}>
                    <Switch onClick={(type) => setNotification({ notification: type }, user, dispatch)} />
                </Col>
            </Row>
            <Divider />

            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Newsletter update</AccountSubTitle>
                    <GreyParagraph>Notify me by email about sales and latest news of TrackER.</GreyParagraph>
                </Col>
                <Col style={{ marginRight: "20px" }}>
                    <Switch onClick={(type) => setNotification({ news: type }, user, dispatch)} />
                </Col>
            </Row>
        </div>
    )
}
export default AccountNotification