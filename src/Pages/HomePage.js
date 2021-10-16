import * as React from 'react';
import { Carousel } from 'react-carousel-minimal';
import HomePageComponent from '../components/HomePageComponent';
import Box from '@mui/material/Box';
import imagen1 from '../img/imagen1.jpeg'
import imagen2 from '../img/imagen2.jpg'
export default function HomePage() {
    const data = [
        {
          image: "http://localhost:80/Imagenes/proyecto-final/vacuna1.jpg",
          caption: "Vacunacion COVID 2021"
        },
        {
          image: "http://localhost:80/Imagenes/proyecto-final/vacuna2.jpg",
          caption: "Presidente Mexico"
        },
        {
          image: "http://localhost:80/Imagenes/proyecto-final/vacuna3.jpg",
          caption: "Virus Letal"
        }
      ];
    
      const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }
      return (
        <div className="App">
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <div style={{ textAlign: "center" }}>
            <div style={{
              padding: "0 20px"
            }}>
              <Carousel
                data={data}
                time={3000}
                width="100%"
                height="500px"
                captionStyle={captionStyle}
                radius="15px"
                slideNumber={false}
                slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                automatic={true}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="contain"
                thumbnails={false}
                thumbnailWidth="100px"
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  maxHeight: "800px",
                  margin: "1% auto",
                }}
              />
            </div>
          </div>
          
          <HomePageComponent contenido="Si la COVID-19 se propaga en su comunidad, manténgase seguro mediante la adopción de algunas sencillas medidas de precaución, por ejemplo, mantener el distanciamiento físico, llevar mascarilla, ventilar bien las habitaciones, evitar las aglomeraciones, lavarse las manos y, al toser, cubrirse la boca y la nariz con
         el codo flexionado o con un pañuelo. Consulte las recomendaciones locales del lugar en el que vive y trabaja" imagen={imagen1}/>
        
         <HomePageComponent contenido="Hay algo muy curioso que se repite entre los infectados de todas las edades: el virus es más letal para hombres que para mujeres. Del total de muertes por el coronavirus de más de 70 años el 59% son hombres.
         Algunos perros y gatos en Hong Kong y en Estados Unidos, han dado positivo al coronavirus. Es decir, tú podrías contagiar a tu mascota, pero no al revés. Instituciones como la OIE, AVMA o CDC inciden en que, 
         hasta la fecha, no existen suficientes evidencias científicas que demuestren que los animales domésticos puedan propagar el COVID-19. De cualquier forma, recuerda seguir 
         todas las medidas sanitarias que han señalado las autoridades. " imagen={imagen2}/>
         
          </Box>
        </div>
      );
    }
    
