import { NavigateFunction } from "react-router-dom";
import api from "./api";
import { fetchBuildings } from "./reducers/buildings";
import { userPreference } from "./reducers/preference";
import { login } from "./reducers/user";
import { AppDispatch } from "./store";
import { message } from "antd";

export const signUpButton = (setError: (arg: Array<any>) => void, setSwapPanel: (arg: boolean) => void) => {
    setError([])
    setSwapPanel(true);
};
export const signInButton = (setError: (arg: Array<any>) => void, setSwapPanel: (arg: boolean) => void) => {
    setError([])
    setSwapPanel(false);
};

export const handleLoginSubmit = (email: string, password: string, setError: (arg: Array<any>) => void, navigate: NavigateFunction, dispatch: AppDispatch) => {
    if (!email || !password) {
        setError(["Fill the form to continue"])
        return
    }
    const data = { email, password }
    api.user
        .login(data)
        .then((data) => {
            localStorage.setItem("token", data.token)
            api.preference.fetchPreference(data._id).then(async (res) => {
                dispatch(userPreference(res))
                if (res.activityLog) await api.activity.updateActivity(data._id)
            })
            api.buildings.fetchBuildings(data._id).then((res) => {
                dispatch(fetchBuildings(res))
            })
            dispatch(login(data))
            navigate("/Dashboard")

        })
        .catch((err) => {
            message.error("Error! " + err.message)
        });
}

export const handleSignUpSubmit = async (
    event: any,
    name: string,
    surname: string,
    password: string,
    passwordConf: string,
    email: string,
    type: string,
    company: string,
    setError: (arg: Array<any>) => void,
    dispatch: AppDispatch
) => {
    if (!name || !surname || !password || !passwordConf || !email || event == null) {
        setError(["Fill the form to continue"])
        return
    }
    if (password !== passwordConf) {
        setError(["Typed Password are different"])
        return
    }
    const data = {
        type,
        email,
        password,
        name,
        surname,
    }
    await api.user
        .signUp(data)
        .then(async (data) => {
            if (type === "Vendor")
                await api.organization.create({ userId: data._id, name: company })
            await api.preference.createPreference(data._id).then((res) => {
                dispatch(userPreference(res))
                dispatch(login(data))
                localStorage.setItem("token", data.token)
            })
            api.activity.updateActivity(data._id)
        })
        .catch((err) => {
            return new Error(err?.response?.data?.errors?.email);
        });
    event.preventDefault();
}