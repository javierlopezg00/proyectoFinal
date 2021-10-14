import '../App.scss';
import React, {useState, useEffect} from 'react';
import NewsLeftComponent from '../components/NewsLeftComponent';
import Box from '@mui/material/Box';
import axios from 'axios';



export default function News() {
  

  const baseUrl="http://localhost:80/ws-login/editNoticias.php";
  const [data, setData]=useState([]);

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  console.log(data[0]);
  
  useEffect(()=>{
    peticionGet();
  },[])

  
  return (
        <div >
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
        <br/>

        <h1>Noticias</h1>
        <tbody>
        {data.map(usuarios=>(
          <tr>
            <NewsLeftComponent titulo={usuarios.titulo} descripcion = {usuarios.descripcion} imagen = {usuarios.imagen}></NewsLeftComponent>
          </tr>
        ))}


      </tbody> 

        </Box>
        </div>
  );
}
