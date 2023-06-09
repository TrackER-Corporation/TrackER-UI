import { ArrowRightOutlined } from "@ant-design/icons"
import { Col, Row, Skeleton, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api"
import { AvatarHover } from "../../Components/CustomComponents";
import TweenOne from "rc-tween-one"
import { useAppSelector } from "../../hooks"
import { UserProps } from "../../types"

interface UsersCard {
    openModal: (arg: any) => void
}

const UsersCard = ({ openModal }: UsersCard) => {
    const navigate = useNavigate()
    const organization = useAppSelector((state) => state.organization.organization)
    const allUser = useAppSelector((state) => state.allUser.user)
    const [users, setUsers] = useState<Array<UserProps>>([])
    const [bills, setBills] = useState<object>([])
    const [avatars, setAvatars] = useState<object>([])
    const [loading, setLoading] = useState(true)
    const [invoices, setInvoices] = useState(0)


    const getUserBills = async (id: string) => {
        let total = 0
        let water = 0
        let gas = 0
        let electric = 0
        if(id !== undefined && id !== "undefined"){
            await api.bills.getBillsAggregated(id).then(res => {
                if (organization.type.includes("Electric")) {
                    organization.details.electric.forEach((el: any) => {
                        if (el.name === "Electricity Cost at kWh")
                            electric += res.totalElectric * 0.0833333 / 1000 * el.price
                        if (el.name === "Electricity Supplier Cost" || el.name === "Electricity Delivery Cost")
                            electric += el.price
                        if (el.name === "Electricity Tax Percentage")
                            electric += (res.totalElectric * el.price / 100)
                    });
                }
                if (organization.type.includes("Gas")) {
                    organization.details.gas.forEach((el: any) => {
                        if (el.name === "Gas Cost at m³")
                            gas += res.totalGas * 0.0454249414 / 1000 * el.price
                        if (el.name === "Supplier Gas Cost" || el.name === "Gas Delivery Cost")
                            gas += el.price
                        if (el.name === "Gas Tax Percentage")
                            gas += (res.totalGas * el.price / 100)
                    });
                }
                if (organization.type.includes("Water")) {
                    organization.details.water.forEach((el: any) => {
                        if (el.name === "Water Cost at m³")
                            water += res.totalWater * 0.0001666667 * el.price
                        if (el.name === "Water Supplier Cost" || el.name === "Water Delivery Cost")
                            water += el.price
                        if (el.name === "Water Tax Percentage")
                            water += (res.totalWater * el.price / 100)
                    });
                }
                total = gas + water + electric
                setInvoices(res.invoicesDays)
                setBills((bills: any) => [...bills, { value: Number(total).toFixed(2), id: id }])
            }).catch((e) => console.log(e))
        }
        
    }

    const getUserAvatar = async (id: string) => {
        await api.preference.getAvatar(id)
            .then(res => setAvatars((avatars: any) => [...avatars, { id: id, avatar: res }]))
            .catch(e => console.log(e))
    }

    useEffect(() => {
        const tmp: any = []
        if (organization === null || organization === undefined || organization.customers === null || organization.customers === undefined)
            return
        organization.customers.forEach(async (element: any) => {
            const res: any = allUser.find((el) => el._id === element.user)
            if (!tmp.includes(res) && res !== undefined) {
                tmp.push(res)
                await Promise.all([
                    getUserBills(element.user),
                    getUserAvatar(element.user),
                ]).then(() => setLoading(false))
            }
        });
        setUsers(tmp.slice(0, 4))
    }, [organization, allUser])

    return (
        <Row justify="space-between" style={{ marginTop: 32 }} align="middle">
            {users.length === 0 ?
                <></> :
                users.map((el, index: number) =>
                    <Col md={5} xs={24} sm={24}
                        style={{ textAlign: "center" }}
                        key={index}
                        data-testid="modal"
                        onClick={() => openModal(el)}
                    >
                        {loading ? <Skeleton active /> :
                            <Row>
                                <Col span={24}>
                                    <AvatarHover
                                        src={Object.values(avatars)
                                            .find((ele: any) => ele.id === el._id)?.avatar
                                        }
                                        size={120}
                                        shape="square"
                                    />
                                </Col>
                                <Col span={24}>
                                    <p style={{ fontWeight: "lighter", color: "blue", margin: 5 }}>{el.name} {el.surname}</p>
                                    <p style={{ fontSize: 22, fontWeight: "bold", margin: 0 }}>
                                        {Object.keys(bills).length > 0 ? Object.values(bills)
                                            .find((ele: any) => ele.id === el._id)?.value : 0}€
                                    </p>
                                    <p>{invoices} Invoices Days</p>
                                </Col>
                            </Row>
                        }
                    </Col>
                )}
            {users.length !== 0 &&
                <Col data-testid="back" md={1} xs={24} sm={24} onClick={() => navigate("/Customers")}>
                    <TweenOne
                        animation={{
                            x: 0,
                            yoyo: true,
                            repeat: -1,
                            duration: 1000
                        }}
                        style={{ transform: 'translateX(-20px)', textAlign: "center" }}
                    >
                        <Tooltip title="See all">
                            <ArrowRightOutlined style={{ fontSize: 30, color: "blue" }} />
                        </Tooltip>
                    </TweenOne>
                </Col>}
        </Row>
    )
}
export default UsersCard