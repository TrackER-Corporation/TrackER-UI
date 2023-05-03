import { InboxOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Drawer, Row, Spin } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { useState } from "react";
import { AccountSubTitle } from "../Components/CustomComponents";
import ImgCrop from 'antd-img-crop';
import { useAppDispatch, useAppSelector } from "../hooks";
import { confirm, draggerProps } from "../accountUtils";
import { uploadImage } from "../globalUtils";

const OrganizationDrawer = ({ user, visible, onClose }: any) => {
    const userPreference = useAppSelector((state) => state.preference.preference)
    const organization = useAppSelector((state) => state.organization.organization)
    const [current, setCurrent] = useState(userPreference.avatar)
    const dispatch = useAppDispatch()
    return (
        <Drawer
            title="Change Organization Logo"
            size="large"
            placement="right"
            open={visible}
            onClose={() => onClose()}>
            <Row justify="center">
                <Avatar size={200} src={current} />
            </Row>
            <AccountSubTitle style={{ textAlign: "center", marginTop: 10 }}>Organization Logo Preview</AccountSubTitle>
            <Card style={{ borderRadius: 20, marginTop: 20, boxShadow: "0 2px 2px #022cf7", }}>
                <ImgCrop cropShape="round"
                    minZoom={0}
                    quality={1}
                    showGrid>
                    <Dragger {...draggerProps}
                        iconRender={(data) => data.status === "done" ? null : <Spin />}
                        style={{ minHeight: 200, borderColor: "blue" }}
                        customRequest={(data) => uploadImage(data, setCurrent)}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint" style={{ marginTop: 22 }}>
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                </ImgCrop>
            </Card>
            <Row justify="end" style={{ marginTop: 60 }}>
                <Button type="ghost" onClick={() => onClose()}>Cancel</Button>
                <Button
                    style={{ marginLeft: 20 }}
                    type="primary"
                    onClick={() => confirm(user, organization, current, dispatch, onClose)}>
                    Change
                </Button>
            </Row>
        </Drawer>
    )
}
export default OrganizationDrawer;