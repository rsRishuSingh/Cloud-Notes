import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

function Login() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const context = useContext(noteContext)
    const { loginToAccount } = context;

    const onSubmit = (e) => {
        e.preventDefault()
        loginToAccount(credentials)
    }
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailLog" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailLog" aria-describedby="emailHelp" value={credentials.email} onChange={handleOnChange} name="email" autoComplete="current-email" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordLog" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordLog" value={credentials.password} onChange={handleOnChange} name="password" autoComplete="current-password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
