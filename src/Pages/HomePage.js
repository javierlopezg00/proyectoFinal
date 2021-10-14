import * as React from 'react';
import { Carousel } from 'react-carousel-minimal';
import HomePageComponent from '../components/HomePageComponent';
import Box from '@mui/material/Box';
import imagen1 from '../img/imagen1.jpeg'
import imagen2 from '../img/imagen2.jpg'
export default function HomePage() {
    const data = [
        {
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
          caption: `<div>
                      San Francisco
                      <br/>
                      Next line
                    </div>`
        },
        {
          image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
          caption: "Scotland"
        },
        {
          image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
          caption: "Darjeeling"
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
                time={2000}
                width="100%"
                height="600px"
                captionStyle={captionStyle}
                radius="15px"
                slideNumber={false}
                slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                automatic={false}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
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
    
