import "./login.css";
import { useState } from "react";
import classnames from "classnames";
import { Alert, Divider, Form, Input, Row, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { handleLoginSubmit, handleSignUpSubmit, signInButton, signUpButton } from "../componentsFunctions";

const SignInForm = () => {
    const navigate = useNavigate()
    const [swapPanel, setSwapPanel] = useState(false);
    const [name, setName] = useState<string>("")
    const [company, setCompany] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConf, setPasswordConf] = useState<string>("")
    const [error, setError] = useState<Array<string>>()
    const [type, setType] = useState("Building")
    const dispatch = useAppDispatch()

    return (
        <div className="signIn">
            <div
                className={classnames("container", { "right-panel-active": swapPanel })}
                id="container"
            >
                <div className="form-container sign-up-container">
                    <Form action="#">
                        <h1>Create Account</h1>
                        <Tabs className="..."
                            defaultActiveKey="Building"
                            type="card"
                            style={{ padding: 20 }}
                            animated
                            centered
                            tabBarGutter={20}
                            onChange={(name: string) => { setType(name); setError([]) }}
                            items={[{
                                key: 'Building',
                                label: `Building Owner`,
                                children: <>
                                    {error && error?.length > 0 &&
                                        error.map(el => (
                                            <Form.Item>
                                                <Alert closable message={el} type="error" onClose={() => setError([])} />
                                            </Form.Item>
                                        ))
                                    }
                                    <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                                        <Input size="large" type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item name="surname" rules={[{ required: true, message: 'Please input your surname!' }]}>
                                        <Input size="large" type="text" placeholder="Surname" onChange={e => setSurname(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                        <Input size="large" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                        <Input.Password size="large" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item name="passwordConf" rules={[{ required: true, message: 'Confirm your password!' }]}>
                                        <Input.Password size="large" placeholder="Confirm Password" onChange={e => setPasswordConf(e.target.value)} />
                                    </Form.Item>
                                </>,
                            }, {
                                key: 'Vendor',
                                label: `Vendor Profile`,
                                children: <>
                                    {error && error?.length > 0 &&
                                        error.map(el => (
                                            <Form.Item>
                                                <Alert closable message={el} type="error" onClose={() => setError([])} />
                                            </Form.Item>
                                        ))
                                    }
                                    <Form.Item name="company" rules={[{ required: true, message: 'Please input your Company name!' }]}>
                                        <Input size="large" placeholder="Company Name" onChange={e => setCompany(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item name="name" rules={[{ required: true, message: 'Please input Owner name!' }]}>
                                        <Input size="large" placeholder="Owner Name" onChange={e => setName(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item name="surname" rules={[{ required: true, message: 'Please input Owner surname!' }]}>
                                        <Input size="large" placeholder="Owner Surname" onChange={e => setSurname(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                        <Input size="large" placeholder="Company Email" onChange={e => setEmail(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                        <Input.Password size="large" placeholder="Type Password" onChange={e => setPassword(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item name="passwordConf" rules={[{ required: true, message: 'Confirm your password!' }]}>
                                        <Input.Password size="large" placeholder="Confirm Password" onChange={e => setPasswordConf(e.target.value)} />
                                    </Form.Item></>,
                            },
                            ]}
                        >
                        </Tabs>
                        <button onClick={(e) =>
                            handleSignUpSubmit(
                                e,
                                name,
                                surname,
                                password,
                                passwordConf,
                                email,
                                type,
                                company,
                                setError,
                                dispatch
                            )}>Sign Up</button>
                    </Form>
                </div>
                <div className="form-container sign-in-container">
                    <Form action="#">
                        {error != null &&
                            error.map(el => (
                                <Form.Item>
                                    <Alert closable message={el} type="error" onClose={() => setError([])} />
                                </Form.Item>
                            ))
                        }
                        <h1>Sign in</h1>
                        <Form.Item style={{ width: "70%", marginTop: 22 }} name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input size="large" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item style={{ width: "70%" }} name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password size="large" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>
                        <Row justify="end" style={{ marginTop: 10, width: "70%" }}>
                            <Link className="basic-form-forgot" to="">Forgot Password?</Link>
                        </Row>
                        <button style={{ marginTop: 10 }} onClick={() => handleLoginSubmit(email, password, setError, navigate, dispatch)}>Sign In</button>
                    </Form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1 style={{ color: "white" }}>Welcome Back!</h1>
                            <p>
                                To check your data and keep connected with us please login with your personal information
                            </p>
                            <Divider type="horizontal" >Or</Divider>
                            <button
                                type="button"
                                onClick={() => signUpButton(setError, setSwapPanel)}
                                className="ghost"
                                id="signIn"
                                data-testid="signIn"
                            >
                                Sign Up
                            </button>
                        </div>
                        <div className="overlay-panel overlay-left">
                            <h1 style={{ color: "white" }}>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <Divider type="horizontal" >Or</Divider>
                            <button
                                type="button"
                                onClick={() => signInButton(setError, setSwapPanel)}
                                className="ghost"
                                id="signUp"
                                data-testid="signUp"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
