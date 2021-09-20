import './App.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Contact from './Pages/Contact';
import HomePage from './Pages/HomePage';
import Information from './Pages/Information';
import MenuAppBar from './components/MenuAppBar';
import { createTheme ,ThemeProvider } from '@mui/material/styles';
import News from './Pages/News';


import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";


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
    <Router>
    <ThemeProvider theme={theme}>
    <div className="App">
    <MenuAppBar/>
    <Switch>
        <Route  exact path="/signIn"  component={SignIn}/>
        <Route  exact path="/signUp"  component={SignUp}/>
        <Route  exact path="/contact"  component={Contact}/>
        <Route  exact path="/homePage"  component={HomePage}/>
        <Route  exact path="/news"  component={News}/>
        <Route  exact path="/information"  component={Information}/>
    </Switch>   
    </div>
    </ThemeProvider>
    </Router>     
  );
}

export default App;
