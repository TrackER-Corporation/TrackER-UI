import { Button, Card, Col, InputNumber, message, Row, Tooltip } from "antd"
import { useState } from "react"
import api from "../../api"
import { PlanParagraph, PlanTitle } from "../../Components/CustomComponents"
import LoadingSpinner from "../../Components/LoadingSpinner"
import { fetchOrganization } from "../../reducers/organization"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { EditCard } from "../../types"
import IconFont from "../../Iconfont"

const EditCard = ({ data, type }: EditCard) => {
    const [edit, setEdit] = useState(true)
    const [load, setLoad] = useState(false)
    const organization = useAppSelector((state: any) => state.organization.organization)
    const [price, setPrices] = useState(organization.details)
    const dispatch = useAppDispatch()

    const editPrice = (
        value: number | null,
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
            ).catch(e => message.error("Error on Update", e))
        }
        setEdit(!edit)
    }

    return (
        data.length > 0 ?
            <Col style={{ marginTop: 22 }}>
                {load && <LoadingSpinner message="Updating Organization" />}
                <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                    <Row align="middle" justify="space-between">
                        {type === "gas" && <PlanTitle>Organization Gas Plan</PlanTitle>}
                        {type === "electric" && <PlanTitle>Organization Energy Plan</PlanTitle>}
                        {type === "water" && <PlanTitle>Organization Water Plan</PlanTitle>}
                        <Tooltip title="Edit your Plan">
                            <IconFont type="i-bianxie" style={{ fontSize: 30 }} />
                        </Tooltip>
                    </Row>
                    <Row justify="space-between" align="middle" gutter={[64, 64]} style={{ marginTop: 32 }}>
                        <Col md={3} xs={24} sm={24} style={{ textAlign: "center" }}>
                            {type === "gas" && <IconFont type="i-fire-line" style={{ fontSize: 80 }} />}
                            {type === "electric" && <IconFont type="i-Energy" style={{ fontSize: 80 }} />}
                            {type === "water" && <IconFont type="i-water-flash-line" style={{ fontSize: 80 }} />}
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
                                                <InputNumber
                                                    onChange={(value) => editPrice(value, el.name, type)}
                                                    disabled={edit}
                                                    min={0}
                                                    placeholder={el.price}
                                                    addonAfter={el.name.includes("Percentage") ? "%" : "€"}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <Row align="middle" justify="center" style={{ marginTop: 32 }}>
                        <Button
                            type="primary"
                            style={{ borderRadius: 10 }}
                            size="large"
                            onClick={() => editPlan()}>{!edit ? "Confirm Plan" : "Edit Plan"}
                        </Button>
                    </Row>
                </Card>
            </Col> : <></>
    )
}

export default EditCard