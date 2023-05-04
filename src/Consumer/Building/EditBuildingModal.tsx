import { Form, Input, Modal } from "antd";
import BuildingOptions from "./BuildingOptions";

interface EditBuildingModal {
    setName: (arg: string) => void,
    setContact: (arg: string) => void,
    setType: (arg: string) => void,
    buildingId: string,
    name: string,
    contact: string,
    address: string,
    type: string,
    visible: boolean,
    setVisible: (arg: boolean) => void,
    updateBuilding: (arg: string) => void
}

const EditBuildingModal = ({ setName, setContact, setType, buildingId, name, contact, address, type, visible, setVisible, updateBuilding }: EditBuildingModal) =>
    <Modal destroyOnClose title="Edit Building" open={visible}
        onOk={() => { setVisible(false); updateBuilding(buildingId) }}
        onCancel={() => setVisible(false)} >
        <p>Building Name</p>
        <Input onChange={(val) => setName(val.target.value)} placeholder={name} />
        <p style={{ marginTop: "22px" }}>Contact Name</p>
        <Input onChange={(val) => setContact(val.target.value)} placeholder={contact} />
        <p style={{ marginTop: "22px" }}>Address</p>
        <Input disabled value={address} />
        <p style={{ marginTop: "22px" }}>Building Type</p>
        <Form.Item name="Building type"  >
            <BuildingOptions setType={setType} placeholder={type} />
        </Form.Item>
    </Modal>


export default EditBuildingModal;