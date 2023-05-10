import React, { useContext, useEffect, useRef, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/Notecontext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

export const Notes = (props) => {

  const context = useContext(noteContext)
  const { notes, fetchnotes, editnote } = context
  const navigate = useNavigate()

  const [note, setNote] = useState({ id: "", etitle: "", ediscription: "", etag: "" })

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchnotes()
    }else{
      navigate('/login')
    }
    
  }, [])

  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({ id: currentnote._id, etitle: currentnote.title, ediscription: currentnote.discription, etag: currentnote.tag })
    
  }

  const ref = useRef(null)
  const refClose = useRef(null)

  const handleClick = () => {
    refClose.current.click();
    editnote(note.id, note.etitle, note.ediscription, note.etag)
    props.showAlert("Updated successfully", "success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="discription" className="form-label">Discription</label>
                  <input type="text" className="form-control" id="ediscription" name='ediscription' value={note.ediscription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.ediscription.length < 5} type="button" className="btn btn-primary" onClick={handleClick} >Update note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h1> your notes</h1>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (<Noteitem key={note._id} note={note} updatenote={updatenote} showAlert={props.showAlert} />)
        })}
      </div>
    </>
  )
}
