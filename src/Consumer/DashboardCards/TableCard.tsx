import { Card, Col, Row } from "antd";
import { ProTable } from '@ant-design/pro-components';
import { Building } from "../../types";

interface TableCard {
    buildings: Array<Building>
}

const TableCard = ({ buildings }: TableCard) => {
    const tableListDataSource: any = [];
    
    if (buildings === null)
        return <></>
    buildings.map((el: Building, i: number) =>
        tableListDataSource.push({
            key: el._id,
            index: i + 1,
            ...el
        })
    )

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

    return (
        <Col span={24}>
            <Card bordered style={{ borderRadius: "10px" }}>
                <Row justify="space-between" align="middle" >
                    <Col span={24}>
                        <ProTable
                            headerTitle="Building Portfolio"
                            dataSource={tableListDataSource}
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