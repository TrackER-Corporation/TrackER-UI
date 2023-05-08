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
import { deleteBuilding } from "./utils";

const { Search } = Input;

interface BuildingTabProps {
    updateRoute: (arg: string) => void
}

const BuildingTab = ({ updateRoute }: BuildingTabProps) => {

    const buildings = useAppSelector((state) => state.buildings.buildings)
    const user = useAppSelector((state) => state.user.user)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [show, setShow] = useState(false)
    const [bills, setBills] = useState<any>([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filter, setFilter] = useState("Address");
    const [buildingsFilter, setBuildingsFilter] = useState(buildings);
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [buildingId, setBuildingId] = useState("")
    const [type, setType] = useState("")
    const [myMessage, setMessage] = useState("")


    useEffect(() => {
        getBills(user._id, setBills)
        window.scroll(0, 0)
    }, [buildings, show])

    const getData = (id: string, type: string) => {
        const buildingBills = bills?.all?.find((el: any) => el.buildingId === id);
        if (!buildingBills) return [];

        return [{
            name: type,
            data: buildingBills.bills
                .filter((el: any) => el[type.toLowerCase()] !== undefined)
                .map((el: any) => ({
                    x: moment.utc(el.date).local().format(),
                    y: el[type.toLowerCase()]
                }))
        }];
    };


    const renderItem = () => {
        if (!buildings || buildings.length === undefined || buildings.length === 0) return [];
        return buildings.map(({ _id, address, name }) => ({
            value: filter === "Address" ? address : name,
            label: filter === "Address" ? address : name,
            key: _id,
            props: _id
        }));
    };

    const renderBuildings = (element: string) => {
        const res = buildings.find((el) =>
            filter === "Address" ? el.address === element : el.name === element
        )
        res ? setBuildingsFilter([res]) : setBuildingsFilter([])
    };

    const updateBuilding = async (buildingId: string) => {
        try {
            setMessage("Updating...");
            setShow(true);
            const data = { name, contact, address, type };
            await api.buildings.updateBuilding(buildingId, data);
            const updatedBuildings = await api.buildings.fetchBuildings(user._id);
            setBuildingsFilter(updatedBuildings);
            dispatch(fetchBuildings(updatedBuildings));
            setShow(false);
            message.success("Updated successfully");
        } catch (error) {
            setShow(false);
            message.error("Failed to update building");
            console.error(error);
        }
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
                <Breadcrumb
                    items={[
                        {
                            title: 'Home',
                        },
                        {
                            title: <a>Buildings</a>
                        }
                    ]}
                />
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
                        options={[
                            { value: "Address", label: "Address", },
                            { value: "Building", label: "Building", }
                        ]}
                    />
                    <AutoComplete
                        allowClear
                        onClear={() => {
                            setBuildingsFilter(buildings)
                            window.scroll(0, 0)
                        }}
                        style={{ width: "65%" }}
                        dataSource={renderItem() as any}
                        onSelect={(value) => renderBuildings(value)}
                    >
                        <Search placeholder="Search by Name" />
                    </AutoComplete>
                </Input.Group>
            </Row>
            {
                !buildingsFilter || buildingsFilter.length === undefined ?
                    <Card style={{ marginTop: "32px" }}>
                        <Empty description="No Buildings found...">
                            <Button style={{ height: 40, borderRadius: 8 }}
                                type="primary"
                                onClick={() => updateRoute("/building/New")}>
                                Add a new Building to your account!
                            </Button>
                        </Empty>
                    </Card>
                    :
                    buildingsFilter.map((item) =>
                        <BuildingCard
                            key={item._id}
                            bills={bills}
                            deleteBuilding={() =>
                                deleteBuilding(
                                    item._id,
                                    user._id,
                                    setMessage,
                                    setShow,
                                    setBuildingsFilter,
                                    dispatch
                                )
                            }
                            getData={getData}
                            setAddress={setAddress}
                            setBuildingId={setBuildingId}
                            setContact={setContact}
                            item={item}
                            setIsModalVisible={setIsModalVisible}
                            setName={setName}
                            setType={setType}
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


export default (props: BuildingTabProps) => <BuildingTab {...props} />
