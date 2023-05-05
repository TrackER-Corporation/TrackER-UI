import { Col, Row, Empty } from "antd";
import { ProCard } from "@ant-design/pro-components";
import ReactApexChart from "react-apexcharts";
import { CardTitle } from "../../Components/CustomComponents";
import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import IconFont from "../../Iconfont";
import { ApexOptions } from "apexcharts";


const options: ApexOptions = {
    noData: {
        text: "You have no data...",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
            color: "blue",
            fontSize: '12px',
        }
    },
    colors: ["#ffcf45", "#19e396", "#008ffb"],
    chart: {
        type: 'radar',
        dropShadow: {
            enabled: true,
        },
        animations: {
            enabled: true,
        },
        toolbar: { show: false, },
    },
    stroke: {
        width: 1
    },
    fill: {
        opacity: 0.4
    }, yaxis: {
        show: false,
    },
}

const RevenueCard = ({ bills = {} }) => {
    const [electric, setElectric]: any = useState({})
    const [gas, setGas]: any = useState({})
    const [water, setWater]: any = useState({})
    useEffect(() => {
        if (Object.keys(bills).length === 0)
            return
        let date: any = null;
        const dataGas: any = []
        const dataWater: any = []
        const dataElectric: any = []
        let totElectric = 0
        let totGas = 0
        let totWater = 0
        let month
        Object.values(bills).map((el: any) => {
            month = moment(el.date).format('DD MMM');
            if (moment(el.date).isSame(date, 'day')) {
                totElectric += Number(el.electric)
                totWater += Number(el.water)
                totGas += Number(el.gas)
            }
            else {
                dataElectric.push({ x: month, y: totElectric.toFixed(2) })
                dataGas.push({ x: month, y: totGas.toFixed(2) })
                dataWater.push({ x: month, y: totWater.toFixed(2) })
                date = el.date
                console.log(totElectric)
                totElectric = 0
                totGas = 0
                totWater = 0
            }
        })
        setElectric({ name: "Electric", data: dataElectric })
        setWater({ name: "Water", data: dataWater })
        setGas({ name: "Gas", data: dataGas })
    }, [bills])

    return (
        <ProCard colSpan={12} bordered style={{ borderRadius: "10px", }}>
            <Row justify="space-between" align="middle" >
                <CardTitle>Consumption Overview</CardTitle>
                <Col>
                    <IconFont type="i-riqi" style={{ color: "blue" }} />
                </Col>
            </Row>
            <Col span={24}>
                <Row justify="center">
                    {
                        Object.keys(bills).length <= 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
                            <ReactApexChart options={options} series={[electric, gas, water]} type="radar" height={390} />
                    }
                </Row>
            </Col>
        </ProCard >
    )
};

export default RevenueCard