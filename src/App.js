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

const ZOOM_LEVEL = 9;
// https://leafletjs.com/reference-1.6.0.html#map-factory
const MAP_OPTIONS = {
  scrollWheelZoom: false,
  minZoom: ZOOM_LEVEL,
  maxZoom: ZOOM_LEVEL,
  zoomControl: false,
};

const TILE_SIZE = 512;

const JAMAICA_LAT = 18.12;
const JAMAICA_LONG = -77.3;

const PARISH_TO_CASES = {
  'Hanover': 17,
  'St. Elizabeth': 29,
  'St. James': 2,
  'Trelawny': 0,
  'Westmoreland': 50,
  'Clarendon': 2,
  'Manchester': 3,
  'St. Ann': 14,
  'St. Catherine': 9,
  'St. Mary': 29,
  'Kingston': 0,
  'Portland': 5,
  'St. Andrew': 25,
  'St. Thomas': 19,

};

// Color scale taken from: https://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=4
function getColor(cases) {
    switch (true) {
      case (cases > 20):
        return '#e31a1c';
      case (cases > 10):
        return '#fd8d3c';
      case (cases > 5):
        return '#fecc5c'
      default:
        return '#ffffb2';
    }
}

function style(feature) {
  const cases = PARISH_TO_CASES[feature.properties.PARISH];
  console.log(cases);
  console.log(getColor(cases));
  return {
      fillColor: getColor(cases),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function App() {
  const map = <div id="map" className={mapStyle}></div>;

  useEffect(() => {
    const mymap = L.map('map', MAP_OPTIONS).setView([JAMAICA_LAT, JAMAICA_LONG], ZOOM_LEVEL);
    L.tileLayer(MAPBOX_TILES_URL, {
        attribution: MAPBOX_ATTRIBUTION_URL,
        maxZoom: 18,
        id: 'mapbox/light-v9',
        tileSize: TILE_SIZE,
        zoomOffset: -1,
        accessToken: MAPBOX_ACCESS_TOKEN,
    }).addTo(mymap);
    L.geoJSON(PARISH_JSON, {style: style}).addTo(mymap);

  });

  return (
    <div className="App">
    Hello World!
    {map}
    </div>
  );
}

export default App;
