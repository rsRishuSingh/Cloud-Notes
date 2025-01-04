import React from 'react'
import Addnote from './Home/Addnote'
import Notes from './Home/Notes'

export default function Home() {
  return (
    <div className='container'>
      <Addnote />
      <Notes />
    </div>
  )
}
