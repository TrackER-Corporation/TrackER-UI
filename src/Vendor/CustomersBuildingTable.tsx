import { ProTable } from "@ant-design/pro-components"
import locale from 'antd/es/date-picker/locale/it_IT'
import { TableLocale } from "antd/es/table/interface"
import { CustomersBuildingTable } from "../types"

const CustomersBuildingTable = ({ data, columns, headerTitle = null }: CustomersBuildingTable) =>
    <ProTable
        columns={columns} dataSource={data}
        headerTitle={headerTitle}
        cardBordered
        cardProps={{ style: { borderRadius: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" } }}
        options={{ search: false, }}
        rowKey="key"
        locale={locale as TableLocale}
        search={false} dateFormatter="string" />

export default CustomersBuildingTable