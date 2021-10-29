import React from 'react'
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Contact from '../Pages/Contact';
import HomePage from '../Pages/HomePage';
import Information from '../Pages/Information';
import editarUsuarios from '../Pages/editarUsuarios';
import trabajadorSalud from '../Pages/trabajadorSalud';
import Profile from '../Pages/Profile';
import News from '../Pages/News';
import Vacunas from '../Pages/Vacunas';
import CargaMasivaUsuario from '../Pages/CargaMasivaUsuario';
import CentrosVacunacion from '../Pages/centrosVacunacion';
import ValidarVacunacion from '../Pages/ValidarVacunacion';
import AdministradorNoticias from '../Pages/AdministradorNoticias'
import ModuloReportes from '../Pages/ModuloReportes';
import ModuloReportes2 from '../Pages/ModuloReportes2';
import ModuloReportes3 from '../Pages/ModuloReportes3';

import Token from '../Pages/Token';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import MenuAppBar from '../components/MenuAppBar';
import Footer from '../components/Footer';

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
        <Route   path="/editarUsuarios"  component={editarUsuarios}/>
        <Route   path="/trabajadorSalud"  component={trabajadorSalud}/>
        <Route   path="/perfil"  component={Profile}/>
        <Route   path="/vacunas"  component={Vacunas}/>
        <Route   path="/cargaUsuarios"  component={CargaMasivaUsuario}/>
        <Route   path="/centrosVacunacion"  component={CentrosVacunacion}/>
        <Route   path="/ValidarVacunacion"  component={ValidarVacunacion}/>
        <Route   path="/AdministradorNoticias"  component={AdministradorNoticias}/>
        <Route   path="/ModuloReportes"  component={ModuloReportes}/>
        <Route   path="/ModuloReportes2"  component={ModuloReportes2}/>
        <Route   path="/ModuloReportes3"  component={ModuloReportes3}/>
        <Route   path="/Token"  component={Token}/>
        <Route path="*">
            <h1>404 Not Found</h1>
        </Route>
    </Switch>   
    <Footer/>
</Router>     
    )
}


