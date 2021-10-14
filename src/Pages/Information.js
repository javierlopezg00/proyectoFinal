import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomePageComponent from '../components/HomePageComponent';
import Box from '@mui/material/Box';
import imagen1 from '../img/imagen1.jpeg'
import imagen2 from '../img/imagen2.jpg'
import imagen3 from '../img/imagen3.jpeg'

export default function SimpleAccordion() {
  return (
    
    <div id = 'acordeon'>
    <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
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
        <HomePageComponent contenido="Si la COVID-19 se propaga en su comunidad, manténgase seguro mediante la adopción de algunas sencillas medidas de precaución, por ejemplo, mantener el distanciamiento físico, llevar mascarilla, ventilar bien las habitaciones, evitar las aglomeraciones, lavarse las manos y, al toser, cubrirse la boca y la nariz con
         el codo flexionado o con un pañuelo. Consulte las recomendaciones locales del lugar en el que vive y trabaja" imagen={imagen1}/>
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
          <HomePageComponent contenido="Hay algo muy curioso que se repite entre los infectados de todas las edades: el virus es más letal para hombres que para mujeres. Del total de muertes por el coronavirus de más de 70 años el 59% son hombres.
          Algunos perros y gatos en Hong Kong y en Estados Unidos, han dado positivo al coronavirus. Es decir, tú podrías contagiar a tu mascota, pero no al revés. Instituciones como la OIE, AVMA o CDC inciden en que, 
          hasta la fecha, no existen suficientes evidencias científicas que demuestren que los animales domésticos puedan propagar el COVID-19. De cualquier forma, recuerda seguir 
          todas las medidas sanitarias que han señalado las autoridades. " imagen={imagen2}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ width: 4/5 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Poblacion mundial vacunada</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <HomePageComponent contenido="La carrera hacia la vacunación completa 
        sigue avanzando en el mundo, aunque a un ritmo muy dispar entre continentes e incluso entre países de una misma región. Con el 80,2% de sus ciudadanos totalmente vacunados, es decir, que han recibido todas las dosis prescritas por el protocolo de vacunación, Malta se sitúa como el país con el mayor porcentaje
         de población totalmente inmunizada, según datos de las autoridades sanitarias recopilados por Our World in Data." imagen={imagen3}/>
        </AccordionDetails>
      </Accordion>
      </Box>
    </div>
  );
}