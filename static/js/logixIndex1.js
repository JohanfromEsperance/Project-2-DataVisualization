// Define quakemap plates GeoJSON url variable


//var url = "new_master_datamon2323.geojson";
//var url2 = "new_master_data1.json";

var url = "data/new_master_datamon2323.geojson";
var url2 = "data/new_master_data1.json";

// Create layerGroup
let quakemap = L.layerGroup();
//Direct copy from the sample code in //docs.mapbox.com/api/maps/static-images
// Create tile layer and add copyright noices from Website

var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
});
//mapbox://styles/mapbox/satellite-v9
//mapbox://styles/mapbox/outdoors-v12

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

d3.json(url, function(Data) {
  // Determine the marker size by magnitude
  function markerSize(Condition_Point) {
    return Condition_Point * 3;
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

  // Create the GeoJSON layer
  // Each feature a popup describing the Asset
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


  quakemap.addTo(myMap);

    // Add teh legend from Lesson 3 - Week 15 - Copied from class solutions
  var legend = L.control({position: "topright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    Condition_Point = [1,2,3,4,5];
    
    div.innerHTML += "<h3 style='text-align: center'>Asset Condition Index</h3>"
                  + "</p><hr><p>GREEN - NEW" + "</p>" 
                  + "</p><hr><p>BLUE - Maintenance plan required" + "</p>"
                  + "</p><hr><p>YELLOW - Maintenance repairs required" + "</p>"
                  + "</p><hr><p>ORANGE - Immediate repairs required" + "</p>"
                  + "</p><hr><p>RED - Replace/ Refurbish" + "</p>"
  for (var i =0; i < Condition_Point.length; i++) {
    div.innerHTML += 
    '<i style="background:' + chooseColor(Condition_Point[i]) + '"></i> ' +
    Condition_Point[i] + (Condition_Point[i] ? '&ndash;' + Condition_Point[i + 1] + '<br>' : '+');
      }
    return div;
  };
  legend.addTo(myMap);

});
