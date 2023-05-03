import { Button, Col, Divider, Form, Input } from "antd"
import { useState } from "react"
import { AccountTitle, GreyParagraph } from "../../Components/CustomComponents"
import { useAppDispatch } from "../../hooks"
import { updatePassword } from "../../accountUtils"

const ChangePassword = ({ user }: any) => {
    const [old, setOld] = useState<string>("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useAppDispatch()

    return (
        <div>
            <Col>
                <AccountTitle>Change Password</AccountTitle>
                <GreyParagraph>Set a unique password to protect your account.</GreyParagraph>
            </Col>
            <Divider />

            <Col span={10}>
                <Col>
                    <p>Old Password</p>
                    <Form.Item style={{ marginTop: "10px" }} rules={[{ required: true, message: 'Please input your name!' }]} >
                        <Input.Password style={{ height: 50, borderRadius: 8 }} placeholder="Your current password" onChange={(val) => setOld(val.target.value)} />
                    </Form.Item>
                </Col>
                <Col>
                    <p>New Password</p>
                    <Form.Item rules={[{ required: true, message: 'Please input your surname!' }]}>
                        <Input.Password allowClear style={{ height: 50, borderRadius: 8 }} placeholder="Your new Password" onChange={(val) => setPassword(val.target.value)} />
                    </Form.Item>
                </Col>
                <Col>
                    <p>Confirm Password</p>
                    <Form.Item rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input.Password allowClear style={{ height: 50, borderRadius: 8 }} placeholder="Your new Password" onChange={(val) => setConfirmPassword(val.target.value)} />
                    </Form.Item>
                </Col>
                <Button
                    style={{ width: "100%", borderRadius: 8, height: 50 }}
                    type="primary"
                    onClick={() => { updatePassword(old, user.password, password, confirmPassword, user._id, dispatch) }
                    }>Update</Button>
            </Col>
        </div>
    )
}
export default ChangePassword