import { Card, Col, Divider, Row, Tooltip } from "antd"
import OrganizationCard from "../Organization/OrganizationCard"
import "../Organization/Organization.css"
import { useState } from "react"
import { useEffect } from "react";
import { Step1 } from "../../types";
import { MoneyForm } from "./utils";
import IconFont from "../../Iconfont";

const FirstStep = ({ gas, setGas, electric, setElectric, water, setWater, distributed, setDistributed, setPrices, prices = [] }: Step1) => {
    const [solar, setSolar] = useState<any>(Object.values(prices).find((el: any) => el.name === "Solar" ? el.price : false))
    const [hydro, setHydro] = useState<any>(Object.values(prices).find((el: any) => el.name === "Hydro" ? el.price : false))
    const [windy, setWindy] = useState<any>(Object.values(prices).find((el: any) => el.name === "Wind" ? el.price : false))
    const [geo, setGeo] = useState<any>(Object.values(prices).find((el: any) => el.name === "Geo" ? el.price : false))
    const [pricesTmp, setPricesTmp] = useState(prices)
    const [name, setName] = useState("Solar")
    const [value, setValue] = useState(0)

    useEffect(() => {
        setPricesTmp(prices)
        let present = false
        const updatedList = pricesTmp.map((item: any) => {
            if (item.name === name) {
                present = true
                return { ...item, price: value };
            }
            return item;
        });
        if (!present)
            setPrices((old: any) => [...old, { name: name, price: value }])
        else
            setPrices(updatedList);
    }, [name, value])

    const setObj = (name: string, value: number) => {
        setName(name)
        setValue(value)
    }

    const formGas = [{
        label: "Cost at m³",
        onChange: (value: number) => setObj("Gas Cost at m³", value)
    },
    {
        label: "Supplier Cost",
        onChange: (value: number) => setObj("Supplier Gas Cost", value)
    },
    {
        label: "Delivery Cost",
        onChange: (value: number) => setObj("Gas Delivery Cost", value)
    },
    {
        label: "Tax Percentage",
        onChange: (value: number) => setObj("Gas Tax Percentage", value),
        isPercentage: true
    },]

    const formElectricity = [{
        label: "Cost at m³",
        onChange: (value: number) => setObj("Electricity Cost at m³", value)
    },
    {
        label: "Supplier Cost",
        onChange: (value: number) => setObj("Electricity Supplier Cost", value)
    },
    {
        label: "Delivery Cost",
        onChange: (value: number) => setObj("Electricity Delivery Cost", value)
    },
    {
        label: "Tax Percentage",
        onChange: (value: number) => setObj("Electricity Tax Percentage", value),
        isPercentage: true
    },]

    const formWater = [{
        label: "Cost at m³",
        onChange: (value: number) => setObj("Water Cost at m³", value)
    },
    {
        label: "Supplier Cost",
        onChange: (value: number) => setObj("Water Gas Cost", value)
    },
    {
        label: "Delivery Cost",
        onChange: (value: number) => setObj("Water Delivery Cost", value)
    },
    {
        label: "Tax Percentage",
        onChange: (value: number) => setObj("Water Tax Percentage", value),
        isPercentage: true
    },]

    return (
        <div>
            <Row gutter={[48, 48]} style={{ marginTop: "42px" }} justify="center">
                <Col lg={6} md={12} xs={24} sm={24}>
                    <div onClick={() => setGas(!gas)} data-testid="card">
                        <OrganizationCard
                            title={"Gas Supplier"}
                            description={"If your organization is providing natural gas to cities, region or country"}
                            selected={gas}
                        />
                    </div>
                    <Divider />
                    <div style={!gas ? { pointerEvents: "none", opacity: "0.4", transition: "1.5s" } : { transition: "1.5s" }}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db", }} >
                            <Row justify="space-between" gutter={[32, 8]}>
                                {formGas.map(el =>
                                    MoneyForm(el.label, el.onChange, el.isPercentage)
                                )}
                            </Row>
                        </Card>
                    </div>
                </Col>
                <Col lg={6} md={12} xs={24} sm={24}>
                    <div onClick={() => setElectric(!electric)} data-testid="card">
                        <OrganizationCard
                            title={"Electric Supplier"}
                            description={"If your organization is is providing electricity to cities, region or country"}
                            selected={electric}
                        />
                    </div>
                    <Divider />
                    <div style={!electric ? { pointerEvents: "none", opacity: "0.4", transition: "1.5s" } : { transition: "1.5s" }}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <Row justify="space-evenly" gutter={[32, 8]}>
                                {formElectricity.map(el =>
                                    MoneyForm(el.label, el.onChange, el.isPercentage)
                                )}
                            </Row>
                        </Card>
                    </div>
                </Col>
                <Col lg={6} md={12} xs={24} sm={24}>
                    <div onClick={() => setWater(!water)} data-testid="card">
                        <OrganizationCard
                            title={"Water Supplier"}
                            description={"If your organization is providing water to cities, region or country"}
                            selected={water}
                        />
                    </div>
                    <Divider />
                    <div style={!water ? { pointerEvents: "none", opacity: "0.4", transition: "1.5s" } : { transition: "1.5s" }}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <Row justify="space-between" gutter={[32, 8]}>
                                {formWater.map(el =>
                                    MoneyForm(el.label, el.onChange, el.isPercentage)
                                )}
                            </Row>
                        </Card>
                    </div>
                </Col>
                <Col lg={6} md={12} xs={24} sm={24}>
                    <div onClick={() => setDistributed(!distributed)} data-testid="card">
                        <OrganizationCard title={"Energy Resources"}
                            description={"If your organization is selling energy resources like Solar energy, Wind energy or Hydro energy"}
                            selected={distributed} />
                    </div>
                    <Divider />
                    <div style={!distributed ? { pointerEvents: "none", opacity: "0.4", transition: "1.5s" } : { transition: "1.5s" }}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <p style={{ fontSize: "16px", fontWeight: 500 }}>Energy Resources Type:</p>
                            <Row justify="space-evenly" style={{ marginTop: "32px" }}>
                                <Col span={12} style={{ height: "90px" }}
                                    data-testid="card"
                                    onClick={() => {
                                        setObj("Solar", solar!)
                                        setSolar(solar!)
                                    }}>
                                    <Tooltip title="Solar Energy" color="#2db7f5">
                                        <IconFont
                                            type="i-solar-panels"
                                            className={solar ? "iconfontMediumSelected" : "iconfontMedium"}
                                            style={{ color: solar ? "#1196db" : "black", }}
                                        />
                                    </Tooltip>
                                </Col>
                                <Col span={12} style={{ height: "90px" }}
                                    data-testid="card"
                                    onClick={() => {
                                        setObj("Hydro", hydro!)
                                        setHydro(hydro!)
                                    }}>
                                    <Tooltip title="Hydro Energy" color="#2db7f5">
                                        <IconFont
                                            type="i-hydro-power"
                                            className={hydro ? "iconfontMediumSelected" : "iconfontMedium"}
                                            style={{ color: hydro ? "#1196db" : "black", }}
                                        />
                                    </Tooltip>
                                </Col>
                                <Col span={12} style={{ height: "90px" }}
                                    data-testid="card"
                                    onClick={() => {
                                        setObj("Wind", windy!)
                                        setWindy(windy!)
                                    }}>
                                    <Tooltip title="Windy Energy" color="#2db7f5">
                                        <IconFont
                                            type="i-turbine"
                                            className={windy ? "iconfontMediumSelected" : "iconfontMedium"}
                                            style={{ color: windy ? "#1196db" : "black", }}
                                        />
                                    </Tooltip>
                                </Col>
                                <Col span={12} style={{ height: "90px" }}
                                    data-testid="card"
                                    onClick={() => {
                                        setObj("Geo", geo!)
                                        setGeo(geo!)
                                    }}>
                                    <Tooltip title="Geothermic Energy" color="#2db7f5">
                                        <IconFont
                                            style={{ color: geo ? "#1196db" : "black", }}
                                            className={geo ? "iconfontMediumSelected" : "iconfontMedium"}
                                            type="i-ecology" />
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div >
    )

}
export default FirstStep