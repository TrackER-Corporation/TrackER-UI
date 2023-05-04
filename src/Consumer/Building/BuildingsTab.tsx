import { AutoComplete, Breadcrumb, Button, Card, Empty, Input, Layout, Row, Select, message } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { fetchBuildings } from "../../reducers/buildings";
import LoadingSpinner from '../../Components/LoadingSpinner';
import moment from "moment";
import EditBuildingModal from "./EditBuildingModal";
import { useNavigate } from "react-router-dom";
import BuildingCard from "./BuildingCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { PageHeader } from "@ant-design/pro-components";
import api from "../../api";
import "./style.css"
import { getBills } from "../utils";

const { Option } = Select;
const { Search } = Input;

const BuildingTab = ({ updateRoute }: any) => {

    const navigate = useNavigate()
    const buildings = useAppSelector((state) => state.buildings.buildings)
    const user = useAppSelector((state) => state.user.user)
    const allOrg = useAppSelector((state) => state.allOrganization.organization)
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false)
    const [bills, setBills] = useState<any>([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filter, setFilter] = useState("Address");
    const [buildingsFilter, setBuildingsFilter] = useState<any>(buildings);
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [buildingId, setBuildingId] = useState("")
    const [type, setType] = useState("")
    const [myMessage, setMessage] = useState("")

    const deleteBuilding = async (id: string) => {
        setMessage("Deleting...")
        setShow(true)
        await api.buildings.deleteBuilding(id)
        await api.buildings.fetchBuildings(user._id).then((res) => {
            setTimeout(() => {
                setShow(false)
            }, 1000);
            message.success("Building deleted correctly")
            setBuildingsFilter(res)
            dispatch(fetchBuildings(res))
        })
        window.scroll(0, 0)
    }

    useEffect(() => {
        getBills(user._id, setBills)
        window.scroll(0, 0)
    }, [buildings, show])

    const getData = (id: string, type: string) => {
        if (bills.all === undefined)
            return []
        const test = bills.all.find((el: any) => el.buildingId === id)
        if (test === undefined) {
            return []
        }
        const data: Array<any> = []
        test.bills.map((el: any) =>
            data.push({
                x: moment.utc(el.date).local().format(),
                y: el[type.toLowerCase()]
            }))
        return [{
            name: type,
            data: data
        }]
    }

    const showBills = (type: string, orgId: string) =>
        allOrg.find((el: any) => el._id === orgId).type.includes(type)


    const renderItem = () => {
        const tmp: Array<object> = []
        if (buildings === null)
            return []
        buildings.map((el: any) =>
            tmp.push(
                {
                    value: filter === "Address" ? el.address : el.name,
                    label: filter === "Address" ? el.address : el.name,
                    key: el.id,
                    props: el.id
                })
        )
        return tmp
    };

    const renderBuildings = (element: string) => {
        const res = buildings.find((el: any) =>
            filter === "Address" ? el.address === element : el.name === element,
        )
        setBuildingsFilter([res])
    };

    const updateBuilding = async (buildingId: string) => {
        const data = {
            name,
            contact,
            address,
            type,
        }
        setMessage("Updating...")
        setShow(true)
        await api.buildings.updateBuilding(buildingId, data).catch(() => {
            setShow(false);
            message.error("Error...")
        })
        await api.buildings.fetchBuildings(user._id).then((res) => {
            dispatch(fetchBuildings(res))
            setBuildingsFilter(res)
            setTimeout(() => {
                setShow(false)
                message.success("Updated successfully")
            }, 1000);
        })
    }

    return (
        <Layout
            className="site-layout-background"
            style={{
                padding: 24,
                minHeight: 280,
            }}
        >
            {show && <LoadingSpinner message={myMessage}></LoadingSpinner>}
            <Row gutter={[16, 16]} >
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Buildings</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Buildings Portfolio"
                subTitle="Browse and check your buildings"
                onBack={() => navigate("/Dashboard")}
            />
            <Row style={{ width: "100%" }}>
                <Input.Group compact>
                    <Select
                        onChange={(val) => setFilter(val)}
                        defaultValue="Address"
                        style={{ width: "35%" }}
                    >
                        <Option value="Address">Address</Option>
                        <Option value="Building">Building</Option>
                    </Select>
                    <AutoComplete
                        allowClear
                        onClear={() => {
                            setBuildingsFilter(buildings)
                            window.scroll(0, 0)
                        }}
                        style={{ width: "65%" }}
                        dataSource={renderItem() as any}
                        onSelect={(value, da: any) => renderBuildings(da.value)}
                    >
                        <Search placeholder="Search by Name"
                        />
                    </AutoComplete>
                </Input.Group>
            </Row>
            {
                !buildingsFilter || buildingsFilter.length === 0 ?
                    <Card style={{ marginTop: "32px" }}>
                        <Empty description="No Buildings found...">
                            <Button style={{ height: 40, borderRadius: 8 }}
                                type="primary"
                                onClick={() => {
                                    updateRoute("/building/New")
                                }}>
                                Add a new Building to your account!
                            </Button>
                        </Empty>
                    </Card>
                    :
                    buildingsFilter.map((item: any) =>
                        <BuildingCard
                            key={item._id}
                            bills={bills}
                            deleteBuilding={deleteBuilding}
                            getData={getData}
                            setAddress={setAddress}
                            setBuildingId={setBuildingId}
                            setContact={setContact}
                            item={item}
                            setIsModalVisible={setIsModalVisible}
                            setName={setName}
                            setType={setType}
                            showBills={showBills}
                        />)
            }
            <EditBuildingModal
                setName={(val) => setName(val)}
                setContact={(val) => setContact(val)}
                setType={(val) => setType(val)}
                buildingId={buildingId}
                name={name}
                contact={contact}
                address={address}
                type={type}
                visible={isModalVisible}
                setVisible={() => setIsModalVisible(false)}
                updateBuilding={() => updateBuilding(buildingId)}
            />
        </Layout >)
}


export default (props: any) => <BuildingTab {...props} />
