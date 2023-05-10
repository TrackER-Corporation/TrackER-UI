import { InboxOutlined } from "@ant-design/icons"
import { Card, Col, Divider, message, Row, Spin } from "antd"
import ImgCrop from "antd-img-crop"
import TextArea from "antd/lib/input/TextArea"
import Dragger from "antd/lib/upload/Dragger"
import { Step2 } from "../../types"

const SecondStep = ({ name, setDescription, setIcon, description = "" }: Step2) => {

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

        onChange(info: any) {
            const { status } = info.file;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e: any) {
        },
    };

    const uploadImage = async (file: any) => { // file from <input type="file"> 
        const data = new FormData();
        data.append("file", file.file);
        data.append("upload_preset", "lazkktrh");
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/dgfnyulqh/image/upload`,
            {
                method: "POST",
                body: data,
            }
        );
        const img = await res.json();
        if (img) {
            file.onSuccess(img);
            setIcon(img.secure_url)
        }
        else {
            file.onError(img);
        }
    }
    return (
        <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", textAlign: "center", justifyContent: "center" }}>
            <p style={{ fontSize: 18, textAlign: "center" }}>Organization Name: <b>{name}</b></p>
            <Row justify="center" style={{ textAlign: "center" }} align="middle">
                <Col span={18} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <Row justify="space-between" align="middle">
                            <p>Upload Organization Logo</p>
                            <span className="iconfont anticon" style={{marginBottom:14}}>&#xe679;</span>
                        </Row>
                        <ImgCrop cropShape="round"
                            minZoom={0}
                            rotationSlider
                            quality={1}
                            showGrid>

                            <Dragger style={{ borderRadius: 20 }} {...props}
                                iconRender={(data) => data.status === "done" ? null : <Spin />}
                                customRequest={(data) => uploadImage(data)}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to upload your organization logo</p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                    band files
                                </p>
                            </Dragger>
                        </ImgCrop>
                    </Col>
                    <Divider />
                    <Col span={24} style={{ marginTop: 22 }}>
                        <Row justify="space-between" align="middle">
                            <p>Organization Description</p>
                            <span className="iconfont anticon" style={{marginBottom:14}}>&#x100de;</span>
                        </Row>
                        <TextArea style={{height:220}} showCount maxLength={1000} title="Description" rows={4} defaultValue={description} onChange={(val) => setDescription(val.target.value)} />
                    </Col>
                </Col>
            </Row>
        </Card>
    )
}
export default SecondStep