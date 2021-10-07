import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const URL_LOGIN = "http://localhost/ws-login/login.php";

const enviarData = async (url,data)=>{
  const resp = await fetch (url,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(resp);
  const json = await resp.json();
  console.log(json);

  window.localStorage.setItem('info', JSON.stringify(json));
  const usuario = JSON.parse(window.localStorage.getItem('info'));

  const conexion = usuario.conectado;

  if(conexion === true){
    //window.location.reload();
    //window.location.replace("/");
  }

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

export default function SignIn() {


  const handleLogin=(event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
      const datos = {
        "dpi": data.get('dpi'),
        "clave": data.get('clave')
      };
      console.log(datos);
      enviarData(URL_LOGIN,datos);
      

  }

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesion
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              type ="text"
              margin="normal"
              required
              fullWidth
              id="dpi"
              label="DPI"
              name="dpi"
              autoComplete="dpi"
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="clave"
              label="Clave"
              type="password"
              id="password"
              autoComplete="current-password"
              
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar Datos"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Acceder
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"No estas registrado?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}