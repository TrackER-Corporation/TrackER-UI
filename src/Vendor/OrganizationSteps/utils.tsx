import { ProFormMoney } from "@ant-design/pro-components";
import { Col } from "antd";

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