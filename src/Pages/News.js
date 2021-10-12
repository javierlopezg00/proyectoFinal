import '../App.scss';
import * as React from 'react';
import NewsLeftComponent from '../components/NewsLeftComponent';
import NewsRightComponent from '../components/NewsRightComponent';
import Box from '@mui/material/Box';


export default function News() {
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
        <NewsLeftComponent/>
        <NewsRightComponent/>
        <NewsLeftComponent/>
        </Box>
        </div>
  );
}
