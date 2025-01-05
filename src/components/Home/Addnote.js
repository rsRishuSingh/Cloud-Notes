import React, { useContext, useState } from 'react'
import noteContext from '../../context/notes/noteContext'

export default function Addnote() {

    const { addNote } = useContext(noteContext)
    const [note, setNote] = useState({ title: "", description: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const saveNote = () => {
        // console.log(note)
        addNote(note.title, note.description)
    }
    const discardNote = (e) => {
        setNote({ title: "", description: "" }); // Clear the fields
    }
    return (
        <div className="mt-3" >
            <h2>Add Note</h2>
            <div className='mb-2'>
                <label htmlFor="title" className="form-label">Enter Title</label>
                <input type="text" className="form-control" onChange={onChange} id="title" name="title" placeholder="Add title" value={note.title} />
            </div>
            <div >
                <label htmlFor="description" className="form-label">Enter description</label>
                <textarea className="form-control" onChange={onChange} id="description" name="description" rows="3" placeholder="Add description" value={note.description}></textarea>
            </div>
            <div className='d-flex justify-content-end mt-2'>
                <button type="button" className="btn btn-warning mx-md-3 mx-sm-2  mx-1" onClick={discardNote}>Discard</button>
                <button type="button" className="btn btn-warning mx-md-3 mx-sm-2  mx-1" onClick={saveNote}>Save</button>
            </div>
        </div>
    )
}
