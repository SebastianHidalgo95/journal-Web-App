import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleting, startSaveNote, starUploadingFile } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch();

    const { active } = useSelector(state => state.notes);

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch(  starUploadingFile(file) ) 
        }

    }
    const handleSave = () => {
        
        dispatch( startSaveNote( active ) )
    }

    const handleDelete = () => {
        dispatch( startDeleting( active.id ) );
    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2021</span>
            <input 
                id="fileSelector"
                type="file" 
                style={{display:'none'}}
                onChange={ handleFileChange }
                name="file"
            />
            <div>
                <button className="btn"
                    onClick={ handlePictureUpload }
                >
                    Picture
                </button>

                <button className="btn "
                    onClick={ handleSave }
                >
                    Save
                </button>

                <button className="btn btn-danger"
                    onClick={ handleDelete }  
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
