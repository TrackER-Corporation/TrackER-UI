import { Divider } from "antd"
import { Col, Row, Statistic } from "antd"
import styled from "styled-components"
import { Organization } from "../../types"
import { ListItemLayout, ListSize } from "antd/es/list"


const SubTitle = styled.p`
overflow: hidden;
color: rgba(0, 0, 0, 0.85);
font-weight: 400;
font-size: 19px;
line-height: 1.5715;
text-overflow: ellipsis;
margin-bottom: 16px 
`

export const renderRenewableInfo = (type: Array<any>, title: string, load: boolean) =>
    <>
        {type.length > 0 &&
            <>
                <div>
                    <SubTitle>Organization {title} Energy Resources Available Devices</SubTitle>
                    <Divider />
                </div>
                {type.map(el =>
                    <Row justify="space-between" key={el._id} gutter={[32, 32]}>
                        <Col md={4} sm={24}>
                            <Statistic title={"Name"} value={el.name} loading={load} />
                        </Col>
                        <Col md={4} sm={24}>
                            <Statistic title={"Type"} value={el.type} loading={load} />
                        </Col>
                        <Col md={4} sm={24}>
                            <Statistic title={"Installation Price"} value={el.price} loading={load} suffix="€" />
                        </Col>
                        <Col md={4} sm={24}>
                            <Statistic title={"Earnings at kWh"} value={el.earning} loading={load} suffix="€" />
                        </Col>
                        <Col md={4} sm={24}>
                            <Statistic title={"Organization profit at kWh"} value={el.organization} suffix="%" loading={load} />
                        </Col>
                        <Divider />
                    </Row>)}
            </>
        }
    </>

export const organizationProps = (expandedRowKeys: any, setExpandedRowKeys: any, allOrganization: Array<Organization>) => ({
    rowKey: 'title',
    headerTitle: 'Registered Organization',
    cardProps: { style: { borderRadius: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.2)" } },
    cardBordered: true,
    tableStyle: { borderRadius: 20 },
    style: { borderRadius: 20 },
    expandable: { expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys },
    onRow: (_: Organization, rowIndex: number | undefined) => ({
        onClick: () => {
            if (expandedRowKeys.includes(rowIndex))
                setExpandedRowKeys([])
            else
                setExpandedRowKeys([rowIndex])
        },
    }),
    dataSource: allOrganization,
    itemLayout: 'vertical' as ListItemLayout,
    size: 'large' as ListSize,
    split: true,
});
