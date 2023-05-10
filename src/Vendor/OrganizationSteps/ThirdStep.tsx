import { Avatar, Card, Descriptions } from "antd"
import { useEffect } from "react"
import { Step3 } from "../../types"

const ThirdStep = ({ name, owner, icon, createAt, type, description, prices = [], setData }: Step3) => {
    const renderPrices = prices.filter((value: any, index: number, self: any) =>
        value.name !== "" &&
        index === self.findIndex((t: any) => (
            t.price === value.price && t.name === value.name
        ))
    )

    const getData = () => {
        let gas: Array<number> = []
        let electric: Array<number> = []
        let water: Array<number> = []
        let resources: Array<number> = []

        renderPrices.map((el: any) => {
            if (el.name.includes("Gas"))
                gas.push(el)
            if (el.name.includes("Electricity"))
                electric.push(el)
            if (el.name.includes("Water"))
                water.push(el)
            if (el.price === true && (el.name.includes("Solar") || el.name.includes("Hydro") || el.name.includes("Wind") || el.name.includes("Bio") || el.name.includes("Geo")))
                resources.push(el)
        })
        setData({
            electric,
            gas,
            water,
            resources
        })
    }
    useEffect(() => {
        getData()
    }, [])


    const checkName = (name: string) => {
        if (name === "Solar" || name === "Wind" || name === "Geo" || name === "Hydro" || name === "Bio")
            return false
        return true
    }

    const getIcon = (name: string) => {
        if (name.includes("Solar"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe65f;</span>
        if (name.includes("Wind"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe661;</span>
        if (name.includes("Geo"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe64b;</span>
        if (name.includes("Hydro"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe650;</span>
        if (name.includes("Bio"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe645;</span>
    }

    return (
        <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
            <Descriptions title="Organization Info" bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="Name">{name}</Descriptions.Item>
                <Descriptions.Item label="Organization Owner">{owner}</Descriptions.Item>
                <Descriptions.Item label="Created at">{new Date(createAt).toDateString()}</Descriptions.Item>
                <Descriptions.Item label="Organization Type" span={2}>{type} </Descriptions.Item>
                <Descriptions.Item label="Organization logo" span={24}>
                    <Avatar size={250} src={icon} />
                </Descriptions.Item>
                <Descriptions.Item span={24} style={{ maxWidth: 100 }} label="Organization Description">{description}</Descriptions.Item>
                {renderPrices.map((element:any) => (element.name !== "" && checkName(element.name)) && <Descriptions.Item key={element.name} label={element.name}>{element.price}€</Descriptions.Item>)}
                {renderPrices.map((element:any) => (element.name !== "" && !checkName(element.name) && element.price) && <Descriptions.Item span={2} key={element.name} label={element.name}>{getIcon(element.name)}</Descriptions.Item>)}
            </Descriptions>
        </Card>
    )
}
export default ThirdStep