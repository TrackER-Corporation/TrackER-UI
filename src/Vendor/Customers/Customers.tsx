import { useEffect, useState } from 'react';
import { Breadcrumb, Col, Layout, Row } from 'antd';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import CustomerDrawer from '../CustomerDrawer';
import LoadingSpinner from '../../Components/LoadingSpinner';
import CustomersBuildingTable from '../CustomersBuildingTable';
import { PageHeader } from '@ant-design/pro-components';
import { VendorCustomers } from '../../types';

const Customers = ({ organization }: VendorCustomers) => {
    const columns = [
        {
            title: "#",
            dataIndex: 'index',
            valueType: 'index',
            key: 'index',
            width: 20,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
        },
        {
            title: 'Building',
            dataIndex: 'building',
        },
        {
            title: 'Action',
            key: 'option',
            valueType: 'option',
            render: (_: any, data: any) =>
                <a onClick={() => {
                    setVisible(true)
                    setBuildingId(data.buildingId)
                }} key="1" >
                    See Details
                </a>
        },
    ];
    const [data, setData] = useState<Array<any>>([])
    const [visible, setVisible] = useState(false)
    const [load, setLoad] = useState(true)
    const [buildingId, setBuildingId] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        setData([])
        const getAllUser = async () => {
            setData([])
            organization.customers
                ?.map(async (el) =>
                    await api.user.get(el.user).then(async user => {
                        await api.preference.fetchPreference(el.user)
                            .then((async preference => {
                                await api.buildings.fetchBuildingsByUserId(el.building)
                                    .then((building => {
                                        setData((old: any) =>
                                            [...old,
                                            {
                                                buildingId: building._id,
                                                name: user.name,
                                                surname: user.surname,
                                                avatar: preference.avatar,
                                                building: building.name
                                            }]
                                        )
                                    })).catch(e => console.log(e))
                            })).catch(e => console.log(e))
                    }).catch(e => console.log(e)))

            setTimeout(() => {
                setLoad(false)
            }, 1000);
        }
        getAllUser()
    }, [])

    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            {load && <LoadingSpinner message="Fetching Customers..." />}
            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
            <Breadcrumb
                items={[
                    {
                        title: 'Home',
                    },
                    {
                        title: <a>Pages</a>
                    },
                    {
                        title: <a>Customers</a>
                    },
                ]}
            />
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Organization Customers List"
                subTitle="Check all yours customers"
                onBack={() => navigate("/Dashboard")}
            />
            <Col span={24} style={{ borderRadius: 20 }}>
                <CustomersBuildingTable data={data} columns={columns} />
            </Col>
            <CustomerDrawer visible={visible} buildingId={buildingId} setVisible={setVisible} />
        </Layout>
    );
}
export default Customers
