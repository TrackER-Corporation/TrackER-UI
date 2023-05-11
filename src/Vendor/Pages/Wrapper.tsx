import { PageHeader } from "@ant-design/pro-components";
import { Breadcrumb, Layout, Row } from "antd";
import { NavigateFunction } from "react-router-dom";

interface WrapperProps {
    title: string,
    children: JSX.Element,
    navigate: NavigateFunction,
}

const Wrapper = (
    { title, children, navigate }: WrapperProps
) =>
    <Layout
        className="site-layout-background"
        style={{
            paddingLeft: 24,
            paddingRight: 24,
        }}
    >
        <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
            <Breadcrumb
                items={[
                    {
                        title: 'Home',
                    },
                    {
                        title: <a>{window.location.pathname.split("/")[1]}</a>
                    }
                ]}
            />
        </Row>
        <PageHeader
            style={{ paddingLeft: 0 }}
            className="site-page-header"
            title={title}
            subTitle="Check your supplier earnings and productions"
            onBack={() => navigate("/Dashboard")}
        />
        {children}
    </Layout>

export default Wrapper