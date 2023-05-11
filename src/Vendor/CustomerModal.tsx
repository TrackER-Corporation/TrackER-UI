import { Button, Col, Modal, Row, Skeleton } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import api from "../api"
import "./skeleton.css"
import ProSkeleton from '@ant-design/pro-skeleton';
import CustomersBuildingTable from "./CustomersBuildingTable"
import ModalDetails from "./ModalDetails"
import { useAppSelector } from "../hooks"
import { Building, CustomerModal } from "../types"

const CustomerModal = ({ visible, user, setVisible }: CustomerModal) => {
    const allBuildings = useAppSelector((state: any) => state.allOrganization.allBuildings)
    const [buildings, setBuildings] = useState<any>([])
    const [load, setLoad] = useState(true)
    const [visible2, setVisible2] = useState(false)
    const [bills, setBills] = useState<any>({})
    const [building, setBuilding] = useState<Building|any>(allBuildings)
    const fetchData = async () => {
        await api.bills.getBillsAggregated(user._id).then(res => {
            res.all.map((el: any) => setBuildings((old: any) => [...old, allBuildings.find((ele: any) => ele._id === el.buildingId)]))
            setBills(res.all)
            setTimeout(() => {
                setLoad(false)
            }, 500);
        }).catch(e => setLoad(false))
    }

    useEffect(() => {
        setBuildings([])
        fetchData()
    }, [visible, user, building])


    const columns = [
        {
            title: "#",
            dataIndex: 'index',
            valueType: 'index',
            key: 'index',
            width: 10,
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
            title: 'Address',
            dataIndex: 'address',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
            width: 300,
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            key: 'option',
            valueType: 'option',
            render: (_: any, data: any) =>
                <a onClick={() => {
                    setVisible2(true)
                    setBuilding(data)
                }} key="1" >
                    See Details
                </a>
        },
    ];


    return (
        <Modal style={{ borderRadius: 20 }}
            destroyOnClose
            title={user.name + " " + user.surname + " Buildings Overview"}
            open={visible}
            width={1000} onCancel={() => setVisible(false)}
            footer={
                <Button key="back"
                    type="primary"
                    onClick={() => setVisible(false)}>
                    Ok
                </Button>
            }>
            {load ?
                <Col span={24} style={{ width: "100%" }}>
                    <Skeleton.Image active={true} style={{ width: "100%", height: 300 }} />
                    <br /><br />
                    <Skeleton.Input active style={{ width: "100%" }} />
                    <ProSkeleton type="descriptions" />
                </Col>
                :
                <Row>
                    <Col span={24}>
                        <CustomersBuildingTable headerTitle={"Building List"} data={buildings} columns={columns} />
                    </Col>
                </Row>
            }
            <ModalDetails visible={visible2} setVisible={setVisible2} building={building} bills={bills} />
        </Modal>
    )
}
export default CustomerModal