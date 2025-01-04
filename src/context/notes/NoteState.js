
import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {

    // const s1 = {
    //     "name": "Rishu",
    //     "class": "A5"
    // }
    // const [state, setState] = useState(s1)
    // const update = () => {
    //     setTimeout(
    //         setState({ class: "V8" })
    //         , 2000)
    // }
    // return (
    //     <NoteContext.Provider value={{ state, update }}>
    //         {props.children}
    //     </NoteContext.Provider>
    // )

    // const s1 = {
    //     "name": "Rishu",
    //     "class": "A5"
    // }
    // const [state, setState] = useState(s1)
    // const update = () => {
    //     setTimeout(
    //         setState({ class: "V8" })
    //         , 2000)
    // }

    let notesArr = [
        {
            "_id": "6777cd7fccd4babd4f9dcbe0",
            "user": "6777aad711748fd179897be7",
            "title": "My note",
            "description": "My description",
            "tags": "new Year",
            "date": "2025-01-03T11:43:59.611Z",
            "__v": 0
        },
        {
            "_id": "677976891d63ceff41c38eb4",
            "user": "6777aad711748fd179897be7",
            "title": "My note",
            "description": "My description",
            "tags": "General",
            "date": "2025-01-04T17:57:29.603Z",
            "__v": 0
        },
        {
            "_id": "6779768d1d63ceff41c38eb6",
            "user": "6777aad711748fd179897be7",
            "title": "My note",
            "description": "My description",
            "tags": "General",
            "date": "2025-01-04T17:57:33.778Z",
            "__v": 0
        },
        {
            "_id": "6779768f1d63ceff41c38eb8",
            "user": "6777aad711748fd179897be7",
            "title": "My note",
            "description": "My description",
            "tags": "General",
            "date": "2025-01-04T17:57:35.241Z",
            "__v": 0
        },
        {
            "_id": "677976901d63ceff41c38eba",
            "user": "6777aad711748fd179897be7",
            "title": "My note",
            "description": "My description",
            "tags": "General",
            "date": "2025-01-04T17:57:36.457Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesArr)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;