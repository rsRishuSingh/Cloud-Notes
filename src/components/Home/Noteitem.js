import React, { useContext } from 'react'
import noteContext from '../../context/notes/noteContext'

export default function Noteitem(props) {
    const context = useContext(noteContext)
    const { deleteNote } = context
    function formatToIndianDateTime(isoDate) {
        // Parse the ISO date string into a Date object
        const date = new Date(isoDate);

        // Convert to Indian Standard Time (IST)
        const options = { timeZone: 'Asia/Kolkata', hour12: false };
        const indianDate = date.toLocaleString('en-IN', options);

        // Extract date and time components
        const [day, month, year] = indianDate.split(",")[0].split("/");
        const time = indianDate.split(",")[1].trim();

        // Format the date and time
        const formattedDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
        const formattedDateTime = ` ${time} ${formattedDate}`;

        return formattedDateTime;
    }
    return (
        <div className="card bg-yellow-200 m-2" style={{ width: "18rem" }} >
            <div className="card-body">
                <div className="d-flex justify-content-between m-0">

                    <h5 className="card-title">{props.note.title}</h5>

                    <div className="d-flex justify-content-between w-25 ">
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                            props.showModal(props.note)
                        }} className='cursor-pointer' height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                            deleteNote(props.note._id)
                        }} className='cursor-pointer' height="20px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                    </div>
                </div>
                <p className="card-text">{props.note.description}</p>
                <p className="card-text">{props.note.tags}</p>
                <div className=" justify-content-end d-flex m-0">
                    <p className="card-text m-0">{formatToIndianDateTime(props.note.date)}</p>
                </div>
            </div>


        </div>
    )
}
