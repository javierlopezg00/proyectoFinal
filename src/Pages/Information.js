import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomePageComponent from '../components/HomePageComponent';

export default function SimpleAccordion() {
  return (
    
    
    <div id = 'acordeon'>
    <h1>Informacion</h1>

      <Accordion sx={{ width: 4/5 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Recomendaciones</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <HomePageComponent/>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ width: 4/5 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Datos Curiosos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <HomePageComponent/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}