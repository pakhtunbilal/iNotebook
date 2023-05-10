import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/Notecontext';


const AddNote = (props) => {
  const context = useContext(noteContext)
  const { addnote } = context

  const [note, setNote] = useState({ title: "", discription: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addnote(note.title, note.discription, note.tag)
    props.showAlert("Added note succesfully", "success")
    setNote({ title: "", discription: "", tag: "" })
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="container my-3">
        <h1>Add your note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="discription" className="form-label">Discription</label>
            <input type="text" className="form-control" value={note.discription} id="discription" name='discription' onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" value={note.tag} id="tag" name='tag' onChange={onChange} />
          </div>
          <button disabled={note.title.length < 5 || note.discription.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote