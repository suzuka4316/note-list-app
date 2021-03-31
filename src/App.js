import { useState } from 'react';
import { Header, Routes } from './components';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { lightGreen, lime } from '@material-ui/core/colors';
import { ToastContainer } from 'react-toastify';


/** custom primary and secondary color theme **/
const theme = createMuiTheme({
  palette: {
    primary: {
      main: lime[500]
    },
    secondary: {
      main: lightGreen[400]
    }
  }
});

function App() {
  const [notes, setNotes] = useState([]);

  return (
    <MuiThemeProvider theme={theme}>
      <Header setNotes={setNotes}/>
      <Routes notes={notes} setNotes={setNotes}/>
      <ToastContainer />
    </MuiThemeProvider>
  );
}

export default App;
