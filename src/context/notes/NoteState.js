import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "62da2fa26d03d1633e740447",
          "user": "62d8f75af69e0b714321196c",
          "title": "my test",
          "description": "It is my first requeset to test api",
          "tag": "test",
          "date": "2022-07-22T05:03:30.874Z",
          "__v": 0
        },
        {
          "_id": "62db834ac7320658d6f4da9f",
          "user": "62d8f75af69e0b714321196c",
          "title": "my test 2",
          "description": "It is my second requeset to test api",
          "tag": "test-2",
          "date": "2022-07-23T05:12:42.197Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;