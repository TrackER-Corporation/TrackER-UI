import { ProTable } from "@ant-design/pro-components"
import { useEffect, useState } from "react";
import ContractModal from "./ContractModal";
import { useAppSelector } from "../../../hooks";
import { getRenewable, resourcesColumns } from "./utils";
import { Building } from "../../../types";

interface ResourcesContent {
    data: any,
    type: string,
    building: Building
}

const ResourcesContent = ({ data, type, building }: ResourcesContent) => {
    const allOrganization = useAppSelector(state => state.allOrganization.organization)
    const [dataTable, setDataTable] = useState([])
    const [selected, setSelected] = useState({})
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        getRenewable(setDataTable, type)
    }, [data, type])

    return (
        <>
            <ProTable headerTitle={" Resources List"}
                dataSource={dataTable}
                request={() => getRenewable(setDataTable, type) as any}
                columns={resourcesColumns(allOrganization, setSelected, setVisible) as any}
                search={false}
                dateFormatter="string"
            />
            <ContractModal
                data={selected}
                visible={visible}
                setVisible={setVisible}
                buildingId={building._id}
            />
        </>
    )
}
export default ResourcesContent