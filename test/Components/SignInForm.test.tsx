import SignIn from "../../src/Components/SignInForm"
import React from 'react';
import { expect, describe, it } from 'vitest'
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
        const { getByTestId, getByText, queryAllByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <Provider store={store}>
                        <SignIn />
                    </Provider>
                </ConfigProvider>
            </BrowserRouter>
        );
        const buttonSI = getByTestId("signIn")
        fireEvent.click(buttonSI)
        expect(getByText("Building Owner")).toBeInTheDocument()
        const buttonSU = getByTestId("signUp")
        fireEvent.click(buttonSU)
        expect(getByText("Building Owner")).toBeInTheDocument()
        const buttonSubLog = queryAllByText("Sign In")
        buttonSubLog.map(el => {fireEvent.click(el)})
        expect(getByText("Building Owner")).toBeInTheDocument()
        const buttonSubSig = queryAllByText("Sign Up")
        buttonSubSig.map(el => {fireEvent.click(el)})
        expect(getByText("Building Owner")).toBeInTheDocument()
    });

});