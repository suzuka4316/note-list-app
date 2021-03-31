import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Create, Update } from '../pages';

/**
 * -- Routes component --
 * The app has 3 pages in total: Home page, Create page, and Update page.
 */
export function Routes({ notes, setNotes }) {
    return (
        <Switch>
            <Route exact path='/'><Home notes={notes} setNotes={setNotes} /></Route>
            <Route exact path='/create'><Create notes={notes} setNotes={setNotes}/></Route>
            <Route exact path='/update/:id'><Update notes={notes} setNotes={setNotes} /></Route>
        </Switch>
    )
}
