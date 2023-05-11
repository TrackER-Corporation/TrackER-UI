import { Button, Card, message, Modal, Popconfirm, Row, Tooltip } from "antd"
import { ProForm, ProFormMoney, ProFormSelect, ProFormText, ProTable } from "@ant-design/pro-components"
import api from "../../api"
import { useEffect, useRef, useState } from "react";
import RenewableDetailsModal from "./RenewableDetailsModal";
import { ResourcesModal } from "../../types";
import { useAppSelector } from "../../hooks";
import IconFont from "../../Iconfont";
const ResourcesModal = ({ visible, setVisible, data, options }: ResourcesModal) => {

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
            title: 'Type',
            dataIndex: 'type',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
        },
        {
            title: 'Installation Price',
            dataIndex: 'price',
        },
        {
            title: 'Saving at KWh',
            dataIndex: 'earning',
        },
        {
            title: 'Organization percentage earning at KWh',
            dataIndex: 'organization',
        },
        {
            title: 'Action',
            key: 'option',
            valueType: 'option',
            width: 100,
            render: (_: any, data: any) =>
                <Row justify="space-around" gutter={[16, 16]}>
                    <Tooltip title="See Building List">
                        <div style={{ cursor: "pointer" }} onClick={() => {
                            setShow(true)
                            setShowData(data)
                        }}>
                            <IconFont type="i-news" className="anticon iconfont" style={{ color: "blue" }} />
                        </div>
                    </Tooltip>
                    <Popconfirm title="Are you sure to delete this Device" onConfirm={() => deleteResources(data._id)}>
                        <Tooltip title="Delete Device">
                            <IconFont type="i-shanchu" className="anticon iconfont" style={{ color: "blue" }} />
                        </Tooltip>
                    </Popconfirm>
                </Row>
        },
    ];

    const [price, setPrice] = useState(0)
    const [earning, setEarning] = useState(0)
    const [organization, setOrganization] = useState(0)
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [dataTable, setDataTable] = useState<any>([])
    const organizationId = useAppSelector((state) => state.organization.organization._id)
    const [show, setShow] = useState(false)
    const [showData, setShowData] = useState<any>({})

    const ref: any = useRef();


    const getResourcesList = async () => {
        await api.renewable.fetchResourcesByOrganizationId(organizationId).then(res => {
            const table: any = []
            res.forEach((element: any) => {
                if (element.resourcesType === data.name)
                    table.push(element)
            });
            setDataTable(table)
        }).catch(e => { return })
    }

    const deleteResources = async (id: any) => {
        await api.renewable.deleteResources(id).then(res => {
            message.success("Resources Deleted")
            ref.current.reloadAndRest();
        }).catch(err => message.error(err))
    }

    const createResources = async (data: any) => {
        await api.renewable.createResources(data).then(res => {
            setDataTable((old: any) => [...old, data])
            ref.current.reloadAndRest();
        }).catch(e => { return })
    }

    useEffect(() => {
        if (organizationId !== null)
            getResourcesList()
    }, [organization])


    const submit = (resourcesType: any) => {
        const data = {
            price,
            name,
            type,
            organization,
            earning,
            organizationId,
            resourcesType: resourcesType
        }
        createResources(data)
    }

    return (
        <Modal destroyOnClose title={data.name + " resources configuration"} width={1000} open={visible} onCancel={() => setVisible(false)} onOk={() => setVisible(false)}>
            <ProTable headerTitle={data.name + " Resources List"}
                dataSource={dataTable}
                request={() => getResourcesList() as any}
                columns={columns} search={false} dateFormatter="string"
                actionRef={ref}
                tableExtraRender={() =>
                (<Card>
                    <Row justify="space-between" align="middle">
                        <ProForm grid layout="vertical" rowProps={{ gutter: [32, 32], }} submitter={{
                            submitButtonProps: { style: { display: 'none', }, }, resetButtonProps: { style: { display: 'none', }, },
                        }}>
                            <ProFormText label="Name" placeholder="Device Name" colProps={{ md: 12, sm: 24 }} />
                            <ProFormSelect label="Type" placeholder="Device Type" colProps={{ md: 12, sm: 24 }} options={options} onChange={(value: any) => setType(value)} />
                            <ProFormMoney label="Installation Price" placeholder="Device Installation Price" colProps={{ md: 8, sm: 24 }} customSymbol="€" min={0} onChange={(value: any) => setPrice(value)} />
                            <ProFormMoney label="Saving at KWh" placeholder="Device Customer Earning at kWh" colProps={{ md: 8, sm: 24 }} customSymbol="€" min={0} onChange={(value: any) => setEarning(value)} />
                            <ProFormMoney label="Organization percentage earning at KWh" placeholder="Device Organization Percentage at kWh" colProps={{ md: 8, sm: 24 }} customSymbol="%" min={0} onChange={(value: any) => setOrganization(value)} />
                        </ProForm>
                    </Row>
                    <Row justify="end">
                        <Button type="primary" style={{ borderRadius: 20, marginTop: 22 }} onClick={() => submit(data.name)}>Add Resources</Button>
                    </Row>
                </Card>)} />
            <RenewableDetailsModal filter={data.name} data={showData} visible={show} setVisible={setShow} />
        </Modal >
    )
}
export default ResourcesModal