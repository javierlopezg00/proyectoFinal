import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink} from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Drawer,
} from "@material-ui/core";



const theme = createTheme({
  palette: {
    primary:{
      main:"#525558",
      light: "#75c7ff",
      dark:"#759eff",
      contrastText: "#ffa43a"
    }
  },
  
});
//prueba
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    background: "#525558",
    height: "100%"
  },
  listItem: {
    color: "tan"
  }
}));

const usuarioLogeado = [
  {
    listText: "Perfil"
  }
];


const administrador = [
  {
    listText: "Aplicacion de Dosis"
  },
  {
    listText: "Administrador de usuarios"
  },
  {
    listText: "Administrador de nocitias"
  },
  {
    listText: "Administrador de informacion"
  }
];

const TrabajadorDeSalud = [
  {
    listText: "Aplicacion de Dosis"
  },
  {
    listText: "Administrador de usuarios"
  }
];
//pruebaEND


export default function MenuAppBar() {

  //Tomar datos del localStorage
  const data = JSON.parse(localStorage.getItem('info'));
  const usuario = data.tipoUsuario;

  //prueba
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  const sideList = () => (
    <Box className={classes.menuSliderContainer} component="div">
      
      <List>
       
        {usuario === "UsuarioLogeado" &&
        usuarioLogeado.map((listItem, index) => (
          <ListItem className={classes.listItem} button key={index}>
            <ListItemIcon className={classes.listItem}>
             
            </ListItemIcon>
            <ListItemText primary={listItem.listText} />
          </ListItem>
        ))}
        {usuario === "Administrador" &&
        administrador.map((listItem, index) => (
        <ListItem className={classes.listItem} button key={index}>
          <ListItemIcon className={classes.listItem}>
           
          </ListItemIcon>
          <ListItemText primary={listItem.listText} />
        </ListItem>
      ))
        }
        {usuario === "TrabajadorDeSalud" &&
        TrabajadorDeSalud.map((listItem, index) => (
        <ListItem className={classes.listItem} button key={index}>
          <ListItemIcon className={classes.listItem}>
           
          </ListItemIcon>
          <ListItemText primary={listItem.listText} />
        </ListItem>
      ))
        }
      
      </List>
    </Box>
  );
  //pruebaEND


  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static" color ="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSlider}
          >
            <MenuIcon />
          </IconButton>
          <ThemeProvider theme={theme}>
          <Button variant="text" color="secondary" ><NavLink exact to = "/" >Inicio</NavLink></Button>
          <Button variant="text" color="secondary"><NavLink to = "/news" >Noticias</NavLink></Button>
          <Button variant="text" color="secondary"><NavLink to = "/information" >Informacion</NavLink></Button>
          <Button variant="text" color="secondary"><NavLink to = "/contact" >Contacto</NavLink></Button>
          </ThemeProvider>
          <Drawer open={open} anchor="right" onClose={toggleSlider}>
              {sideList()}
            </Drawer>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
              <MenuItem onClick={handleClose}><NavLink to ="/signIn">Iniciar Sesion</NavLink></MenuItem>
              <MenuItem onClick={handleClose}><NavLink to ="/signUp">Registro</NavLink></MenuItem>
              </Menu>
                  </div>
                  
          )}
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}
