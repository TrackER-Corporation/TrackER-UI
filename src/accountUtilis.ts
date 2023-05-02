import { message } from "antd";
import { DraggerProps } from "antd/es/upload";
import api from "./api";
import { updatePreference } from "./reducers/preference";
import { fetchOrganization } from "./reducers/organization";
import { AppDispatch } from "./store";
import { logout } from "./reducers/user";

export const draggerProps: DraggerProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange(info) {
        const { status } = info.file;

        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },

    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

export const confirm = async (user: any, organization: any, current: any, dispatch: AppDispatch, onClose: () => void) => {
    await api.preference.updatePreference(user._id, { avatar: current })?.then(data => dispatch(updatePreference(data)))
    await api.organization.update(organization._id, { icon: current })?.then(data => dispatch(fetchOrganization(data)))
    message.success("Avatar updated correctly")
    onClose()
}

export const confirmPreference = async (userPreference: any, current: any, user: any, dispatch: AppDispatch, onClose: () => void) => {
    if (userPreference.avatar === current) {
        message.warning("You cannot select the same Avatar")
        return
    }
    await api.preference.updatePreference(user._id, { avatar: current })?.then(data => dispatch(updatePreference(data)))
    message.success("Avatar updated correctly")
    onClose()
}

export const updatePref = async (value: boolean, user: any, dispatch: AppDispatch) => {
    await api.preference.updatePreference(user._id, { activityLog: value })?.then(data => {
        dispatch((updatePreference(data)))
        message.success("Update Activity Log Preference")
    }).catch(err => message.error("Error on Update Preference"))
}
export const deleteAccount = async (user: any, dispatch: AppDispatch, setShow: (arg: boolean) => void) => {
    await api.user.delete(user._id)
    setShow(true)
    setTimeout(() => {
        message.success('Account deleted');
        dispatch((logout()))
        // socket?.emit("disconnect")
        setShow(false)
    }, 5000);
}

export const setNotification = (data: any, user: any, dispatch: AppDispatch) => {
    api.preference.updatePreference(user._id, data)?.then(res => {
        dispatch(updatePreference(res))
        message.success("Update Notifications Preference")
    }).catch(() => message.error("Error on Update Preference"))
}

export const fetchActivity = async (user: any, setData: (arg: any) => void, setLoad: (arg: boolean) => void) => {
    const fetchData = await api.activity.fetchActivity(user._id)?.then(res => res)
    setData(fetchData)
    setTimeout(() => {
        setLoad(false)
    }, 300);
}