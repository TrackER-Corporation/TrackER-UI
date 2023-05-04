import { Row, Select } from "antd"
import { Option } from "antd/lib/mentions"
import IconFont from "../../Iconfont"

interface BuildingOptions {
    setType: (arg: string) => void,
    placeholder?: string
}

const BuildingOptions = ({ setType, placeholder = "Building Type" }: BuildingOptions) =>
    <Select
        // filterSort={(optionA, optionB) => optionA.value?.toString().toLowerCase().localeCompare(optionB.value?.toString().toLowerCase())}
        showSearch
        placeholder={<Row align="middle">{placeholder}</Row>} size="large" onChange={(val) => setType(val)}>
        <Option value="Residential">
            <Row align="middle">
                <IconFont type="i--house" />Residential</Row>
        </Option>
        <Option value="Factory">
            <Row align="middle"><IconFont type="i-factory" /> Factory</Row>
        </Option>
        <Option value="Skyscraper">
            <Row align="middle"><IconFont type="i--skyline" /> Skyscraper</Row>
        </Option >
        <Option value="School">
            <Row align="middle"><IconFont type="i-school" />School</Row>
        </Option >
        <Option value="University">
            <Row align="middle"><IconFont type="i-university" /> University</Row>
        </Option >
        <Option value="Hospital">
            <Row align="middle"><IconFont type="i-ambulance" /> Hospital</Row>
        </Option >
        <Option value="Police Station">
            <Row align="middle"><IconFont type="i-police" /> Police Station</Row>
        </Option >
        <Option value="Bank">
            <Row align="middle"><IconFont type="i-bank" /> Bank</Row>
        </Option >
        <Option value="Shopping Mall">
            <Row align="middle"><IconFont type="i--shopping-mal" /> Shopping Mall</Row>
        </Option >
        <Option value="Court">
            <Row align="middle"><IconFont type="i-museum" /> Court</Row>
        </Option >
        <Option value="Airport">
            <Row align="middle"><IconFont type="i-airport" /> Airport</Row>
        </Option >
        <Option value="City Hall">
            <Row align="middle"><IconFont type="i--orthodoxian" /> City Hall</Row>
        </Option >
    </Select >
export default BuildingOptions