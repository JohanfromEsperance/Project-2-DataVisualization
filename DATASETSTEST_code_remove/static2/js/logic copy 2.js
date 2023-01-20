
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


d3.csv("data.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].Title1);
        console.log(data[i].Title2);
        console.log(data[i].Title3);
        console.log(data[i].Latitude);
        console.log(data[i].Longitude);
    }

    //var csvLayer = L.geoCsv(csvFileContents, options);
    //function() {
    //  'use strict';
     
    //  var map = L.map('mapContainer');
     
    //  $.get('data.csv', function(csvContents) {
    //    var geoLayer = L.geoCsv(csvContents, {firstLineTitles: true, fieldSeparator: ','});
    //    map.addLayer(geoLayer);
     // });
    //});
  // Determine the marker size by state rating
 // function markerSize(Title3) {
 //   return Title3 * 2;
 // };

    // Determine the marker color by condition
  //  function chooseColor(Title3) {
 //     switch(true) {
 //       case Title3 = 1 :
 //        return "#800026";
 //       case Title3 = 2:
 //         return "#BD0026";
 //       case Title3 = 3:
 //         return "#E31A1C";
 //       case Title3 = 4:
 //         return "#FC4E2A";
 //       case Title3 = 5:
 //         return "#FEB24C";
 //       default:
 //         return "#FED976";
 //     }
 //   }
      // Create the GeoJSON layer
  // Each feature a popup describing the place and time of the earthquake
  //Lesson 3 Copy code and applications from studies
 // L.geoJSON(data, {
 //   pointToLayer: function (row.Title1,row.Title2,row.Title3) {
 //     return L.circleMarker(Title3, 
 //       {
 //         radius: markerSize(row.Title3),
 //         fillColor: chooseColor(row.Title3),
 //         fillOpacity: 0.5,
 //         color: "black",
 //         // color: "#FED976",
 //         stroke: true,
 //         weight: 0.2
 //       }
 //     );
 //   },
    //bind the popup text to the marker, make it readable
 //   onEachFeature: function(row.Title1,row.Title2,row.Title3)) {
 //     layer.bindPopup("<h2>ASSET: " + row.Title1 + "</h2><hr><p>"Date: "
 //     + row.Title2 + "</p><hr><p>Magnitude: " + row.Title3 + "</p>"
 //     + "</p><hr><p>This tag have been tested by Johan " + "</p>");
 //   }
 // }).addTo(myMap);

});

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
  $.get('data.csv', function(csvString) {
    // Use PapaParse to convert string to array of objects
  var data1 = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
  for (var i in data1) {
    var row = data1[i];
    var marker = L.marker([row.Latitude, row.Longitude], {
      opacity: 1
    }).bindPopup(row.Title)
 
    marker.addTo(myMap);
  }
  
  });
