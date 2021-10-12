import './App.scss';
import { createTheme ,ThemeProvider } from '@mui/material/styles';
import AppRouter from './routers/AppRouter';


const theme = createTheme({
  palette: {
    primary:{
      main:"#525558",
      light: "75c7ff",
      dark:"759eff",
      contrastText: "#ffa43a"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <AppRouter />
       
    </div>
    </ThemeProvider>  
  );
}

export default App;
