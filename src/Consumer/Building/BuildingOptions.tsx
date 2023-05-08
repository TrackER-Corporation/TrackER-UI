import { Row, Select } from "antd"
import IconFont from "../../Iconfont"

interface BuildingOptions {
    setType: (arg: string) => void,
    placeholder?: string
}

const BuildingOptions = ({ setType, placeholder = "Building Type" }: BuildingOptions) =>
    <Select
        // filterSort={(optionA, optionB) => optionA.value?.toString().toLowerCase().localeCompare(optionB.value?.toString().toLowerCase())}
        data-testid="select"
        showSearch
        placeholder={<Row align="middle">{placeholder}</Row>}
        size="large"
        onChange={(val) => setType(val)}
        options={[
            { value: 'Residential', label: <Row align="middle"><IconFont type="i--house" />Residential</Row> },
            { value: 'Factory', label: <Row align="middle"><IconFont type="i-factory" /> Factory</Row> },
            { value: 'Skyscraper', label: <Row align="middle"><IconFont type="i--skyline" /> Skyscraper</Row> },
            { value: 'School', label: <Row align="middle"><IconFont type="i-school" />School</Row> },
            { value: 'University', label: <Row align="middle"><IconFont type="i-university" /> University</Row> },
            { value: 'Hospital', label: <Row align="middle"><IconFont type="i-ambulance" /> Hospital</Row> },
            { value: 'Police Station', label: <Row align="middle"><IconFont type="i-police" /> Police Station</Row> },
            { value: 'Bank', label: <Row align="middle"><IconFont type="i-bank" /> Bank</Row> },
            { value: 'Shopping Mall', label: <Row align="middle"><IconFont type="i--shopping-mal" /> Shopping Mall</Row> },
            { value: 'Court', label: <Row align="middle"><IconFont type="i-museum" /> Court</Row> },
            { value: 'Airport', label: <Row align="middle"><IconFont type="i-airport" /> Airport</Row> },
            { value: 'City Hall', label: <Row align="middle"><IconFont type="i--orthodoxian" /> City Hall</Row> },

        ]}
    />
export default BuildingOptions