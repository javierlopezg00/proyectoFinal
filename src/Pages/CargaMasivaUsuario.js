import React from 'react';
import Card from '@material-ui/core/Card';
import Container from '@mui/material/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Box from '@mui/material/Box';

export default class CargaMasivaUsuarios extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           csv: '',
           file: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }
    handleChange = e => {
        if(e.target.files[0]){
            this.setState({csv:  e.target.files[0].name,
            file: e.target.files[0]});
            console.log(this.state.csv);
        }else{
            this.setState({csv: ''});
        }
    } 
    submitData=()=>{
        const url = 'http://localhost/ws-login/cargaMasivaUsuarios.php';
            let formData = new FormData();
            formData.append('file', this.state.csv);
            formData.append('csv', this.state.file);
                axios.post(url, formData)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (response) {
                    console.log(response);
                });
                
    }
    render(){
        return(
            
          <Container component="main" maxWidth="xs">
            <div className="import-page">
            <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
                    <Card className="import-form">
                        <h1 align="center">Importar Usuarios</h1>
                        <span id="message"></span>
                        <form id="sample_form">
                            <Grid container direction={"column"} spacing={1}>
                                <Grid item >
                                    <label >Seleccionar el archivo CSV</label>
                                </Grid>
                                <Grid item >
                                <input type="file" accept=".csv" name="csv-file" id="csv-file" inputProps={{ accept: '.csv' }}  variant="outlined" onChange={this.handleChange}/>  
                                </Grid>
                                <Grid item >
                                    <input type="hidden" name="hidden_field" value="1" />
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                   name="import" 
                                   id="import"
                                   onClick={this.submitData}>Cargar Usuarios</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                    </Box>
            </div>
            </Container>
        );
    }
}

