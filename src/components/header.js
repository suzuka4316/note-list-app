import React from 'react';
import { Link } from 'react-router-dom';
import { getLocalItem, removeLocalItem } from '../services/storage';
import { AppBar, Box, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { red } from '@material-ui/core/colors';
import { toast } from 'react-toastify';

/** custom color for 'Clear Note List' button **/
const useStyles = makeStyles({
    button: {
        backgroundColor: red[700],
        '&:hover': {
        backgroundColor: red[800],
        }
    }
});

/**
 * --- Header component ---
 * <AppBar> from Material UI is used for the header design.
 * The app title 'Note List App' and 'Clear Note List' button is shown.
 */
export function Header({ setNotes }) {
    const classes = useStyles();

    const onRemoveListClick = () => {
        //All the notes are removed from the local storage, and the note table will be empty.
        removeLocalItem('notes');
        setNotes(getLocalItem('notes', []));

        //Display alert message to show the notes are deleted
        toast('All of your notes were deleted successfully!',{
            position: 'top-center',
            autoClose: 3000
        });
    }

    return (
        <AppBar className='header-container'>
            <Toolbar>
                <SpeakerNotesIcon style={{fontSize: '2rem'}}/>
                <Box display='flex' flexGrow={1} marginLeft='10px' >
                    <Link to='/' style={{ textDecoration: 'none', color: 'black'}}>
                        <Typography variant='h4'>Note List App</Typography>
                    </Link>
                </Box>
                <Button variant='contained' onClick={onRemoveListClick} className={classes.button}>
                    <RemoveCircleIcon style={{marginRight: '10px'}}/>
                    Clear Note List
                </Button>
            </Toolbar>  
        </AppBar>
    )
}
