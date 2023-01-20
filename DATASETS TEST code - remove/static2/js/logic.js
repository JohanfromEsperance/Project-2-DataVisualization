
// Create layerGroup
var quakemap = L.layerGroup();
//Direct copy from the sample code in //docs.mapbox.com/api/maps/static-images
// Create tile layer and add copyright noices from Website
var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 50,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
});
//mapbox://styles/mapbox/satellite-v9
//mapbox://styles/mapbox/outdoors-v12
// Create the map, giving it the grayscaleMap to display on load
// TES d3.csv load



var myMap = L.map("mapid", {
  center: [
    -33.8736,121.9016
  ],
  zoom: 18,
  layers: [grayscaleMap]
});

  // Sending our quakemap layer to the createMap function
  grayscaleMap.addTo(myMap);
// Read markers data from data.csv
  $.get('new_master_data.csv', function(csvString) {
    // Use PapaParse to convert string to array of objects
  var data1 = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
    //(let i = 0; i < 10000; i++)
    //(var i in data1)
    var greenIcon = L.icon({
      iconUrl: 'leaf-green.png',
      shadowUrl: 'leaf-shadow.png',
  
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    })

    for (var i in data1) {
    var row = data1[i];
    var marker = L.marker([row.Latitude, row.Longitude], {
      icon: greenIcon
    }).bindPopup("<h3>Asset Type: " + row.AssetType + "</h3><hr><p>Area: "
    + row.Space + "</p><hr><p>Site: " + row.Site + "</p>"
    + "</p><hr><p>Condition: " + row.ConditionRanking + "</p>"
    + "</p><hr><p>Rating: " + row.ConditionPoint + "</p>"
    + "</p><hr><p>This tag have been tested by Johan " + "</p>")
    marker.addTo(myMap);

  }});
