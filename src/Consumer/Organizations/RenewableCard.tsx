import { Card, Col, Row } from "antd"
import { useEffect, useState } from "react"
import api from "../../api"
import { renderRenewableInfo } from "./utils"

interface RenewableCard {
    title: string,
    organizationId: string
}

const RenewableCard = ({ title, organizationId }: RenewableCard) => {
    const [load, setLoad] = useState(true)
    const [hydro, setHydro] = useState<Array<any>>([])
    const [geo, setGeo] = useState<Array<any>>([])
    const [wind, setWind] = useState<Array<any>>([])
    const [solar, setSolar] = useState<Array<any>>([])

    const getData = async () => {
        setSolar([])
        setGeo([])
        setWind([])
        setHydro([])
        await api.renewable.fetchResourcesByOrganizationId(organizationId).then((res) => {
            res.map((el: any) => {
                switch (el.resourcesType) {
                    case "Hydro":
                        setHydro((old) => [...old, el])
                        break
                    case "Geo":
                        setGeo((old) => [...old, el])
                        break
                    case "Wind":
                        setWind((old) => [...old, el])
                        break
                    case "Solar":
                        setSolar((old) => [...old, el])
                        break
                    default:
                        break
                }
            })
            setTimeout(() => {
                setLoad(false)
            }, 1000);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (organizationId === null)
            return
        getData()
    }, [title])


    return (
        <Card style={{
            borderRadius: 20,
            boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)"
        }}>

            <Row gutter={[32, 16]}>
                <Col span={24}>
                    <p style={{
                        overflow: "hidden",
                        color: "rgba(0, 0, 0, 0.85)",
                        fontWeight: "bold",
                        fontSize: "20px",
                        lineHeight: 1.5715,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: 0
                    }}>{title}</p>
                </Col>
                <Col span={24}>
                    {renderRenewableInfo(solar, "Solar", load)}
                    {renderRenewableInfo(hydro, "Hydro", load)}
                    {renderRenewableInfo(geo, "Geothermic", load)}
                    {renderRenewableInfo(wind, "Windy", load)}
                </Col>
            </Row>
        </Card>
    )
}
export default RenewableCard