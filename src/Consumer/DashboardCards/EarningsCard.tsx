import { Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import ReactApexChart from "react-apexcharts";
import { stackedOptions } from "../utils";
import Empty from "../../Components/Empty";

interface EarningsCard {
  series: Array<any>,
  total: number
}


const EarningsCard = ({ series, total = 0 }: EarningsCard) =>
  <ProCard bordered style={{
    borderRadius: "10px"
  }}>
    <Row align="middle" justify="space-between">
      <Col lg={6} md={6} xs={24}>
        <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Renewable Production</h4>
        <div>
          <b style={{ fontSize: 22 }}>{total} kW</b>
        </div>
      </Col>
      <Col lg={18} md={18} xs={24} >
        {
          total === 0 ?
            <Empty />
            :
            <ReactApexChart options={stackedOptions} series={series} height={150} />
        }
      </Col>
    </Row>
  </ProCard>

export default EarningsCard

