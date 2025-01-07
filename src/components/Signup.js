import React from 'react'

function Signup() {
    return (
        <div className='container'>
            <form>
                <div className="mb-3">
                    <label htmlFor="emailSign" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailSign" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordSign" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordSign" />
                </div>
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </div>
    )
}

export default Signup
