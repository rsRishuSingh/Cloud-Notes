import React from 'react'

export default function Modal(props) {

    const { note, handleClose, handleSave, handleChangeModal, ref } = props;
    return (
        <div>

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label htmlFor="etitle" className="form-label">Enter Title</label>
                                <input type="text" className="form-control" id="etitle" name="title" placeholder="Add title" onChange={handleChangeModal} value={note.title} />
                            </div>
                            <div >
                                <label htmlFor="edescription" className="form-label">Enter description</label>
                                <textarea className="form-control" id="edescription" name="description" rows="3" placeholder="Add description" onChange={handleChangeModal} value={note.description}></textarea>
                            </div>
                            <div className='mt-1'>
                                <label htmlFor="etags" className="form-label">Add tags</label>
                                <input type="text" className="form-control" id="etags" name="tags" placeholder="Add tags" onChange={handleChangeModal} value={note.tags} />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose} >Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSave} data-bs-dismiss="modal" >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
