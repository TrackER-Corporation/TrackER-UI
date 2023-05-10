import { Button, Card, Col, InputNumber, message, Row, Tooltip } from "antd"
import { useState } from "react"
import api from "../../api"
import { PlanParagraph, PlanTitle } from "../../Components/CustomComponents"
import LoadingSpinner from "../../Components/LoadingSpinner"
import { fetchOrganization } from "../../reducers/organization"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { EditCard } from "../../types"

interface Resource {
    name: string;
    price: number;
}

const EditCard = ({ data, type }: EditCard) => {
    const [edit, setEdit] = useState(true)
    const [load, setLoad] = useState(false)
    const organization = useAppSelector((state: any) => state.organization.organization)
    const [price, setPrices] = useState(organization.details)
    const dispatch = useAppDispatch()

    const editPrice = (
        value: number,
        name: string,
        type: string,
    ) => {
        const newResources = price[type].map((resource: any) =>
            resource.name === name ? { ...resource, price: value } : resource
        );
        const newPrices = { ...price, [type]: newResources };
        setPrices(newPrices);
    };

    const editPlan = () => {
        if (!edit) {
            const data = { ...organization, details: price }
            setLoad(true)
            api.organization.update(organization._id, data).then((res) => {
                dispatch(fetchOrganization(res))
                setTimeout(() => {
                    setLoad(false)
                    message.success("Organization Plan Updated")
                }, 3000);
            }
            ).catch(e => message.success("Error on Update", e))
        }
        setEdit(!edit)
    }

    return (
        data.length > 0 ?
            <Col span={24} style={{ marginTop: 22 }}>
                {load && <LoadingSpinner message="Updating Organization" />}
                <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                    <Row align="middle" justify="space-between">
                        {type === "g" && <PlanTitle>Organization Gas Plan</PlanTitle>}
                        {type === "e" && <PlanTitle>Organization Energy Plan</PlanTitle>}
                        {type === "w" && <PlanTitle>Organization Water Plan</PlanTitle>}
                        {/* {type === "r" && <PlanTitle>Organization Energy Resources Plan</PlanTitle>} */}
                        <Tooltip title="Edit your Plan">
                            <div>
                                <span className="anticon iconfont" style={{ cursor: "pointer" }} >&#x100e9;</span>
                            </div>
                        </Tooltip>
                    </Row>
                    <Row justify="space-between" align="middle" gutter={[64, 64]} style={{ marginTop: 32 }}>
                        <Col md={3} xs={24} sm={24} style={{ textAlign: "center" }}>
                            {type === "g" && <span className="anticon iconfontLarge" style={{ color: "#19e396" }} >&#xe657;</span>}
                            {type === "e" && <span className="anticon iconfontLarge" style={{ color: "#ffd901" }}>&#xe61d;</span>}
                            {type === "w" && <span className="anticon iconfontLarge" style={{ color: "#1984f5" }} >&#xe730;</span>}
                            {/* {type === "r" && <span class="anticon iconfontLarge" >&#xe927;</span>} */}
                        </Col>
                        <Col md={21} xs={24} sm={24}>
                            <Row gutter={[16, 32]}>
                                {data.map((el: any) =>
                                    <Col md={12} sm={24} xs={24}>
                                        <Row justify="space-between" align="middle">
                                            <Col md={10} xs={12} sm={12}>
                                                <PlanParagraph>{el.name}</PlanParagraph>
                                            </Col>
                                            <Col md={14} xs={12} sm={12}>
                                                <InputNumber onChange={(value) => editPrice(value!, el.name, type)} disabled={edit} min={0} placeholder={el.price} addonAfter={el.name.includes("Percentage") ? "%" : "€"} />
                                            </Col>
                                        </Row>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <Row align="middle" justify="center" style={{ marginTop: 32 }}>
                        <Button type="primary" size="large" style={{ borderRadius: 10 }} onClick={() => editPlan()}>{!edit ? "Confirm Plan" : "Edit Plan"}</Button>
                    </Row>
                </Card>
            </Col> : <></>
    )
}

export default EditCard