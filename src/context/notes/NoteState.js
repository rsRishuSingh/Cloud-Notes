
import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {

    const s1 = {
        "name": "Rishu",
        "class": "A5"
    }
    const [state, setState] = useState(s1)
    const update = () => {
        setTimeout(
            setState({ class: "V8" })
            , 2000)
    }
    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;