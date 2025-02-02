import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
export default function Navbar() {

    let location = useLocation();
    let navigate = useNavigate()
    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('auth-token');
        navigate('/login');
    }
    // useEffect(() => {
    //     console.log(location)
    // }, [location])


    return (
        <nav className="navbar navbar-expand-lg bg-warning sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">CloudNotes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* <Link className="nav-link active" aria-current="page" to="/">Home</Link> */}
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            {/* <Link className="nav-link active" to="/about">About</Link> */}
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort by
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/">Last modified</a></li>
                                <li><a className="dropdown-item" href="/">Latest</a></li>
                            </ul>
                        </li>
                    </ul>
                    {!localStorage.getItem('auth-token') ? <div>

                        <Link className="btn btn-outline-primary fw-bold rounded-pill mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-primary fw-bold rounded-pill mx-1" to="/Signup" role="button">SignUp</Link>
                    </div> :
                        <div>

                            <Link className="btn btn-outline-primary fw-bold rounded-pill mx-1" role="button" onClick={handleLogout} to="/login">Logout</Link>
                        </div>
                    }

                </div>
            </div>
        </nav>
    )
}
