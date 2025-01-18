import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Alert() {

    const context = useContext(noteContext)
    const { alert } = context
    return (

        <div style={{ height: "50px" }}>
            {
                alert && <div className={`alert alert-success mb-0`} role="alert">
                    <strong> {alert.type} </strong>{alert.message}
                </div>
            }
        </div >

    )
}
