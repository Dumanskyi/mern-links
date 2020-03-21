import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect( () => {
        window.M.updateTextFields()
    }, [])

    const onChangeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            console.log('Data', data)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            console.log('Data', data)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Cut link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Authorization</span>
                    <div>

                        <div className="input-field">
                            <input 
                                placeholder="type email" 
                                id="email" 
                                type="text"
                                name="email"
                                className="yellow-input"
                                onChange={onChangeHandler}
                                value={form.email} 
                            ></input>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input 
                                placeholder="type password" 
                                id="password" 
                                type="password"
                                name="password"
                                className="yellow-input"
                                onChange={onChangeHandler} 
                                value={form.password} 
                            ></input>
                            <label htmlFor="password">Password</label>
                        </div>

                    </div>
                    <div className="card-action">
                        <button 
                            className="btn grey lighten-1 black-text" 
                            style={{marginRight: 10}}
                            onClick={registerHandler}
                            disabled={loading}   
                        >
                            Registration
                        </button>
                        <button 
                            className="btn yellow darken-4"
                            onClick={loginHandler}
                            disabled={loading} 
                        >
                            Login
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}