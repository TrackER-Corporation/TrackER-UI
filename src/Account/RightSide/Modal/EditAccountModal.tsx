import { Button, Col, Form, Input, Modal } from "antd"
import { useState } from "react"
import { EditAccountModalProps } from "../../../types"
import { useAppDispatch } from "../../../hooks"
import { updateUserData } from "../../../accountUtils"

const EditAccountModal = ({ visible, setVisible, user }: EditAccountModalProps) => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>(user.name)
    const [surname, setSurname] = useState<string>(user.surname)
    const [email, setEmail] = useState<string>(user.email)

    return (
        <Modal
            open={visible} style={{ borderRadius: 210 }}
            onCancel={() => setVisible(false)}
            footer={[
                <Button key="back" onClick={() => setVisible(false)}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={() =>
                    updateUserData(user, name, surname, email, dispatch, setVisible)
                }>Update</Button>
            ]}
            title="Edit your personal data">
            <Col>
                <p>Name</p>
                <Form.Item
                    style={{ marginTop: "10px" }}
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input style={{ height: 50, borderRadius: 8 }}
                        placeholder="Name"
                        defaultValue={user.name}
                        onChange={(val) => setName(val.target.value)}
                    />
                </Form.Item>
            </Col>
            <Col>
                <p>Surname</p>
                <Form.Item rules={[{ required: true, message: 'Please input your surname!' }]}>
                    <Input allowClear style={{ height: 50, borderRadius: 8 }}
                        placeholder="Surname"
                        defaultValue={user.surname}
                        onChange={(val) => setSurname(val.target.value)}
                    />
                </Form.Item>
            </Col>
            <Col>
                <p>Email</p>
                <Form.Item rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input
                        allowClear
                        style={{ height: 50, borderRadius: 8 }}
                        placeholder="Email"
                        defaultValue={user.email} onChange={(val) => setEmail(val.target.value)}
                    />
                </Form.Item>
            </Col>
        </Modal>)
}
export default EditAccountModal