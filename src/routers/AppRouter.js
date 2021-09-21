import React from 'react'
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Contact from '../Pages/Contact';
import HomePage from '../Pages/HomePage';
import Information from '../Pages/Information';
import News from '../Pages/News';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import MenuAppBar from '../components/MenuAppBar';

export default function AppRouter() {
    return (
        <Router>
        <MenuAppBar />
    <Switch>
        <Route   path="/signIn"  component={SignIn}/>
        <Route   path="/signUp"  component={SignUp}/>
        <Route   path="/contact"  component={Contact}/>
        <Route  exact path="/"  component={HomePage}/>
        <Route   path="/news"  component={News}/>
        <Route   path="/information"  component={Information}/>
        <Route path="*">
            <h1>404 Not Found</h1>
        </Route>
    </Switch>   
</Router>     
    )
}


