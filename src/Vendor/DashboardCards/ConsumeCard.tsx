import { Col, Row } from "antd";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import api from "../../api";
import { ApexOptions } from "apexcharts";

const commonProps = {
    stroke: {
        curve: 'smooth',
        width: 2,

    },
    xaxis: {
        type: 'datetime',
        tooltip: {
            enabled: false
        },
        labels: {
            show: true,
            datetimeUTC: false,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        },
    },
    tooltip: {
        enabled: true,
        followCursor: true,
        theme: "light",
        x: {
            show: true,
            format: "dd-MM-yyyy HH:mm"
        },
    },
}

const ConsumeCard = () => {

    const organization = useSelector((state: any) => state.organization.organization)
    const [bills, setBills] = useState({})
    const [electric, setElectric] = useState({})
    const [gas, setGas] = useState({})
    const [water, setWater] = useState({})

    const fetchBills = (aggId: string) => {
        api.bills.getBillsByOrganizationIdAggregated(aggId).then((res) => {
            setBills(res.aggregated)
            let electric: any = []
            let gas: any = []
            let water: any = []
            Object.values(res.aggregated).map((el: any) => {
                electric.push({
                    x: moment.utc(el.date).local().format(),
                    y: el.electric === undefined ? null : el.electric
                })
                gas.push({
                    x: moment.utc(el.date).local().format(),
                    y: el.gas === undefined ? null : el.gas
                })
                water.push({
                    x: moment.utc(el.date).local().format(),
                    y: el.water === undefined ? null : el.water
                })
            })
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
        }).catch(e => {return})
    }

    useEffect(() => {
        if (organization === null || organization === undefined)
            return
        fetchBills(organization._id)
    }, [organization])



    let state:any = {
        electricLine: [electric],
        electricOption: {
            chart: {
                id: 'electric',
                group: 'social',
                type: 'line',
                height: 160
            },
            colors: ['#00E396'],
            ...commonProps,
        },

        gasLine: [gas],
        gasOption: {
            chart: {
                id: 'gas',
                group: 'social',
                type: 'line',
                height: 160
            },
            colors: ['#546E7A'],
            ...commonProps,
        },

        waterLine: [water],
        waterOption: {
            chart: {
                id: 'water',
                group: 'social',
                type: 'area',
                height: 160
            },
            colors: ['#008FFB'],
            ...commonProps,
        },
    };




    return (
        <Row justify="space-between" align="middle">
            <Col md={8} xs={24} sm={24}>
                <ReactApexChart options={state.electricOption as ApexOptions} series={state.electricLine} type="line" height={460} />
            </Col>
            <Col md={8} xs={24} sm={24}>
                <ReactApexChart options={state.gasOption  as ApexOptions} series={state.gasLine} type="line" height={460} />
            </Col>
            <Col md={8} xs={24} sm={24}>
                <ReactApexChart options={state.waterOption  as ApexOptions} series={state.waterLine} type="line" height={460} />
            </Col>
        </Row>
    )
}
export default ConsumeCard