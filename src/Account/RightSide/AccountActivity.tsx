import { ProTable } from "@ant-design/pro-components"
import { Col, Divider } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { AccountTitle, GreyParagraph } from "../../Components/CustomComponents";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { AccountActivity } from "../../types";
import { activityColumns, fetchActivity } from "../../accountUtils";

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
            }} columns={activityColumns}
                search={false}
                options={{ setting: false, reload: false, fullScreen: false, density: false, search: false }}
                dateFormatter="string"
            />
        </div>
    )
}
export default AccountActivity