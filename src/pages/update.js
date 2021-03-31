import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { getLocalItem, removeSessionItem, setLocalItem, setSessionItem } from '../services/storage';
import { Box, Button, Container, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';

/**
 * -- Update component --
 * <TextField> from Material UI is used for creating Form design.
 * User can enter Title and Content, then click 'Update' button to save the change.
 */
export function Update({ notes, setNotes }) {
    useEffect(() => {
        setNotes(getLocalItem('notes', []));
    },[]);

    //useParams returns id from URL parameter.
    let { id } = useParams();
    //find index of the id of the note object from notes array.
    let i = notes.findIndex(note => note.id === id);
    let history = useHistory();

    const [ title, setTitle ] = useState(notes[i].title);
    const [ content, setContent ] = useState(notes[i].content);

    const onTitleChange = (e) => {
        //set the title state and save it to Session Storage
        let value = e.target.value;
        setTitle(value);
        setSessionItem('title', value);
    }

    const onContentChange = (e) => {
        //set the content state and save it to Session Storage
        let value = e.target.value;
        setContent(value);
        setSessionItem('content', value);
    }

    const onUpdateClick = () => {
        let newArr = [...notes];
        newArr[i] = {id: id, title: title, content: content};
        //save the notes array with the changed value.
        setNotes(newArr);
        //save the notes array to the Local Storage.
        setLocalItem('notes', newArr);
        //remove Title and Content state from Session Storage
        removeSessionItem('title');
        removeSessionItem('content');
        //Display alert message to show the note is updated
        toast.success('Your note is updated successfully!', {
            position: 'top-center',
            autoClose: 3000
        });
        //navigate back to Home page.
        history.push('/');
    }

    return (
        <Container maxWidth='lg' className='page-container'>
            <TextField 
                label='Title'
                value={title}
                onChange={onTitleChange}
                fullWidth
                margin='dense'
                style={{
                    backgroundColor: 'white'
                }}
            />
            <TextField 
                label='Content'
                value={content}
                onChange={onContentChange}
                multiline
                fullWidth
                rows={4}
                variant='outlined'
                margin='dense'
                style={{
                    backgroundColor: 'white'
                }}
            />
            <Box display='flex' justifyContent='flex-end'>
                <Button onClick={onUpdateClick} variant='contained' color='secondary'>Update</Button>
            </Box>
        </Container>
    )
}
