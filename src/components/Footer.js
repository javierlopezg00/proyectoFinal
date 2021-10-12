import React from 'react'
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

export default function Footer() {
    return (
      <div class = "footer">
        <AppBar position="relative" color="primary" >
          <Container maxWidth="md">
            <Toolbar>
            <Typography variant="body2" color="inherit">
            © 2021 VacunaCovid<br/>
            <a href="https://www.instagram.com/">Instagram</a>|
            <a href="https://www.Facebook.com/">Facebook</a>|
            <a href="https://www.Twitter.com/">Twitter</a>

          </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        </div>
    )
}


