import { Spin } from "antd"
import { LoadingSpinnerProps } from "../types"

const LoadingSpinner = ({ message, size = "large" }: LoadingSpinnerProps) =>

    <div style={{
        margin: "20px 0", marginBottom: "20px",
        padding: "30px 50px",
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.6)",
        borderRadius: "4px",
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        zIndex: 120,
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "middle",
    }}>
        <Spin size={size} style={{ position: "absolute", top: "50%" }} tip={message} />
    </div>

export default LoadingSpinner