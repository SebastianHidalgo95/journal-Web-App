import Swal from 'sweetalert2'
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        const newNote = {
            title:'',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection( `${uid}/journal/notes`).add(newNote);

        dispatch( activeNote ( doc.id, newNote ));
        dispatch( addNewNote( doc.id, newNote ));
    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = ( id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ))
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        const noteToFirestore = {...note};
        
        if(!note.url){
            delete noteToFirestore.url;  
        }
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore )
        
        dispatch( RefreshNote( note.id, note ))
        Swal.fire('Saved', note.title, 'success');
    }
}

export const RefreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id, note
    }
})

export const starUploadingFile = ( file ) => {
    return async ( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'uploading...',
            text: 'please wait',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload( file );

        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ));
        
        Swal.close();
    }
} 

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {
        
        const uid = getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch( deleteNote(id) );

        Swal.fire('Deleted', 'Note', 'success');
    }
}

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload:id
})


