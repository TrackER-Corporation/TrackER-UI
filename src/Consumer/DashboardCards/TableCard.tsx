import { Card, Col, Row } from "antd";
import { ProTable } from '@ant-design/pro-components';
import { Building } from "../../types";

interface TableCard {
    buildings: Array<Building>
}

const columns = [
    {
        title: '#',
        width: 50,
        dataIndex: 'index',
        render: (_: any) => <a>{_}</a>,
    },
    {
        title: 'Building Name',
        dataIndex: 'name',
    },
    {
        title: 'Owner',
        dataIndex: 'contact',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Size',
        dataIndex: 'sqft',
    },
    {
        title: 'Type',
        dataIndex: 'type',
    },
    {
        title: 'Created At',
        dataIndex: 'date',
        render: (_: any) => <span>{new Date(_).toDateString()}</span>
    },

];

const TableCard = ({ buildings }: TableCard) => {
    if (!Array.isArray(buildings) || buildings.length === 0) return <></>
    return (
        <Col span={24}>
            <Card bordered style={{ borderRadius: "10px" }}>
                <Row justify="space-between" align="middle" >
                    <Col span={24}>
                        <ProTable
                            headerTitle="Building Portfolio"
                            dataSource={
                                buildings.map((el: Building, i: number) =>
                                ({
                                    key: el._id,
                                    index: i + 1,
                                    ...el
                                }))
                            }
                            rowKey="key"
                            pagination={{ hideOnSinglePage: true, }}
                            columns={columns}
                            search={false}
                            dateFormatter="string"
                        />
                    </Col>
                </Row>
            </Card>
        </Col>
    )
};

export default TableCard