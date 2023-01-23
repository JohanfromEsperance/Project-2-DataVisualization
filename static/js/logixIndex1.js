// Define quakemap plates GeoJSON url variable
//https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var url = "new_master_datamon2323.geojson";
var url2 = "new_master_data1.json";
//var url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson";
//var url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// Create earthquake layerGroup
let quakemap = L.layerGroup();
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

d3.json(url,function(data2) {console.log(data2);});
d3.json(url2,function(data3) {console.log(data3);});
// 121.899851,-33.87269823 

let myMap = L.map("mapid", {
  center: [
    -33.87269823,121.899851
  ],
  zoom: 16,
  layers: [grayscaleMap, quakemap]
});

// for the heatmapl cluster layer lesson 2 week 15 Solved 
//Get the data with d3.
//d3.json(url2),(function(response) {

  // Create a new marker cluster group.
  //let markers = L.markerClusterGroup();

  // Loop through the data.
  //for (let i = 0; i < response.length; i++) { {console.log(response)};

    // Set the data location property to a variable.
    //let location = response[i].Latitude;

    // Check for the location property.
   // if (location) {

      // Add a new marker to the cluster group, and bind a popup.
      //markers1.addLayer(L.marker([response[i].Latitude[1], response[i].Latitude[0]])
      //  .bindPopup(response[i].Condition_Point[i]));
   // }

 // };

  // Add our marker cluster layer to the map.
  //myMap.addLayer(markers);

//});

d3.json(url, function(Data) {
  // Determine the marker size by magnitude
  function markerSize(Condition_Point) {
    return Condition_Point * 2;
  };

  // Determine the marker color by depth
  function chooseColor(Condition_Point) {
    switch(true) {
      case Condition_Point > 4.5:
        return "red";
      case Condition_Point > 3.5:
        return "orange";
      case Condition_Point > 2.5:
        return "yellow";
      case Condition_Point > 1.5:
        return "blue";
      case Condition_Point > 0.5:
        return "green";
      default:
        return "purple";
    }
  };

    // JOHAN MADE THSI TO TEST: Create a new marker cluster group.
    //let markers = L.markerClusterGroup();

    // Loop through the data.
    //for (let i = 0; i < Data.length; i++) {
      // Set the data location property to a variable.
     // let location = Data[i].Latitude;
      // Check for the location property.
     // if (location) {
        // Add a new marker to the cluster group, and bind a popup.
        //markers1.addLayer(L.marker([Data[i].Latitude[1], Data[i].Latitude[0]])
        //  .bindPopup(Data[i].Condition_Point[i]));
      //}
    //};
    // Add our marker cluster layer to the map.

 /// myMap.addLayer(markers);

  // Create the GeoJSON layer
  // Each feature a popup describing the place and time of the earthquake
  //Lesson 3 Copy code and applications from studies
  L.geoJSON(Data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, 
        {
          radius: markerSize(feature.properties.Condition_Point),
          fillColor: chooseColor(feature.properties.Condition_Point),
          fillOpacity: 0.5,
          color: "yellow",
          // color: "#FED976",
          stroke: true,
          weight: 0.2
        }
      );
    },
    //bind the popup text to the marker, make it readable
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2>Asset Category: " + feature.properties.Asset_Sub_Category + "</h2><hr><p>Date Inspected: " + feature.properties.Date +
                      "</p><hr><p>Asset Name: " + feature.properties.Asset_Type +"</p>"
                      + "</p><hr><p>Condition: " + feature.properties.Condition_Ranking + "</p>"
                      + "</p><hr><p>Rating: " + feature.properties.Condition_Point + "</p>"
                      + "</p><hr><p>This tag have been tested by Johan " + "</p>");
    }
  }).addTo(quakemap);


  // Sending our quakemap layer to the createMap function

  quakemap.addTo(myMap);

    // Add teh legend from Lesson 3 - Week 15 - Copied from class solutions
  var legend = L.control({position: "topright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    Condition_Point = [1,2,3,4,5];
    
    div.innerHTML += "<h3 style='text-align: center'>Asset Condition Index</h3>"
  for (var i =0; i < Condition_Point.length; i++) {
    div.innerHTML += 
    '<i style="background:' + chooseColor(Condition_Point[i]) + '"></i> ' +
    Condition_Point[i] + (Condition_Point[i] ? '&ndash;' + Condition_Point[i + 1] + '<br>' : '+');
      }
    return div;
  };
  legend.addTo(myMap);

});