// Define quakemap plates GeoJSON url variable
//https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
//var url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson";
//var url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// Create earthquake layerGroup
var quakemap = L.layerGroup();
//Direct copy from the sample code in //docs.mapbox.com/api/maps/static-images
// Create tile layer and add copyright noices from Website
var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v12",
  accessToken: API_KEY
});
//mapbox://styles/mapbox/satellite-v9
//mapbox://styles/mapbox/outdoors-v12
// Create the map, giving it the grayscaleMap and quakemap layers to display on load
// Used Cairo as the centre to align all the circles in a full screen
var myMap = L.map("mapid", {
  center: [
    -33.8736,121.9016
  ],
  zoom: 2,
  layers: [grayscaleMap, quakemap]
});

d3.json(url, function(Data) {
  // Determine the marker size by magnitude
  function markerSize(magnitude) {
    return magnitude * 2;
  };

  // Determine the marker color by depth
  function chooseColor(depth) {
    switch(true) {
      case depth > 90:
        return "#800026";
      case depth > 70:
        return "#BD0026";
      case depth > 50:
        return "#E31A1C";
      case depth > 30:
        return "#FC4E2A";
      case depth > 10:
        return "#FEB24C";
      default:
        return "#FED976";
    }
  }

  // Create the GeoJSON layer
  // Each feature a popup describing the place and time of the earthquake
  //Lesson 3 Copy code and applications from studies
  L.geoJSON(Data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, 
        {
          radius: markerSize(feature.properties.mag),
          fillColor: chooseColor(feature.geometry.coordinates[2]),
          fillOpacity: 0.5,
          color: "black",
          // color: "#FED976",
          stroke: true,
          weight: 0.2
        }
      );
    },
    //bind the popup text to the marker, make it readable
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2>Location: " + feature.properties.place + "</h2><hr><p>Date: "
      + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>"
      + "</p><hr><p>This tag have been tested by Johan " + "</p>");
    }
  }).addTo(quakemap);
  // Sending our quakemap layer to the createMap function
  quakemap.addTo(myMap);

    // Add teh legend from Lesson 3 - Week 15 - Copied from class solutions
  var legend = L.control({position: "topright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];
    
    div.innerHTML += "<h3 style='text-align: center'>Earthquake Depth</h3>"
  for (var i =0; i < depth.length; i++) {
    div.innerHTML += 
    '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' +
        depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
      }
    return div;
  };
  legend.addTo(myMap);

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
      }).bindPopup(row.Title);
        
      marker.addTo(myMap);
      }
  
    });
});
