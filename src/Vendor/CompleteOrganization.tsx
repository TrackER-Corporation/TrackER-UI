import { Alert, Breadcrumb, Button, Col, Row, Steps, message } from "antd"
import { useState, useEffect } from "react";
import api from "../api"
import { fetchOrganization } from "../reducers/organization";
import { useAppDispatch, useAppSelector } from "../hooks";
import FirstStep from "./OrganizationSteps/FirstStep";
import SecondStep from "./OrganizationSteps/SecondStep";
import ThirdStep from "./OrganizationSteps/ThirdStep";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import LoadingSpinner from "../Components/LoadingSpinner";

const { Step } = Steps;
const CompleteOrganization = () => {
    const organization = useAppSelector(state => state.organization.organization)
    const user = useAppSelector(state => state.user.user)
    const [current, setCurrent] = useState(0);
    const [gas, setGas] = useState(false);
    const [electric, setElectric] = useState(false);
    const [water, setWater] = useState(false);
    const [distributed, setDistributed] = useState(false);
    const [error, setError] = useState(false);
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [prices, setPrices] = useState([]);
    const [show, setShow] = useState(false);
    const [body, setData] = useState({});
    const dispatch = useAppDispatch()

    const getOrg = async () => {
        if (Object.keys(organization).length === 0) {
            await api.organization.getByUserId(user._id).then(
                (res) => {
                    console.log(res)
                    dispatch(fetchOrganization(res))
                }
            ).catch(e => console.log(e))
        }
    }

    useEffect(() => {
        getOrg()
        dispatch(fetchOrganization({}))
    }, [])


    const onChange = (value: any) => {
        if (checkValue())
            setCurrent(value);
    };

    const checkPrices = (price: any, name: any) => {
        return price.reduce(function (acc: any, cur: any) {
            if (cur.name.includes(name)) acc += 1
            return acc;
        }, 0) < 4;
    }

    const checkValue = () => {
        let checkPrice = prices.filter((value: any, index: any, self: any) => value.name !== "" && index === self.findIndex((t: any) => (t.price === value.price && t.name === value.name)))
        setError(false)
        if (!gas && !electric && !water && !distributed) {
            setError(true)
            return false
        }
        if (gas && checkPrices(checkPrice, "Gas")) {
            setError(true)
            return false
        }

        if (electric && checkPrices(checkPrice, "Electric")) {
            setError(true)
            return false
        }

        if (water && checkPrices(checkPrice, "Water")) {
            setError(true)
            return false
        }
        return true
    }

    const next = () => {
        if (current === 2)
            submit()
        else
            if (checkValue())
                setCurrent(current + 1)
    }
    const previous = () => {
        if (current !== 0)
            setCurrent(current - 1)
    }

    const submit = async () => {
        setShow(true)
        let arr = []

        if (distributed) arr.push("Distributed")
        if (gas) arr.push("Gas")
        if (electric) arr.push("Electric")
        if (water) arr.push("Water")

        let data = {
            icon: icon,
            type: arr,
            description: description,
            details: body
        }
        await api.organization.update(organization._id, data).then((data) => {
            dispatch(fetchOrganization(data))
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }).catch(error => {
            console.log(error)
            setShow(false)
            message.error("Failed")
        })
    }

    return (
        <div>
            <Breadcrumb
                items={[
                    {
                        title: 'Home',
                    },
                    {
                        title: <a>Buildings</a>
                    },
                    {
                        title: <a>Create</a>
                    },
                ]}
            />
            {error && <Alert style={{ marginTop: "22px" }}
                message="Error! Cannot continue..."
                showIcon
                description="Select the organization type and fill all the form to continue with the submission"
                type="error"
                closable
                onClose={() => setError(false)}
            />}
            <Steps style={{ marginTop: "22px", paddingRight: 30, paddingLeft: 30 }} current={current} size="default" type="navigation" onChange={onChange} percent={33.5 * (current + 1)}>
                <Step title="Set your organization type" description={<p>Select and fill the Organization type form</p>} />
                <Step title="Fill Organization details" description={<p>Tell us and customers more about your organization.</p>} />
                <Step title="Confirm Organization Data" description="Check and Confirm your Organization data." />
            </Steps>
            <p></p>
            {current === 0 && <FirstStep distributed={distributed} electric={electric} gas={gas} water={water} setDistributed={setDistributed} setElectric={setElectric} setGas={setGas} setWater={setWater} setPrices={setPrices} prices={prices} />}
            {current === 1 && <SecondStep setIcon={setIcon} name={organization.name} setDescription={setDescription} description={description} />}
            {current === 2 && <ThirdStep icon={icon} setData={setData} name={organization.name} owner={user.name + " " + user.surname} createAt={organization.createAt} prices={prices} description={description}
                type={[distributed === true && "-Distributed Energy Resources ", gas === true && "-Gas Supplier ", electric === true && "-Electric Supplier ", water === true && "-Water Supplier "]} />}



            <Row justify="space-between" style={{ padding: 24 }}>
                <Col span={12}>
                    {current !== 0 && <Button style={{ borderRadius: 10, }} onClick={() => previous()}><LeftCircleOutlined />Previous</Button>}
                </Col>
                <Col>
                    <Button type={current === 2 ? "primary" : "default"} style={{ borderRadius: 10, justifySelf: "end" }} onClick={() => next()}> {current === 2 ? "Submit" : "Next"}
                        <RightCircleOutlined />
                    </Button>
                </Col>
            </Row>
            {show && <LoadingSpinner message="Creating your organization..." />}
        </div >
    )
}

export default CompleteOrganization