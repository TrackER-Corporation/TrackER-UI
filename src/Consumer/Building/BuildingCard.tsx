import { QuestionCircleOutlined } from "@ant-design/icons";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Avatar, Button, Card, Col, Collapse, Divider, Popconfirm, Radio, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import StatsCard from "../DashboardCards/StatsCard";
import { linear } from "../utils";
import KpiCard from "./KpiCard";
import MapboxMap from "./MapboxMap";
import RenewableCards from "./RenewableCards";
import ResourcesModal from "./Resources/ResourcesModal";
import { useAppSelector } from "../../hooks";
import { ApexOptions } from "apexcharts";
import { Building } from "../../types";
import { showBills } from "./utils";

interface BuildingCard {
    bills: any,
    item: Building,
    setIsModalVisible: (arg: boolean) => void,
    setContact: (arg: string) => void,
    setName: (arg: string) => void,
    setAddress: (arg: string) => void,
    setType: (arg: string) => void,
    setBuildingId: (arg: string) => void,
    deleteBuilding: any,
    getData: any
}

const BuildingCard = ({ bills, item, setIsModalVisible, setContact, setName, setAddress, setType, setBuildingId, deleteBuilding, getData }: BuildingCard) => {
    const [collapse, setCollapse] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false)
    const [avatar, setAvatar] = useState("")
    const [organization, setOrganization] = useState("")
    const allOrganization = useAppSelector(state => state.allOrganization.organization)
    useEffect(() => {
        if (allOrganization === undefined)
            return
        const res: any = Object.values(allOrganization).find((el: any) => el._id === item.organizationId)
        setAvatar(res.icon)
        setOrganization(res.name)
    }, [item, bills])

    return (
        <div style={{ paddingTop: "32px" }} key={item._id}>
            <Card bodyStyle={{ padding: "0", marginBottom: "32px", borderRadius: "10px" }} headStyle={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", backgroundColor: "#0010f7" }} style={{ borderRadius: "10px" }}
                title={
                    <Row >
                        <Col span={24}>
                            <Row justify="space-between" align="middle">
                                <h3 style={{ color: "white" }}>{item.name}</h3>
                                <Radio.Group value="default" >
                                    <Radio.Button
                                        type="primary"
                                        onClick={() => {
                                            setIsModalVisible(true);
                                            setName(item.name);
                                            setContact(item.contact);
                                            setAddress(item.address);
                                            setType(item.type);
                                            setBuildingId(item._id)
                                        }}>Edit
                                    </Radio.Button>
                                    <Popconfirm
                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                        title="Do you wanna delete this building?"
                                        onConfirm={() => deleteBuilding(item._id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Radio.Button>Delete</Radio.Button>
                                    </Popconfirm>
                                </Radio.Group>
                            </Row>
                        </Col>
                    </Row>
                }
            >
                <Row justify="space-between" gutter={[32, 32]} style={{ marginBottom: "32px", padding: "16px" }}>
                    <Col md={12} sm={24} >
                        <MapboxMap lat={Number(item.lat)} lng={Number(item.long)} />
                    </Col>
                    <Col md={12} sm={24}>
                        <ProForm grid layout="vertical" rowProps={{ gutter: [32, 32], }} submitter={{
                            submitButtonProps: { style: { display: 'none', }, }, resetButtonProps: { style: { display: 'none', }, },
                        }}>
                            <ProFormText allowClear={false} value={item.name} label="Building Name" placeholder="Building Name" colProps={{ span: 12 }} />
                            <ProFormText allowClear={false} value={item.contact} label="Contact Name" placeholder="Contact Name" colProps={{ span: 12 }} />
                            <ProFormText allowClear={false} value={item.type} label="Building Type" placeholder="Building Type" colProps={{ span: 12 }} />
                            <ProFormText allowClear={false} value={item.sqft} label="Building Dimension in Sqmt" placeholder="Building Type" colProps={{ span: 12 }} />
                            <ProFormText allowClear={false} value={item.address} label="Building Address" placeholder="Building Address" colProps={{ span: 24 }} />
                            <ProFormText allowClear={false} value={organization} label="Building Organization" placeholder="Building Organization" colProps={{ span: 12 }} />
                            <Tooltip title={organization + " organization logo"}>
                                <Avatar size={100} src={avatar} style={{ marginLeft: 100, boxShadow: "2px 4px 12px #000000" }} />
                            </Tooltip>
                        </ProForm>
                    </Col>
                </Row>
                <Collapse style={{ border: 0 }} accordion collapsible="header" >
                    <Collapse.Panel style={{ border: 0 }} showArrow={false} collapsible="header"
                        header={
                            <Button
                                style={{ position: "absolute", left: "40%", right: "40%", bottom: 10 }}
                                type={collapse ? "default" : "primary"}
                                size="large"
                                onClick={() => setCollapse(!collapse)}>
                                {collapse ? "Close" : "Open"}
                            </Button>
                        }
                        key="1"
                    >
                        <Row justify="space-between" style={{ marginBottom: "32px", padding: "32px" }} gutter={[32, 32]}>
                            <Col span={24}>
                                <KpiCard bills={bills} item={item} />
                            </Col>
                            <Divider />
                            {showBills(allOrganization, "Electric", item.organizationId) &&
                                <Col span={24}>
                                    <StatsCard
                                        chart={
                                            <ReactApexChart
                                                options={linear('Consumed Electricity', "watt", "#1984f5").options as ApexOptions}
                                                series={getData(item._id, "Electric")}
                                                type="area"
                                                height={350}
                                            />} />
                                </Col>}
                            {showBills(allOrganization, "Water", item.organizationId) && <Col span={24}>
                                <StatsCard chart={<ReactApexChart options={linear('Consumed Water', "liter", "#00c2f6").options as ApexOptions} series={getData(item._id, "Water")} type="area" height={350} />} />
                            </Col>}
                            {showBills(allOrganization, "Gas", item.organizationId) && <Col span={24}>
                                <StatsCard chart={<ReactApexChart options={linear('Consumed Gas', "m³", "#00cbc8").options as ApexOptions} series={getData(item._id, "Gas")} type="area" height={350} />} />
                            </Col>}
                            <Col span={24} style={{ marginTop: 22 }}>
                                {item.resources && item.resources?.length > 0 ?
                                    <Row justify="center" >
                                        <RenewableCards bills={bills} item={item} resources={item.resources} />
                                        <Button
                                            onClick={() => setVisible(true)}
                                            type="primary"
                                            size="large"
                                            style={{ borderRadius: 20, marginTop: 16 }}>
                                            Install Renewable Device
                                        </Button>
                                    </Row>
                                    :
                                    <Row justify="center" >
                                        <Button
                                            onClick={() => setVisible(true)}
                                            type="primary"
                                            size="large"
                                            style={{ borderRadius: 20 }}>
                                            Install Your First Renewable Device
                                        </Button>
                                    </Row>
                                }
                            </Col>
                        </Row>
                    </Collapse.Panel>
                </Collapse>
            </Card>
            <ResourcesModal building={item} visible={visible} setVisible={setVisible} data={item.resources} />
        </div>
    )
}
export default BuildingCard