import SignIn from "../../src/Components/SignInForm"
import React from 'react';
import { expect, describe, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "../../src/store";

describe('SignIn', () => {

    it('renders the correct text', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <SignIn />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>
        );
        expect(getByText("Create Account")).toBeInTheDocument()
    });

    it('button sign up click', () => {
        const { getByTestId, getByText, queryAllByText, getAllByPlaceholderText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <SignIn />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>
        );
        expect(getByText("Building Owner")).toBeInTheDocument()
        const buttonSU = getByTestId("signUp")
        const buttonSubLog = queryAllByText("Sign In")
        const buttonSubSig = queryAllByText("Sign Up")
        const buttonSI = getByTestId("signIn")
        const signUp = getByTestId("signUp")
        fireEvent.click(buttonSI)
        fireEvent.click(buttonSU)
        fireEvent.click(signUp)
        buttonSubLog.map(el => fireEvent.click(el))
        buttonSubSig.map(el => fireEvent.click(el))
        const findData = ["Name", "Surname", "Password", "Confirm Password", "Email"]
        findData.map((el: string) =>
            getAllByPlaceholderText(el).map(element =>
                fireEvent.change(element, { target: { value: 'Good Day' } })
            )
        )
    });

});
