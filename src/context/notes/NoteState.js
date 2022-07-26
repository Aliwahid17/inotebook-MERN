import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // Get a note

  const getNotes = async () => {

    // API Call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkOGY3NWFmNjllMGI3MTQzMjExOTZjIn0sImlhdCI6MTY1ODM4NjI4M30.ZP7PIsnB-Ed-61nlVR-b-6Ijk8I4juA0iY3Xk5ieRB4"
      }
    });
    const json = await response.json();
    setNotes(json)
  }


  // Add a note

  const addNote = async (title, description, tag) => {

    // API Call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkOGY3NWFmNjllMGI3MTQzMjExOTZjIn0sImlhdCI6MTY1ODM4NjI4M30.ZP7PIsnB-Ed-61nlVR-b-6Ijk8I4juA0iY3Xk5ieRB4"
      },
      body: JSON.stringify({ title, description, tag })
    });

    
    
    // Logic to edit in client
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a note

  const deleteNote = async (id) => {

    // API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkOGY3NWFmNjllMGI3MTQzMjExOTZjIn0sImlhdCI6MTY1ODM4NjI4M30.ZP7PIsnB-Ed-61nlVR-b-6Ijk8I4juA0iY3Xk5ieRB4"
      },
    });
    const json = response.json();

    // Logic to edit in client

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note

  const editNote = async (id, title, description, tag) => {
    // API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkOGY3NWFmNjllMGI3MTQzMjExOTZjIn0sImlhdCI6MTY1ODM4NjI4M30.ZP7PIsnB-Ed-61nlVR-b-6Ijk8I4juA0iY3Xk5ieRB4"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;



