import { message } from "antd";
import { DraggerProps } from "antd/es/upload";
import api from "./api";
import { updatePreference } from "./reducers/preference";
import { fetchOrganization } from "./reducers/organization";
import { AppDispatch } from "./store";
import { logout, updateUser } from "./reducers/user";
import bcrypt from "bcryptjs"
import { getItem } from "./globalUtils";
import { GetItem } from "./types";


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
    }).catch(() => message.error("Error on Update Preference"))
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

export const updateUserData = async (user: any, name: string, surname: string, email: string, dispatch: AppDispatch, setVisible: (arg: boolean) => void) =>
    await api.user.update(user._id, { name, surname, email })
        .then(res => {
            dispatch(updateUser(res.data))
            setVisible(false)
        }).catch(() => message.error("Error on Update Data"))


export const activityColumns: any = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 50,
    },
    {
        title: 'Country',
        dataIndex: 'country_name',
    },
    {
        title: 'City',
        dataIndex: 'city',
    },
    {
        title: 'Ip',
        dataIndex: 'IPv4',
        initialValue: 'all',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        render: (date: string) => new Date(date).toLocaleString()
    },
];

const callUpdatePassword = (id: string, password: string, dispatch: AppDispatch) => {
    api.user.updatePassword(id, { password })
        .then(res => dispatch(updateUser(res.data)))
}

export const updatePassword = (old: string, userPassword: string, password: string, confirmPassword: string, id: string, dispatch: AppDispatch) => {
    bcrypt.compare(old, userPassword).then(res => {
        if (res)
            if (password === confirmPassword && password.length > 5)
                callUpdatePassword(id, password, dispatch)
            else
                message.error("Your password must be 6 characters at least")
        else
            message.error("This is not your old password")
    })
}

export const accountItems: Array<GetItem> = [
    getItem('Personal Information', '/Profile/Edit', <span className="iconfont anticon " >& #x100e5; </span>,),
    getItem('Notification', '/Profile/Notification', <span className="iconfont anticon" >& #x100d9; </span>),
    getItem('Activity Monitor', '/Profile/Activity', <span className="iconfont anticon" >& #x100e1; </span>),
    getItem('Security Settings', '/Profile/Security', <span className="iconfont anticon" >& #x100df; </span>),
    getItem('Change Password', '/Profile/Password', <span className="iconfont anticon" >& #xe6a9; </span>),
];