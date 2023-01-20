//Use the D3 library to read in samples.json from the URL 
//https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
//Lesson 3 - Session 1 - Copy and Paste:)

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Initialize the page with a default plot.

function charts(testpersonnumber) {
  d3.json(url).then((data) => {
    var dataset = data.samples;
    var subject = dataset.filter((sampleobject) => sampleobject.id == testpersonnumber)[0];
    console.log(subject);
    var otu_ids = subject.otu_ids;
    var otu_labels = subject.otu_labels;
    var sample_values = subject.sample_values;

    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    //Use sample_values as the values for the bar chart.
    //Use otu_ids as the labels for the bar chart.
    //Use otu_labels as the hovertext for the chart.
    //https://www.edureka.co/blog/convert-int-to-string-in-java/#:~:text=Integer%20to%20String%20conversion%20in,toString(int)%20function.

    var trace1 = {
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids
        .slice(0, 10)
        .map((otuID) => `OTU ${otuID}`)
        .reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

      //https://plotly.com/javascript/bar-charts/#bar-chart-with-direct-labels
   
    var data = [trace1];
      //Copy and paste, and change from https://plotly.com/javascript/bar-charts/#bar-chart-with-hover-text
      // Set the OTU_LABEL for the BARCHART for the OTU
        var layout = {
          title: 'Horisontal Bacterial Barchart',
          xaxis: { title: "# Samples" },
          yaxis: { title: "OTU_ID"},
          margin: { t: 70, l: 100 },
          height: 400,
        };

    Plotly.newPlot("bar", data, layout);

    //https://plotly.com/javascript/bubble-charts/#marker-size-and-color-on-bubble-charts
    //Colorscale data from Plotly - Earth
    // Create a bubble chart that displays each sample.
    //Use otu_ids for the x values.
    //Use sample_values for the y values.
    //Use sample_values for the marker size.
    //Use otu_ids for the marker colors.
    //Use otu_labels for the text values.

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
        marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: "Earth",
        },
    };

    var data = [trace1];
    var layout = {
      title: 'Sample Values from OTU_ID',
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Bacteria from OTU_ID"},
      hovermode: "closest",
      width: window.width,
     };

    Plotly.newPlot("bubble", data, layout);
  });
}

//-----------END of CHART FUNCTION--------------------------------

// INFOGRAM Data setup

function initialise(testpersonnumber) {
  d3.json(url).then((data) => {
    var MetaData = data.metadata;
    var subject = MetaData.filter((sampleobject) => sampleobject.id == testpersonnumber)[0];
    var demographicInfoBox = d3.select("#sample-metadata");
    demographicInfoBox.html("");//clear the box- help from the internet-geeks
    Object.entries(subject).forEach(([key, value]) => {demographicInfoBox.append("h5").text(`${key}: ${value}`);});
  });
}
//-----------END of INFOGRAM FUNCTION--------------------------------

  // Code copied and converted direcetly from LESSON 3-Session 9 - Dropdowns
  // Call updatePlotly() when a change takes place to the DOM
  // Call the data into the inspector console. 
function init() {
  d3.json(url).then(function (data) {
    console.log("samples.json:", data);
    let DropDown = d3.select(`#selDataset`);
    data.names.forEach((name) => {DropDown.append(`option`).text(name).property(`value`, name);});
    // INFOGRAM RESET
    const firstSample = data.names[0];
    charts(firstSample);
    initialise(firstSample);
  });
}
//-----------END of DROPDOWN FUNCTION--------------------------------
//plotly.com/javascript/dropdowns - copy and paste
// Reset and Select
function optionChanged(newSample) {
  charts(newSample);
  initialise(newSample);
}

init();
