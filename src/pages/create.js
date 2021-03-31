import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLocalItem, removeSessionItem, setLocalItem, setSessionItem } from '../services/storage';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button,Container, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * -- Create component --
 * <TextField> from Material UI is used for creating Form design.
 * User can enter Title and Content, then click 'Create' button to add a new note.
 */
export function Create({ notes, setNotes }) {
    useEffect(() => {
        setNotes(getLocalItem('notes', []));
    },[]);

    let history = useHistory();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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

    const onCreateClick = () => {
        if (title && content) {
            let newArray = [...notes];
            //'uuid' is installed to generate a unique id for each note object.
            newArray.push({id: uuidv4(), title: title, content: content});
            //set Notes state with the new note object
            setNotes(newArray);
            //save the array to Local Storage
            setLocalItem('notes', newArray);
            //remove Title and Content state from Session Storage
            removeSessionItem('title');
            removeSessionItem('content');
            //'react-toastify' is installed to generate an animated alert pop.
            //Display alert message to show the note is added
            toast.success('Your note is added successfully!',{
                position: 'top-center',
                autoClose: 3000
            });
            //navigate back to Home page
            history.push('/');
        } else {
            //if user clicks 'Create' button without entering anything on the form, the alert will be shown and won't be navigated back to Home page.
            toast.error('Title and Content cannot be empty!', {
                position: 'top-center',
                autoClose: 3000
            });
        }
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
                <Button onClick={onCreateClick} variant='contained' color='secondary'>Create</Button>
            </Box>
        </Container>
    )
}
