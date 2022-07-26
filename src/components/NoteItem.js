import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {

    const { notes, updateNote } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{notes.title}</h5>
                        <i className="fa-solid fa-trash-can  mx-2" onClick={() => { deleteNote(notes._id) }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(notes) }}></i>
                    </div>
                    <p className="card-text">{notes.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem