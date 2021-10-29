
import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
const URL_REG = "http://localhost/ws-login/validarVacunacion.php";

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
        "enfermedad": data.get('enfermedad'),
        "uPrioritario": data.get('uPrioritario'),
        "fecha_validacion": data.get('fecha_validacion')
      };
      console.log(datos);
      enviarData(URL_REG, datos);
      alert("Usuarios Validados");
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
          <Typography component="h1" variant="h5">
            Validar Vacunacion
          </Typography>
          <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h6>Usuarios Enfermedad Cronica</h6>
                <select className="form-control" name="enfermedad">
              <option>no</option>
              <option>si</option>
          </select>
              </Grid>
              <Grid item xs={12}>
                <h6> Usuarios Prioritarios</h6>
                <select className="form-control" name="uPrioritario">
              <option>no</option>
              <option>si</option>
          </select>
              </Grid>
              <Grid item xs={12}>
                <h6>Fecha de Nacimiento</h6>
                <TextField
                type = "date"
                autoComplete="fname"
                name="fecha_validacion"
                required
                fullWidth
                autoFocus
              />
        
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Validar Vacuna
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}