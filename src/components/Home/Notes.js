import React, { useContext } from 'react'
import Noteitem from './Noteitem'
import noteContext from '../../context/notes/noteContext'

export default function Notes() {
  const context = useContext(noteContext)
  const { notes } = context
  return (
    <div className='mt-3'>
      <h3>Notes</h3>
      <div className="d-flex justify-content-center flex-wrap">
        {
          notes.map((note) => {
            return (
              <Noteitem key={note._id} title={note.title} description={note.description} _id={note._id} />
            )
          })
        }
      </div>
    </div>
  )
}
