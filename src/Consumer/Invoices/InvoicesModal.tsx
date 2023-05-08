import { Modal, Tabs, TabsProps } from "antd"
import moment from "moment";
import { useEffect, useState } from "react";
import ElectricInvoices from "./ElectricInvoices";
import GasInvoices from "./GasInvoices";
import WaterInvoices from "./WaterInvoices";
import { Building, TimeStamp } from "../../types";
import { useAppSelector } from "../../hooks";
import { dataInRange } from "../../globalUtils";

interface InvoicesModal {
    data: any,
    visible: boolean,
    setVisible: (arg: boolean) => void,
    timeSpan: TimeStamp
    building: Building
}

const InvoicesModal = ({ data, visible, setVisible, timeSpan, building }: InvoicesModal) => {
    let elec: Array<any> = []
    let gas: Array<any> = []
    let water: Array<any> = []

    const allOrganization = useAppSelector((state) => state.allOrganization.organization)

    const [gasDetail, setGas] = useState({})
    const [waterDetail, setWater] = useState({})
    const [electricDetail, setElectric] = useState({})

    useEffect(() => {
        if (!allOrganization)
            return
        const organizationDetail = Object.values(allOrganization)
            .find(el => el._id === building.organizationId)
        if (organizationDetail !== undefined) {
            setGas(organizationDetail.details.gas)
            setWater(organizationDetail.details.water)
            setElectric(organizationDetail.details.electric)
            elec = []
            gas = []
            water = []
        }
    }, [allOrganization, building])



    data.bills?.forEach((el: any) => {
        const week = moment().subtract(7, 'days');
        const month = moment().subtract(1, 'months');
        const year = moment().subtract(1, 'years');

        switch (timeSpan) {
            case "Weekly":
                dataInRange(el, elec, gas, water, week);
                break;
            case "Monthly":
                dataInRange(el, elec, gas, water, month);
                break;
            case "Yearly":
                dataInRange(el, elec, gas, water, year);
                break;
            default:
                break;
        }
    });
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Electric`,
            children: <ElectricInvoices bills={data} cost={electricDetail} filtered={elec} />,
        },
        {
            key: '2',
            label: `Gas`,
            children: <GasInvoices bills={data} cost={gasDetail} filtered={gas} />
        },
        {
            key: '3',
            label: `Water`,
            children: <WaterInvoices bills={data} cost={waterDetail} filtered={water} />
        },
    ];


    return (
        <Modal destroyOnClose open={visible}
            width={1200}
            onOk={() => setVisible(!visible)}
            onCancel={() => setVisible(!visible)}
        >
            <Tabs
                defaultActiveKey="1"
                centered
                destroyInactiveTabPane
                items={items}
            />
        </Modal>
    )
}
export default InvoicesModal