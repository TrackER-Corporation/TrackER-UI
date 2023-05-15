import { ProFormMoney } from "@ant-design/pro-components";
import { Col, message } from "antd";

export const MoneyForm = (
    label: string,
    onChange: (value: number) => void,
    isPercentage = false
) =>
    <Col span={12}>
        <ProFormMoney
            colSize={12}
            label={label}
            locale="it-IT"
            placeholder={isPercentage ? "%" : "€ 0"}
            customSymbol={isPercentage ? "%" : ""}
            min={0}
            max={isPercentage ? 99 : 9999999999999}
            onChange={(value: number) => onChange(value)}
        />
    </Col>

export const drawerProps = {
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
};

export const uploadImage = async (file: any, setIcon: (arg: any) => void) => {
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