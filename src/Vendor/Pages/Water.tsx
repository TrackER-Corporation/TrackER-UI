import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { BillsAggregated, Pages } from "../../types"
import Wrapper from "./Wrapper"
import api from "../../api"
import { sortDate } from "../../Consumer/utils"

const Water = ({ cost }: Pages) => {
    const navigate = useNavigate()
    const allBuildings = useAppSelector((state: any) => state.allOrganization.allBuildings)
    const organization = useAppSelector((state) => state.organization.organization)
    const [metricCubic, setMetric] = useState(true)
    const [buildingId, setBuildingId] = useState("")
    const [visible, setVisible] = useState(false)
    const [waterSum, setWaterSum] = useState("0")
    const [allWater, setAllWater] = useState<any>([])
    const [labels, setLabels] = useState<any>([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [series, setSeries] = useState<any>([])
    const [allWaterLine, setAllWaterLine] = useState<any>([])
    const [resultBills, setResultBills] = useState<BillsAggregated | any>([])

    const getBills = async () => {
        await api.bills.getBillsByOrganizationIdAggregated(organization._id)
            .then((bills: BillsAggregated) => {
                setResultBills(bills)
                setWaterSum(bills.totalWater.toString())
                let earning = 0
                let costTot = 0
                cost.forEach((el) => {
                    if (el.name === "Water Cost at kWh") {
                        setTotalEarning(bills.totalWater * 0.0833333 / 1000 * el.price)
                        earning += bills.totalWater * 0.0833333 / 1000 * el.price
                    }
                    if (el.name === "Water Supplier Cost") {
                        setSupplier(bills.result.length * el.price)
                        earning += bills.result.length * el.price
                    }
                    if (el.name === "Water Delivery Cost") {
                        setDelivery(bills.result.length * el.price)
                        costTot += bills.result.length * el.price
                    }
                    if (el.name === "Water Tax Percentage") {
                        setTotalTax(bills.totalWater * 0.0833333 / 1000 * el.price / 100)
                        costTot += bills.totalWater * 0.0833333 / 1000 * el.price / 100
                    }
                });

                setSeries({
                    data: [{
                        x: 'Organization Earnings',
                        y: earning.toFixed(2),
                        fillColor: '#00E396'

                    }, {
                        x: 'Organization Cost',
                        y: costTot.toFixed(2),
                        fillColor: "#d40000"
                    }]
                })
                const tmp: any = []
                Object.values(bills.aggregated).map((el: any) => {
                    if (el.date)
                        tmp.push({ x: el.date, y: el.water })
                })
                sortDate(tmp)
                setAllWaterLine([{ data: tmp }])
                bills.result.forEach((bill) => {
                    let sum = 0
                    bill.bills.forEach((singleBill: any) => {
                        sum += singleBill.water
                    })
                    const name = allBuildings.find((el: any) => el._id === bill.buildingId)?.name
                    if (name !== undefined) {
                        setLabels((old: any) => [...old, name])
                        setAllWater((old: any) => [...old, (sum).toFixed(2)])
                    }
                })
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        setLabels([])
        setAllWater([])
        setWaterSum("0")
        getBills()
    }, [])

    return (
        <Wrapper navigate={navigate} title="Water Supplier Details" 
        drawer={ {showElectric:false, showGas:false, visible:visible, setVisible:setVisible, buildingId:buildingId} }
        pages={ {metricCubic: metricCubic, sum:waterSum, title:"Total Water Usage", metricSwap:["Liter/Hours (l/h)", "Gallon"], setMetric:setMetric,
        totalEarning:totalEarning, delivery:delivery, totalTaxCost:totalTaxCost, supplier:supplier, usage:"Water Usage", allLine:allWaterLine,
        series:series, all:allWater, labels:labels, setVisible:setVisible, setBuildingId: setBuildingId, resultBills:resultBills, unit:["L", "Gallon"],
        allBuildings:allBuildings
        } } />
    )
}
export default Water