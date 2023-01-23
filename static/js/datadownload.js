document.getElementById("download-button").addEventListener("click", function(){
    var link = document.createElement('a');
    link.href = 'file:///C:/Users/Tom%20B/Desktop/module/project%203/test%20website/data.json';
    link.download = 'data.json';
    link.dispatchEvent(new MouseEvent('click'));
});
document.getElementById("download-button2").addEventListener("click", function(){
    var link = document.createElement('a');
    link.href = 'file:///C:/Users/Tom%20B/Desktop/module/project%203/test%20website/new_master_data.csv';
    link.download = 'new_master_data.csv';
    link.dispatchEvent(new MouseEvent('click'));
});
