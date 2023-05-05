import { Avatar, Button, Card, Drawer, Row, Tooltip } from "antd";
import { useState } from "react";
import { AccountSubTitle, AvatarHover } from "../Components/CustomComponents";
import { useAppDispatch, useAppSelector } from "../hooks";
import { avatarImages } from "../globalUtils";
import { confirmPreference } from "../accountUtils";

const AvatarDrawer = ({ user, visible, onClose }: any) => {
    const userPreference = useAppSelector((state) => state.preference.preference)
    const [current, setCurrent] = useState(userPreference.avatar)
    const dispatch = useAppDispatch()

    return (
        <Drawer title="Change Avatar" size="large" placement="right" open={visible} onClose={() => onClose()}>
            <Row justify="center">
                <Avatar size={200} src={current} />
            </Row>
            <AccountSubTitle style={{ textAlign: "center", marginTop: 10 }}>Avatar Preview</AccountSubTitle>
            <Card style={{ borderRadius: 20, marginTop: 20, boxShadow: "0 2px 2px #022cf7" }}>
                <Row justify="space-around" gutter={[16, 16]}>
                    <Tooltip title="Default Avatar">
                        <AvatarHover
                            data-testid="avatar1"
                            style={
                                current === "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                                    ? {} :
                                    { boxShadow: "0 2px 2px #000000" }}
                            size={60} src={"https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"}
                            onClick={() => setCurrent("https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png")} />
                    </Tooltip>
                    {[...Array(38)].map((_, i) =>
                        <Tooltip title={"Avatar-" + (i + 1)}>
                            <AvatarHover
                                data-testid={"avatar" + (i + 1)}
                                style={
                                    current === avatarImages['Avatar-' + (i + 1) + '.svg']
                                        ? {} :
                                        { boxShadow: "0 2px 2px #000000" }}
                                size={60} src={avatarImages['Avatar-' + (i + 1) + '.svg']}
                                onClick={() => setCurrent(avatarImages['Avatar-' + (i + 1) + '.svg'])} />
                        </Tooltip>
                    )}
                    <Tooltip title="No Avatar">
                        <AvatarHover
                            data-testid="avatar3"
                            style={
                                current === "" ? {} : { boxShadow: "0 2px 2px #000000" }}
                            size={60} src={""} onClick={() => setCurrent("")} />
                    </Tooltip>
                </Row>

            </Card>
            <Row justify="end" style={{ marginTop: 60 }}>
                <Button type="ghost" onClick={() => onClose()}>Cancel</Button>
                <Button
                    style={{ marginLeft: 20 }}
                    type="primary"
                    onClick={() => confirmPreference(userPreference, current, user, dispatch, onClose)}>
                    Change
                </Button>
            </Row>
        </Drawer>
    )
}
export default AvatarDrawer;