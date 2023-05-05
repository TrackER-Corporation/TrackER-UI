import { Modal, Tabs } from "antd"
import moment from "moment";
import { useEffect, useState } from "react";
import ElectricInvoices from "./ElectricInvoices";
import GasInvoices from "./GasInvoices";
import WaterInvoices from "./WaterInvoices";
import { Building, TimeStamp } from "../../types";
import { useAppSelector } from "../../hooks";
import { dataInRange } from "../../globalUtils";
const { TabPane } = Tabs;

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

    return (
        <Modal destroyOnClose open={visible} width={1200} onOk={() => setVisible(!visible)} onCancel={() => setVisible(!visible)}>
            <Tabs defaultActiveKey="1" centered destroyInactiveTabPane>
                <TabPane tab="Electric" key="1">
                    <ElectricInvoices bills={data} cost={electricDetail} filtered={elec} />
                </TabPane>
                <TabPane tab="Gas" key="2">
                    <GasInvoices bills={data} cost={gasDetail} filtered={gas} />
                </TabPane>
                <TabPane tab="Water" key="3">
                    <WaterInvoices bills={data} cost={waterDetail} filtered={water} />
                </TabPane>
            </Tabs>
        </Modal>
    )
}
export default InvoicesModal