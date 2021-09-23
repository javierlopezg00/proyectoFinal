import '../App.css';
import * as React from 'react';
import spiderman from '../img/spiderman.jpg'
import NewsLeftComponent from '../components/NewsLeftComponent';
import NewsRightComponent from '../components/NewsRightComponent';


export default function News() {
  return (
        <div >
        <br/>
        <h1>Noticias</h1>
        <NewsLeftComponent/>
        <NewsRightComponent/>
        <NewsLeftComponent/>
        </div>
  );
}
