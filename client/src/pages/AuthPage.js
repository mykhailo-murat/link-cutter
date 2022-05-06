import React, {useEffect, useState, useContext} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../contex/AuthContext";


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            auth.login(data.token, data.userId)
        } catch (e) {
            console.log('WTF', e.message)
        }
    }

    const loginHandler = async () => {

        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
            console.log('WTF', e.message)
        }

    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>LINK-CUTTER</h1>

                <div className="card blue">
                    <div className="card-content black-text">
                        <h4 className="heading">Authentication</h4>

                        <div className="input-field">
                            <input
                                placeholder="Email"
                                id="email"
                                type="email"
                                className="validate"
                                name="email"
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="input-field">
                            <input
                                placeholder="Password"
                                id="password"
                                type="password"
                                className="validate"
                                name="password"
                                onChange={changeHandler}
                            />

                        </div>

                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-2" disabled={loading} onClick={loginHandler}> Login</button>
                        <button className="btn grey lighten-1" disabled={loading} onClick={registerHandler}> Create
                            Account
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}