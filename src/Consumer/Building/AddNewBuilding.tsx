import { AutoComplete, Avatar, Breadcrumb, Button, Card, Form, Layout, Row, Select } from "antd"
import Col from "antd/es/grid/col";
import Input from "antd/lib/input/Input";
import { Option } from "antd/lib/mentions";
import { useState } from "react";
import api from "../../api";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { setAllOrganization } from "../../reducers/allOrganization";
import { AccountSubTitle } from "../../Components/CustomComponents"
import { useEffect } from "react";
import BuildingOptions from "./BuildingOptions";
import { ExpandAltOutlined } from '@ant-design/icons';
import "./style.css"
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@ant-design/pro-components";
import { Organization, UserProps } from "../../types";
import { addBuilding, handleCoords, onSelect } from "../../buildingsUtils";
import IconFont from "../../Iconfont";
import { useAppDispatch } from "../../hooks";

const AddNewBuildings = (user: UserProps) => {
    const dispatch = useAppDispatch()
    const [options, setOptions] = useState([])
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [type, setType] = useState("")
    const [lat, setLat] = useState(0)
    const [long, setLon] = useState(0)
    const [sqft, setSqft] = useState("")
    const [allOrganizations, setOrganizations] = useState<Array<Organization>>([])
    const [organizationId, setOrganization] = useState([])
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const fetchOrganization = async () =>
        await api.organization.fetch().then(res => {
            setOrganizations(res)
            dispatch(setAllOrganization(res))
        }).catch(err => console.log(err))

    useEffect(() => {
        fetchOrganization()
    }, [])

    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            {show && <LoadingSpinner message={"Creating new building..."} />}
            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
                <Breadcrumb
                    items={[
                        {
                            title: 'Home',
                        },
                        {
                            title: <a>Buildings</a>
                        },
                        {
                            title: <a>Create Building</a>
                        },
                    ]}
                />
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Create Building"
                subTitle="Add a new Building to your account"
                onBack={() => navigate("/Dashboard")}
            />
            <Card style={{ borderRadius: 20, marginTop: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                <AccountSubTitle style={{ marginLeft: 15 }}>Add a new building to your account</AccountSubTitle>
                <Row gutter={[32, 0]} style={{ marginTop: "32px", }}>
                    <Col lg={12} md={24}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input the building name' }]}
                            >
                                <Input
                                    onChange={(e) => setName(e.target.value)}
                                    allowClear
                                    size="large"
                                    placeholder="Building Name"
                                    prefix={<IconFont type="i-bianji" style={{ marginRight: 5 }} />}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="Contact Name"

                                rules={[{ required: true, message: 'Please input the building name' }]}
                            >
                                <Input
                                    onChange={(e) => setContact(e.target.value)}
                                    allowClear
                                    size="large"
                                    placeholder="Building Owner Name"
                                    prefix={<IconFont type="i-shouye" style={{ marginRight: 5 }} />} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="Building type"
                                rules={[{ required: true, message: 'Please input the building type' }]}
                            >
                                <BuildingOptions setType={setType} />
                            </Form.Item>
                        </Col>
                    </Col>
                    <Col lg={12} md={24}>
                        <Col span={24}>
                            <Form.Item rules={[{ required: true, message: 'Please input the building size' }]}
                            >
                                <Input size="large"
                                    onChange={(e) => setSqft(e.target.value)}
                                    min={1}
                                    type={"number"}
                                    allowClear
                                    placeholder="Building Size (Sqmt)"
                                    prefix={<ExpandAltOutlined
                                        style={{ fontSize: 10, paddingTop: 7, paddingBottom: 7, marginRight: 5 }}
                                    />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="Address"
                                rules={[{ required: true, message: 'Please input the building name' }]}
                            >
                                <AutoComplete
                                    className="test"
                                    size="large"
                                    allowClear
                                    placeholder="Building Address"
                                    onSearch={() => handleCoords(address, setOptions)}
                                    options={options}
                                    onSelect={(value) => onSelect(value, options, setAddress, setLat, setLon)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item rules={[{ required: true, message: 'Please input the building organization' }]}>
                                <Select size="large"
                                    data-testid="select1"
                                    placeholder={
                                        <Row align="middle">
                                            <IconFont type="i-dianpu" style={{ marginRight: 5 }} />
                                            Building Organization
                                        </Row>}
                                    onChange={(val) => { setOrganization(val) }}>
                                    {allOrganizations.length > 0 && allOrganizations.map((el) =>
                                        <Option key={el._id} value={el._id}>
                                            <Row align="middle">
                                                <Avatar src={el.icon} style={{ marginRight: 5 }} />{el.name}
                                            </Row>
                                        </Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Col>
                </Row>
                <Row align="middle" justify="end" style={{ marginRight: 22 }} >
                    <Button type="primary" style={{ borderRadius: 10 }}
                        onClick={() =>
                            addBuilding(
                                name,
                                contact,
                                address,
                                sqft,
                                type,
                                lat,
                                long,
                                organizationId,
                                user,
                                setShow,
                                dispatch
                            )}>
                        Add
                    </Button>
                </Row>
            </Card>
        </Layout>
    )
}
export default AddNewBuildings