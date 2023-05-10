import { Breadcrumb, Layout, Row } from "antd"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { PageHeader } from "@ant-design/pro-components"
import EditCard from "./EditCard"

const EditPlan = () => {
    const organization = useAppSelector(state => state.organization.organization)
    if (organization.details === undefined) {
        return <></>
    }
    const { gas, water, electric } = organization.details
    let navigate = useNavigate()
    return (
        <Layout
            style={{
                paddingRight: 24,
                paddingLeft: 24,
                minHeight: 280,
                marginTop: "32px"
            }}
        >
            <Row gutter={[16, 16]} >

                <Breadcrumb
                    items={[
                        {
                            title: 'Home',
                        },
                        {
                            title: <a>Pages</a>
                        },
                        {
                            title: <a>Edit Organization Plan</a>
                        }
                    ]}
                />
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Organization Plans"
                subTitle="Check and Edit your plans (changes will be available after a month to notify customers)"
                onBack={() => navigate("/Dashboard")}
            />
            <EditCard data={gas} type="g" />
            <EditCard data={electric} type="e" />
            <EditCard data={water} type="w" />
        </Layout>
    )
}
export default EditPlan