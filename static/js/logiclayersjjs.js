//THsi was quite challenging, I planned to put this code into teh primary logic, but the d3.geoJSON loop crashed.
//The data is static and is used for identification of locations


var Berth1 = L.marker([-33.87149496	,121.8988605]).bindPopup('This is Berth 1.'),
    Berth2    = L.marker([-33.87236113	,121.9001696]).bindPopup('This is Berth2.'),
    Berth3    = L.marker([-33.86940091	,121.9044669]).bindPopup('This is Berth 3.'),
    ContainerCrane   = L.marker([-33.87258716	,121.9010749]).bindPopup('This is the Container Crane.'),
    Shed1    = L.marker([-33.87149176	,121.8956494]).bindPopup('This is Shed 1.'),
    Shed2    = L.marker([-33.87133058	,121.8952981]).bindPopup('This is Shed 2.'),
    Shed3    = L.marker([-33.87625075	,121.9023369]).bindPopup('This is Shed 3.'),
    Shed4    = L.marker([-33.87543209	,121.9017099]).bindPopup('This is Shed 4.'),
    Shed5    = L.marker([-33.87471224	,121.9030718]).bindPopup('This is Shed 5.'),
    Shed6    = L.marker([-33.87220691	,121.898273]).bindPopup('This is Shed 6.'),
    ShipLoader    = L.marker([-33.86940091, 121.9020749]).bindPopup('This is the Ship Loader, in the water');

var cities = L.layerGroup([Berth1,Berth2,Berth3,ContainerCrane,Shed1,Shed2,Shed3,Shed4,Shed5,Shed6,ShipLoader]); 

var osm = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY 
});

var streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
});

var map = L.map('map', {
    center: [-33.8714, 121.8988],
    zoom: 16,
    layers: [osm, cities]
});

var baseMaps = {
    "Sattelite Map": osm,
    "Streets": streets
};

var overlayMaps = {
    "Port Equipment": cities
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

var Port = L.marker([-33.87220691	,121.898273]).bindPopup('Southern Ports'),
    CBH = L.marker([-33.87308489	,121.8986153]).bindPopup('CBH Grain Terminal'),
    PORT = L.circleMarker([-33.8714, 121.8988], 
                                        {
                                        radius: markerSize = 250,
                                        fillColor: "red",
                                        fillOpacity: 0.2,
                                        color: "yellow",
                                        stroke: true,
                                        weight: 0.2}
    ).bindPopup('PORT')
    ;

    
var parks = L.layerGroup([Port, CBH, PORT]);
var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY 
});

layerControl.addBaseLayer(satellite, "Locations");
layerControl.addOverlay(parks, "PORT AREA");