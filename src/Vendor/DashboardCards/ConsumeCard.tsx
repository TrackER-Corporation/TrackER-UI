import { Col, Row, Tabs, TabsProps } from "antd";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import api from "../../api";
import { ApexOptions } from "apexcharts";
import { useAppSelector } from "../../hooks";
import { sortDate } from "../../Consumer/utils";
import { commonProps } from "../../globalUtils";


const ConsumeCard = () => {
    const organization = useAppSelector((state) => state.organization.organization)
    const [electric, setElectric] = useState({})
    const [gas, setGas] = useState({})
    const [water, setWater] = useState({})

    const fetchBills = (aggId: string) => {
        api.bills.getBillsByOrganizationIdAggregated(aggId).then((res) => {
            let electric: any = []
            let gas: any = []
            let water: any = []
            Object.values(res.aggregated).map((el: any) => {
                if (el.date !== null){
                    electric.push({
                        x: new Date(el.date).getTime(),
                        y: el.electric === undefined ? null : el.electric
                    })
                    gas.push({
                        x: new Date(el.date).getTime(),
                        y: el.gas === undefined ? null : el.gas
                    })
                    water.push({
                        x: new Date(el.date).getTime(),
                        y: el.water === undefined ? null : el.water
                    })
                }
            })

            sortDate(water)
            sortDate(gas)
            sortDate(electric)
            electric = {
                type: 'line',
                name: "Electric",
                data: electric
            }
            gas = {
                type: 'line',
                name: "Gas",
                data: gas
            }
            water = {
                type: 'line',
                name: "Water",
                data: water
            }
            setWater(water)
            setGas(gas)
            setElectric(electric)
        }).catch(e => { return })
    }

    useEffect(() => {
        if (organization === null || organization === undefined)
            return
        fetchBills(organization._id)
    }, [organization])

    const electricOption: ApexOptions = {
        ...commonProps,
        chart: {
            type: 'line',
            height: 160
        },
        colors: ['#00E396'],
    }

    const gasOption: ApexOptions = {
        ...commonProps,
        chart: {
            type: 'line',
            height: 160
        },
        colors: ['#546E7A'],

    }

    const waterOption: ApexOptions = {
        ...commonProps,
        chart: {
            type: 'area',
            height: 160
        },
        colors: ['#008FFB'],
    }

    const items: TabsProps['items'] = [
        {
            key: "1",
            label: "Electric Usage",
            children: <Col span={24}>
                <ReactApexChart options={electricOption} series={[electric]} type="line" height={460} />
            </Col>
        },
        {
            key: "2",
            label: "Gas Usage",
            children: <Col span={24}>
                <ReactApexChart options={gasOption} series={[gas]} type="line" height={460} />
            </Col>
        },
        {
            key: "3",
            label: "Water Usage",
            children: <Col span={24}>
                <ReactApexChart options={waterOption} series={[water]} type="line" height={460} />
            </Col>
        },
    ]

    return (
        <Row justify="space-between" align="middle" >
            <Tabs
                size="small"
                tabPosition="top"
                type="card"
                items={items}
                defaultActiveKey="1"
                style={{ width: "100%" }}
            />
        </Row>
    )
}
export default ConsumeCard