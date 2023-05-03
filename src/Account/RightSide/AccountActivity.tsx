import { ProTable } from "@ant-design/pro-components"
import { Col, Divider } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { AccountTitle, GreyParagraph } from "../../Components/CustomComponents";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { AccountActivity } from "../../types";
import { fetchActivity } from "../../accountUtils";

const columns: any = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 50,
    },
    {
        title: 'Country',
        dataIndex: 'country_name',
    },
    {
        title: 'City',
        dataIndex: 'city',
    },
    {
        title: 'Ip',
        dataIndex: 'IPv4',
        initialValue: 'all',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        render: (date: string) => new Date(date).toLocaleString()
    },
];


const AccountActivity = ({ user }: AccountActivity) => {

    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        fetchActivity(user, setData, setLoad)
    }, [])


    return (

        <div>
            <Col>
                <AccountTitle>Login Activity</AccountTitle>
                <GreyParagraph>Here is your last login activities log.</GreyParagraph>
            </Col>
            <Divider />
            {load && <LoadingSpinner />}
            <ProTable dataSource={data} rowKey="key" pagination={{
                hideOnSinglePage: true,
            }} columns={columns} search={false} options={{ setting: false, reload: false, fullScreen: false, density: false, search: false }} dateFormatter="string" />
        </div>
    )
}
export default AccountActivity