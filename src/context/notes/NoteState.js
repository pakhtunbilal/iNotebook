import NoteContext from "./noteContext";

const NoteState =(props)=>{
    const state ={
        "name":"bilal",
        "class":"7A"
    }
    return(
    <NoteContext.Provider value={state}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;