import React,{useContext} from 'react';
import noteContext from '../context/notes/Notecontext';

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const {deletenote} = context;
    const { note, updatenote } = props;

    return (
        <>
        <div className="col">
            <div className="card my-3" style={{width :"18rem"}}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updatenote(note)}} ></i>
                        <i className="fa-solid fa-trash" onClick={()=>{deletenote(note._id); props.showAlert("Deleted successfully","success") }}></i>
                    </div>
                    <p className="card-text">{note.discription}</p>
                    <p className="card-text">{note.tag}</p>
                    
                </div>
            </div>
            </div>
        </>
    )
}

export default Noteitem
