
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const URL_REG = "http://localhost/ws-login/signUp.php";

const enviarData = async (url,data)=>{
  const resp = await fetch (url,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(resp);
}
function Copyright(props) {
  return (
    
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
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

export default function SignUp() {
  const handleRegister=(event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const datos = {
        "dpi": data.get('dpi'),
        "nombre": data.get('nombre'),
        "apellido": data.get('apellido'),
        "correo": data.get('correo'),
        "clave": data.get('clave'),
        "fecha_de_nacimiento": data.get('fecha_de_nacimiento'),
        "enfermedad": data.get('enfermedad'),
        "celular": data.get('celular'),
        "grupoPrioritario": data.get('grupoPrioritario'),
        "centroVacunacionE": data.get('centroVacunacionE')
      };
      console.log(datos);
      enviarData(URL_REG, datos);
  }

  const [data, setData]=useState([]);
  const baseUrlCentrosV="http://localhost:80/ws-login/editCentrosVacunacion.php";
  const peticionGet=async()=>{
    await axios.get(baseUrlCentrosV)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Registrate
          </Typography>
          <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="nombre"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="apellido"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="DPI"
                  name="dpi"
                  autoComplete="dpi"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Clave"
                  name="clave"
                  autoComplete="clave"
                  type = "password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Correo Electronico"
                  name="correo"
                  autoComplete="correo"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="celular"
                  label="Celular"
                  type="text"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="fecha_de_nacimiento"
                  type="date"
                  id="date"
                  min='2010-01-01'
                />
              </Grid>
              <Grid item xs={12}>
                <h6>Enfermedad Cronica</h6>
                <select className="form-control" name="enfermedad">
                <option>null</option>
                <option>no</option>
              <option>si</option>
          </select>
              </Grid>
              <Grid item xs={12}>
                <h6>Grupo Prioritario</h6>
                <select className="form-control" name="grupoPrioritario">
              <option>null</option>
              <option>no</option>
              <option>si</option>
          </select>
              </Grid>
              <Grid item xs={12}>
                <h6>Centro de vacunacion</h6>
                <select className="form-control" name="centroVacunacionE"> 
                  {data.map(centrosV=>(
                      <option>{centrosV.nombre}</option>
                  ))}
                </select>
              
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Ya esta registrado?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}