import React from 'react'

export default function Addnote() {
    return (
        <div className="mt-3" >
            <h2>Add Note</h2>
            <div className='mb-2'>
                <label htmlFor="exampleFormControlInput1" className="form-label">Enter Title</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Add title" />
            </div>
            <div >
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter description</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Add description"></textarea>
            </div>
        </div>
    )
}
