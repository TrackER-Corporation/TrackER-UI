import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { BillsAggregated, Pages } from "../../types"
import Wrapper from "./Wrapper"
import api from "../../api"
import { sortDate } from "../../Consumer/utils"

const Electric = ({ cost }: Pages) => {
    const navigate = useNavigate()
    const allBuildings = useAppSelector((state) => state.allOrganization.allBuildings)
    const organization = useAppSelector((state) => state.organization.organization)
    const [metricCubic, setMetric] = useState(true)
    const [buildingId, setBuildingId] = useState("")
    const [visible, setVisible] = useState(false)
    const [electricSum, setElectricSum] = useState("0")
    const [allElectric, setAllElectric] = useState<any>([])
    const [allElectricLine, setAllElectricLine] = useState<any>([])
    const [labels, setLabels] = useState<any>([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [series, setSeries] = useState<any>([])
    const [resultBills, setResultBills] = useState<BillsAggregated | any>([])

    const getBills = async () => {
        await api.bills.getBillsByOrganizationIdAggregated(organization._id)
            .then((bills: BillsAggregated) => {
                setResultBills(bills)
                setElectricSum(bills.totalElectric.toString())
                let earning = 0
                let costTot = 0
                cost.forEach((el) => {
                    if (el.name === "Electricity Cost at kWh") {
                        setTotalEarning(bills.totalElectric * 0.0833333 / 1000 * el.price)
                        earning += bills.totalElectric * 0.0833333 / 1000 * el.price
                    }
                    if (el.name === "Electricity Supplier Cost") {
                        setSupplier(bills.result.length * el.price)
                        earning += bills.result.length * el.price
                    }
                    if (el.name === "Electricity Delivery Cost") {
                        setDelivery(bills.result.length * el.price)
                        costTot += bills.result.length * el.price
                    }
                    if (el.name === "Electricity Tax Percentage") {
                        setTotalTax(bills.totalElectric * 0.0833333 / 1000 * el.price / 100)
                        costTot += bills.totalElectric * 0.0833333 / 1000 * el.price / 100
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
                        tmp.push({ x: el.date, y: el.electric })
                })
                sortDate(tmp)
                setAllElectricLine([{ data: tmp }])
                bills.result.forEach((bill) => {
                    let sum = 0
                    bill.bills.forEach((singleBill: any) => {
                        sum += singleBill.electric
                    })
                    const name = allBuildings.find((el: any) => el._id === bill.buildingId)?.name
                    if (name !== undefined) {
                        setLabels((old: any) => [...old, name])
                        setAllElectric((old: any) => [...old, (sum).toFixed(2)])
                    }
                })
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        setLabels([])
        setAllElectric([])
        setElectricSum("0")
        getBills()
    }, [])



    return (
        <Wrapper navigate={navigate} title="Electric Supplier Details" 
        drawer={ {showGas:false, showWater:false, visible:visible, setVisible:setVisible, buildingId:buildingId} }
        pages={ {metricCubic: metricCubic, sum:electricSum, title:"Total Electric Usage", metricSwap:["Kilowatt (kW)", "Watt"], setMetric:setMetric,
        totalEarning:totalEarning, delivery:delivery, totalTaxCost:totalTaxCost, supplier:supplier, usage:"Electric Usage", allLine:allElectricLine,
        series:series, all:allElectric, labels:labels, setVisible:setVisible, setBuildingId: setBuildingId, resultBills:resultBills, unit:["kWh", "w"],
        allBuildings:allBuildings
        } } />
    )
}
export default Electric