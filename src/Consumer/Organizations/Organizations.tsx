import { Breadcrumb, Layout, Row, Space, Tag, Col, Slider, Avatar, Tooltip } from "antd"
import { PageHeader, ProList } from '@ant-design/pro-components';
import { useState } from 'react';
import TypeCard from "./TypeCard";
import { useNavigate } from "react-router-dom";
import RenewableCard from "./RenewableCard";
import IconFont from "../../Iconfont";
import { Organization, UserProps } from "../../types";

interface Organizations {
    allOrganization: Array<Organization>,
    allUser: Array<UserProps>
}

const Organizations = ({ allOrganization, allUser }: Organizations) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);
    const navigate = useNavigate()
    return (
        <Layout
            className="site-layout-background"
            style={{
                padding: 24,
                minHeight: 280,
            }}
        >
            <Row gutter={[16, 16]} >
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Organizations</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Organizations"
                subTitle="Check all registered organization of our platform"
                onBack={() => navigate("/Dashboard")}
            />
            <Row style={{ marginTop: 12 }}>
                <Col span={24}>
                    <ProList rowKey="title" headerTitle="Registered Organization" cardProps={{ style: { borderRadius: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.2)" } }} cardBordered tableStyle={{ borderRadius: 20 }} style={{ borderRadius: 20 }}
                        expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                        onRow={(_, rowIndex) => {
                            return {
                                onClick: () => {
                                    if (expandedRowKeys.includes(rowIndex))
                                        setExpandedRowKeys([])
                                    else
                                        setExpandedRowKeys([rowIndex])
                                },
                            };
                        }}
                        dataSource={allOrganization}
                        itemLayout="vertical"
                        size="large"
                        split
                        metas={{
                            title: {
                                render: (_, data: any) => (
                                    <Row align="middle">
                                        <Col style={{ width: 220 }}>
                                            {data.name}
                                        </Col>
                                        <Col >
                                            <Space size={0}>
                                                {data.type.includes("Electric") && <Tag icon={<IconFont type="i-Energy" className="iconfontTag" />} color="gold">Electric</Tag>}
                                                {data.type.includes("Gas") && <Tag icon={<IconFont type="i-fire-line" className="iconfontTag" />} color="#5B90F6">Gas</Tag>}
                                                {data.type.includes("Water") && <Tag icon={<IconFont type="i-water" className="iconfontTag" />} color="blue">Water</Tag>}
                                                {data.type.includes("Distributed") && <Tag icon={<IconFont type="i-a-EnergyResources" className="iconfontTag" />} color="green">Energy Resources</Tag>}
                                            </Space>
                                        </Col>
                                    </Row>

                                ),
                            },
                            subTitle: {
                                dataIndex: 'description'
                            },
                            content: {
                                render: (_, data: any) => {
                                    const { electric, water, gas, resources } = data.details
                                    const owner = allUser.find((el: any) =>
                                        el._id === data.userId
                                    )
                                    return (
                                        <Col span={24} style={{ marginBottom: 32 }}>
                                            <Row gutter={[64, 64]} justify="center" align="middle">
                                                <Tooltip placement="bottom" title={data.name + " Logo"}>
                                                    <Avatar size={240} src={data.icon} style={{ boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)" }} />
                                                </Tooltip>
                                                <Col span={14} style={{ marginLeft: 22 }}>
                                                    <p style={{ fontSize: 17 }}>Owner: {owner?.name + " " + owner?.surname} </p>
                                                    <Row>
                                                        <p style={{ fontSize: 17 }}>Created at: {new Date(data.createAt).toLocaleDateString()}</p>
                                                        <p style={{ fontSize: 17, marginLeft: 32 }}>Total Registered Buildings: {data.customers.length}</p>
                                                    </Row>
                                                    <Slider value={data.customers.length} marks={{ 0: 'Small', 25: 'Medium', 70: 'Large', }} />
                                                </Col>
                                                {electric.length > 0 &&
                                                    <Col md={12} sm={24}>
                                                        <TypeCard title="Electric Plan" data={electric} />
                                                    </Col>
                                                }

                                                {gas.length > 0 &&
                                                    <Col md={12} sm={24}>
                                                        <TypeCard title="Gas Plan" data={gas} />
                                                    </Col>
                                                }
                                                {water.length > 0 &&
                                                    <Col md={12} sm={24}>
                                                        <TypeCard title="Water Plan" data={water} />
                                                    </Col>
                                                }
                                                {resources.length > 0 &&
                                                    <Col span={24}>
                                                        <RenewableCard title="Renewable Installation Cost and Earnings" organizationId={data._id} />
                                                    </Col>
                                                }
                                            </Row>
                                        </Col>
                                    )
                                }
                            },
                        }} />
                </Col>
            </Row>
        </Layout>
    )
}
export default Organizations