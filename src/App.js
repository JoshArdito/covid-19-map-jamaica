import React from 'react';
import {useEffect} from 'react';
import './App.css';
import {css} from 'glamor';
import L from 'leaflet';

const PARISH_JSON = require('./data/jamaica-parishes.json');
const mapStyle = css({
  height: '500px',
});

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYXJkaXRvam9zaCIsImEiOiJjazhueDEwNDQwdWt6M3JwZXAwd2hiajJuIn0.cftbrDv5zJTpODE1khs_Tw';
const MAPBOX_TILES_URL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
const MAPBOX_ATTRIBUTION_URL ='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const TILE_SIZE = 512;

const JAMAICA_LAT = 18.12;
const JAMAICA_LONG = -77.3;

function App() {
  const map = <div id="map" className={mapStyle}></div>;

  useEffect(() => {
    const mymap = L.map('map').setView([JAMAICA_LAT, JAMAICA_LONG], 9);
    L.tileLayer(MAPBOX_TILES_URL, {
        attribution: MAPBOX_ATTRIBUTION_URL,
        maxZoom: 18,
        id: 'mapbox/light-v9',
        tileSize: TILE_SIZE,
        zoomOffset: -1,
        accessToken: MAPBOX_ACCESS_TOKEN,
    }).addTo(mymap);
    L.geoJSON(PARISH_JSON).addTo(mymap);

  });

  return (
    <div className="App">
    Hello World!
    {map}
    </div>
  );
}

export default App;
