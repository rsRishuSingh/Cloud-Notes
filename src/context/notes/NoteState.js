
import { useState } from 'react'
import NoteContext from './noteContext'
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
    let baseURL = 'http://localhost:5000';
    const [notes, setNotes] = useState([])
    const [alert, setAlert] = useState(null)
    let navigate = useNavigate()

    const loginToAccount = async ({ email, password }) => {

        try {
            let response = await fetch(`${baseURL}/api/auth/login`, {
                method: 'POST', // HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email": email, "password": password })
            })
            let data = await response.json();
            if (data.status) {
                localStorage.setItem('auth-token', data.authToken)
                showAlert('Success', "login sucessfull")
                navigate("/")
            }
            else {
                showAlert(data.errors.path, data.errors.msg)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const createAccount = async ({ name, email, password }) => {

        try {
            let response = await fetch(`${baseURL}/api/auth/createaccount`, {
                method: 'POST', // HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "name": name, "email": email, "password": password })
            })
            let data = await response.json();
            console.log(data)
            if (data.status) {
                localStorage.setItem('auth-token', data.authToken)
                showAlert('Success', "account created")
                navigate("/")
            }
            else {
                showAlert(data.errors.path, data.errors.msg)

            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const showAlert = (type, message) => {
        setAlert({ "message": message, "type": type })
        setTimeout(() => {
            setAlert(null)
        }, 1500)
    }

    const fetchNotes = async () => {
        try {
            let response = await fetch(`${baseURL}/api/notes/fetchnotes`, {
                method: 'GET', // HTTP method
                headers: {
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3N2FhZDcxMTc0OGZkMTc5ODk3YmU3In0sImlhdCI6MTczNTkwMDQ2OH0.D9LzgGd6d-yWZZYAmxmAwqTVOf7IBw49J7DKAVXmewk'
                }
            })
            let data = await response.json();
            if (data.status) {
                setNotes(data.notes)
            }
            else {
                showAlert(data.errors.path, data.errors.msg)
            }
        }
        catch (err) {
            console.log(err)
        }

    }


    const addNote = async (title, description, tags) => {
        try {
            let response = await fetch(`${baseURL}/api/notes/addnote`, {
                method: 'POST', // HTTP method
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3N2FhZDcxMTc0OGZkMTc5ODk3YmU3In0sImlhdCI6MTczNTkwMDQ2OH0.D9LzgGd6d-yWZZYAmxmAwqTVOf7IBw49J7DKAVXmewk'
                },
                body: JSON.stringify({ "title": title, "description": description, "tags": tags })
            })
            let data = await response.json()
            if (data.status) {
                setNotes(notes.concat(data.notes))
                showAlert("Success", "note added")
            }
            else {
                showAlert(data.errors.path, data.errors.msg)
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    const editNote = async (note) => {
        try {
            let response = await fetch(`${baseURL}/api/notes/updatenote/${note._id}`, {
                method: 'PUT', // HTTP method
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3N2FhZDcxMTc0OGZkMTc5ODk3YmU3In0sImlhdCI6MTczNTkwMDQ2OH0.D9LzgGd6d-yWZZYAmxmAwqTVOf7IBw49J7DKAVXmewk'
                },
                body: JSON.stringify({ "title": note.title, "description": note.description, "tags": note.tags })
            })
            let data = await response.json()
            console.log(data)
            if (data.status) {

                let newNotes = JSON.parse(JSON.stringify(notes))
                for (let index = 0; index < newNotes.length; index++) {
                    if (newNotes[index]._id === note._id) {
                        newNotes[index].title = note.title;
                        newNotes[index].description = note.description;
                        newNotes[index].tags = note.tags === "" ? "General" : note.tags;
                        break;
                    }

                }
                setNotes(newNotes)
                showAlert("Success", "note updated")

            }
            else {
                showAlert(data.errors.path, data.errors.msg)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const deleteNote = async (id) => {
        try {
            const newNote = notes.filter((note) => {
                return note._id !== id
            })
            let response = await fetch(`${baseURL}/api/notes/deletenote/${id}`, {
                method: 'DELETE', // HTTP method
                headers: {
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3N2FhZDcxMTc0OGZkMTc5ODk3YmU3In0sImlhdCI6MTczNTkwMDQ2OH0.D9LzgGd6d-yWZZYAmxmAwqTVOf7IBw49J7DKAVXmewk'
                }
            })
            let data = await response.json()
            if (data.status) {
                setNotes(newNote)
                showAlert("Success", "note deleted")

            }
            else {
                showAlert(data.errors.path, data.errors.msg)


            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (

        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNotes, loginToAccount, createAccount, showAlert, alert }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;