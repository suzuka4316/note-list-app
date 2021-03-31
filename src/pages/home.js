import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row } from '../components';
import { getLocalItem } from '../services/storage';
import { Button,Container,TableContainer,Table,TableHead,TableRow,TableCell,TableBody, Paper, Box } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

/**
 * -- Home component --
 * Material UI is used for the layout design.
 * 'Create New Note' button and the Notes table will be shown.
 * For each element in the Notes array, <Row> component is rendered.
 */
export function Home({ notes,setNotes }) {

    let history = useHistory();

    useEffect(() => {
        setNotes(getLocalItem('notes', []));
    },[]);

    const onNavigateCreate = () => {
        //navigate to Create page by clicking 'Create New Note' button.
        history.push('/create');
    }

    return (
        <Container maxWidth='lg' className='page-container' >
            <TableContainer component={Paper}>
                <Table>
                    <colgroup>
                        <col style={{width:'20%'}} />
                        <col style={{maxWidth:'60%'}} />
                        <col style={{width:'10%'}} />
                        <col style={{width:'10%'}} />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Title</TableCell>
                            <TableCell align='left'>Content</TableCell>
                            <TableCell align='left'>Update</TableCell>
                            <TableCell align='left'>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notes.map((note, i) =>
                            <TableRow key={i}>
                                <Row note={note} notes={notes} setNotes={setNotes} />
                            </TableRow> 
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display='flex' justifyContent='flex-end'>
                <Button onClick={onNavigateCreate} variant="contained" color="secondary" float='right' style={{marginTop: '5px'}}>
                    <AddBoxIcon style={{marginRight: '10px'}} />
                    Create New Note
                </Button>
            </Box>
        </Container>
    )
}
