import React, { useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function About() {

    const context = useContext(noteContext)
    const { getUser, checkToken } = context
    // useEffect(() => {
    //     setTimeout(() => {
    //         a.update()
    //     }, 2000)
    //     // eslint-disable-next-line
    // }, [])
    const [data, setData] = useState({ "name": "", "email": "" })
    let navigate = useNavigate()

    useEffect(() => {
        if (!checkToken()) {
            navigate('/login');
            return;
        }
        const setDetails = async () => {
            let details = await getUser();
            setData({ "name": details.name, "email": details.email })

        }
        setDetails()
        // eslint-disable-next-line
    }, [])


    return (
        <div className='container d-flex flex-column align-items-center'>

            {/* <h1>About - {a.state.name} and he is in {a.state.class}</h1> */}
            <h1>About </h1>
            <h5>Name : {data.name}</h5>
            <h5>Email : {data.email}</h5>

        </div>
    )
}
