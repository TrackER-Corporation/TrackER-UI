import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { BillsAggregated, Pages } from "../../types"
import Wrapper from "./Wrapper"
import api from "../../api"
import { sortDate } from "../../Consumer/utils"

const Gas = ({ cost }: Pages) => {
    const navigate = useNavigate()
    const allBuildings = useAppSelector((state: any) => state.allOrganization.allBuildings)
    const organization = useAppSelector((state) => state.organization.organization)
    const [metricCubic, setMetric] = useState(true)
    const [buildingId, setBuildingId] = useState("")
    const [visible, setVisible] = useState(false)
    const [gasSum, setGasSum] = useState("0")
    const [allGas, setAllGas] = useState<any>([])
    const [allGasLine, setAllGasLine] = useState<any>([])
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
                setGasSum(bills.totalGas.toString())
                let earning = 0
                let costTot = 0
                cost.forEach((el) => {
                    if (el.name === "Gas Cost at m³") {
                        setTotalEarning(bills.totalGas * 0.0833333 / 1000 * el.price)
                        earning += bills.totalGas * 0.0833333 / 1000 * el.price
                    }
                    if (el.name === "Supplier Gas Cost") {
                        setSupplier(bills.result.length * el.price)
                        earning += bills.result.length * el.price
                    }
                    if (el.name === "Gas Delivery Cost") {
                        setDelivery(bills.result.length * el.price)
                        costTot += bills.result.length * el.price
                    }
                    if (el.name === "Gas Tax Percentage") {
                        setTotalTax(bills.totalGas * 0.0833333 / 1000 * el.price / 100)
                        costTot += bills.totalGas * 0.0833333 / 1000 * el.price / 100
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
                        tmp.push({ x: el.date, y: el.gas })
                })
                sortDate(tmp)
                setAllGasLine([{ data: tmp }])
                bills.result.forEach((bill) => {
                    let sum = 0
                    bill.bills.forEach((singleBill: any) => {
                        sum += singleBill.gas
                    })
                    const name = allBuildings.find((el: any) => el._id === bill.buildingId)?.name
                    if (name !== undefined) {
                        setLabels((old: any) => [...old, name])
                        setAllGas((old: any) => [...old, (sum).toFixed(2)])
                    }
                })
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        setLabels([])
        setAllGas([])
        setGasSum("0")
        getBills()
    }, [])

    return (
        <Wrapper navigate={navigate} title="Gas Supplier Details" 
        drawer={ {showElectric:false, showWater:false, visible:visible, setVisible:setVisible, buildingId:buildingId} }
        pages={ {metricCubic: metricCubic, sum:gasSum, title:"Total Gas Usage", metricSwap:["Gas/m³", "Gallon"], setMetric:setMetric,
        totalEarning:totalEarning, delivery:delivery, totalTaxCost:totalTaxCost, supplier:supplier, usage:"Electric Usage", allLine:allGasLine,
        series:series, all:allGas, labels:labels, setVisible:setVisible, setBuildingId: setBuildingId, resultBills:resultBills, unit:["m³", "Gallon"],
        allBuildings:allBuildings
        } } />
    )
}
export default Gas