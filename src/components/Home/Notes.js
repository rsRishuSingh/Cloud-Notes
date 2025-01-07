import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem'
import noteContext from '../../context/notes/noteContext'
import Modal from '../Modal'

export default function Notes() {
  useEffect(() => {
    fetchNotes()
    console.log("called")
    // eslint-disable-next-line
  }, [])
  const context = useContext(noteContext)
  const { notes, fetchNotes, editNote } = context

  const ref = useRef(null)
  const [note, setNote] = useState({
    "_id": "",
    "user": "",
    "title": "",
    "description": "",
    "tags": "",
    "date": "",
    "__v": 0
  })

  const showModal = (currNote) => {
    setNote(currNote)
    ref.current.click();
  }

  const handleChangeModal = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleClose = () => {

  }
  const handleSave = () => {
    editNote(note)
  }
  return (
    <div className='mt-3'>
      <Modal ref={ref} note={note} handleChangeModal={handleChangeModal} handleClose={handleClose} handleSave={handleSave} />
      <h3>Notes</h3>
      <div className="d-flex justify-content-center flex-wrap">
        {
          notes.length === 0 ? <p><small>No Notes to display</small></p> : notes.map((note) => {
            return (
              <Noteitem key={note._id} note={note} showModal={showModal} />
            )
          })
        }
      </div>
    </div>
  )
}
