import './App.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import MenuAppBar from './components/MenuAppBar';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
    <MenuAppBar/>
    <Switch>
        <Route  exact path="/signIn"  component={SignIn}/>
        <Route  exact path="/signUp"  component={SignUp}/>
    </Switch>   
    </div>
    </Router>     
  );
}

export default App;
