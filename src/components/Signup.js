import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const context = useContext(noteContext)
    const { createAccount } = context;

    const onSubmit = (e) => {
        e.preventDefault()
        createAccount(credentials)
    }

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="nameSign" className="form-label">Name</label>
                    <input type="text" className="form-control" id="nameSign" aria-describedby="nameHelp" name='name' value={credentials.name} required minLength={3} onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailSign" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailSign" aria-describedby="emailHelp" name='email' value={credentials.email} required onChange={handleOnChange} autoComplete="current-email" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordSign" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordSign" required minLength={5} name='password' value={credentials.password} onChange={handleOnChange} autoComplete="current-password" />
                </div>
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </div>
    )
}

export default Signup
