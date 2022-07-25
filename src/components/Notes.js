import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {

    const context = useContext(NoteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
    }, [])


    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h1>Your Notes</h1>

                {notes.map((notes) => {
                    return <NoteItem key={notes._id} notes={notes} />
                })}
            </div>
        </>
    )
}

export default Notes