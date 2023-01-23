document.getElementById("download-button").addEventListener("click", function(){
    var link = document.createElement('a');
    link.href = 'https://github.com/JohanfromEsperance/Project-3-DataVisualization/blob/main/static/file/data.json';
    link.download = 'data.json';
    link.dispatchEvent(new MouseEvent('click'));
});
document.getElementById("download-button2").addEventListener("click", function(){
    var link = document.createElement('a');
    link.href = 'https://github.com/JohanfromEsperance/Project-3-DataVisualization/blob/main/static/file/new_master_data.csv';
    link.download = 'new_master_data.csv';
    link.dispatchEvent(new MouseEvent('click'));
});
