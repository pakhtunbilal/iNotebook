import Notecontext from './Notecontext'
import { useState } from 'react'

const NoteState = (props) => {

  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

  const fetchnotes = async () => {
    const response = await fetch("https://inotebook-ucvf.onrender.com/notes/fetchallnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json =await response.json()
    setNotes(json)
  }

  // add a note
  const addnote = async(title, discription, tag) => {

    const response = await fetch("https://inotebook-ucvf.onrender.com/notes/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')      },
      body : JSON.stringify({title,discription,tag})
    });
    let json = await response.json();
    

    let note = json

    setNotes(notes.concat(note))

  }

  // delete a note
  const deletenote = async (id) => {

    const response = await fetch("https://inotebook-ucvf.onrender.com/notes/deletenote/"+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')      }
    });
    

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // edit a note
  const editnote = async (id, title, discription, tag) => {
    //API call
    const response = await fetch("https://inotebook-ucvf.onrender.com/notes/updatenote/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')      },
      body : JSON.stringify({title,discription,tag})
    });

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].discription = discription;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <Notecontext.Provider value={{ notes, addnote, deletenote, editnote, fetchnotes }}>
      {props.children}
    </Notecontext.Provider>
  )
}

export default NoteState;
