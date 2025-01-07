
import { useState } from 'react'
import NoteContext from './noteContext'
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
    let baseURL = 'http://localhost:5000';
    const [notes, setNotes] = useState([])
    let navigate = useNavigate()
    const loginToAccount = async ({ email, password }) => {
        console.log(email, password)
        let response = await fetch(`${baseURL}/api/auth/login`, {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": email, "password": password })
        })
        let data = await response.json();
        console.log(data)
        if (data.status) {
            localStorage.setItem('auth-token', data.authToken)
            navigate("/")
        }
        else {
            alert("invalid credential")
            //to do
        }
    }

    const fetchNotes = async () => {
        let response = await fetch(`${baseURL}/api/notes/fetchnotes`, {
            method: 'GET', // HTTP method
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3N2FhZDcxMTc0OGZkMTc5ODk3YmU3In0sImlhdCI6MTczNTkwMDQ2OH0.D9LzgGd6d-yWZZYAmxmAwqTVOf7IBw49J7DKAVXmewk'
            }
        })
        let data = await response.json();
        setNotes(data)

    }


    const addNote = async (title, description, tags) => {
        let response = await fetch(`${baseURL}/api/notes/addnote`, {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3N2FhZDcxMTc0OGZkMTc5ODk3YmU3In0sImlhdCI6MTczNTkwMDQ2OH0.D9LzgGd6d-yWZZYAmxmAwqTVOf7IBw49J7DKAVXmewk'
            },
            body: JSON.stringify({ "title": title, "description": description, "tags": tags })
        })
        let data = await response.json()
        setNotes(notes.concat(data))

    }
    const editNote = async (note) => {
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
    }
    const deleteNote = async (id) => {
        const newNote = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNote)
        let response = await fetch(`${baseURL}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // HTTP method
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3N2FhZDcxMTc0OGZkMTc5ODk3YmU3In0sImlhdCI6MTczNTkwMDQ2OH0.D9LzgGd6d-yWZZYAmxmAwqTVOf7IBw49J7DKAVXmewk'
            }
        })
        let data = await response.json()
        console.log(data)
    }
    return (

        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNotes, loginToAccount }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;