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
    console.log(json)
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

    const note = {
      "_id": "62db834ac7320658d6f448d535353a9f2",
      "user": "62d8f75af69e0b714321196c",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-07-23T05:12:42.197Z",
      "__v": 0
    };


    setNotes(notes.concat(note))
  }

  // Delete a note

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note

  const editNote = async (id, title, description, tag) => {
    // API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkOGY3NWFmNjllMGI3MTQzMjExOTZjIn0sImlhdCI6MTY1ODM4NjI4M30.ZP7PIsnB-Ed-61nlVR-b-6Ijk8I4juA0iY3Xk5ieRB4"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;



