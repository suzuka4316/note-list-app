import React from 'react';
import { useHistory } from 'react-router-dom';
import { setLocalItem } from '../services/storage'
import { Button,makeStyles,TableCell } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { toast } from 'react-toastify';

/** custom color for 'Delete' button **/
const useStyles = makeStyles({
    delete: {
        backgroundColor: red[400],
        '&:hover': {
        backgroundColor: red[700],
        }
    }
});

/**
 * -- Row component --
 * <TableCell> from Material UI is used for the table design.
 * Displays Title, Note, Update button, and Delete button for each row of the table.
 */
export function Row({ note,notes,setNotes }) {
    const classes = useStyles();
    const history = useHistory();

    const onDeleteClick = (e) => {
        //Creates new array by filtering out the note object that is clicked.
        let newArr = notes.filter(el => el.id !== note.id);
        setNotes(newArr);
        setLocalItem('notes', newArr);
        //Display alert message to show the note is deleted
        toast.success('Your note is deleted successfully!',{
            position: 'top-center',
            autoClose: 3000
        });
    }
    
    const onNavigateUpdate = () => {
        //if the id of the note clicked is 'id1', then navigated to '/update/id1'
        history.push({
            pathname:`/update/${note.id}`
        });
    }
    return (
        <>
            <TableCell align='left'>{note.title}</TableCell>
            <TableCell align='left'  style={{wordWrap:'break-word'}}>{note.content}</TableCell>
            <TableCell align='left'> 
                <Button 
                    onClick={onNavigateUpdate}
                    variant='contained' 
                    color='secondary' 
                    startIcon={<UpdateIcon />}
                    style={{paddingRight:'4px'}}>
                </Button>
            </TableCell>
            <TableCell align='left'>
                <Button 
                    variant='contained' 
                    startIcon={<DeleteIcon />} 
                    onClick={onDeleteClick}
                    style={{paddingRight:'4px'}}
                    className={classes.delete}>
                </Button>
            </TableCell>
        </>
    )
}
