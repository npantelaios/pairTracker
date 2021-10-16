function loadImagesSequential(){
    // SET NUMBER OF IMAGES
    var times = 3;

    var img;
    var imgArray = new Array();
    
    for(var j=0; j < times; j++){
        loadImage(j);
    }

    createTable(imgArray);

    changeTableClass();

    function loadImage(j) {
            img = new Image();
            img.onload = imgArray.push(img);
            img.src = 'images/' + j + '.png';
    }

    function createTable(tableData) {
        var table = document.createElement('table');
        var tableBody = document.createElement('tbody');
        var row = document.createElement('tr');

        tableData.forEach(function(rowData) {
      
            var cell = document.createElement('td');
            cell.appendChild(rowData);
            row.appendChild(cell);
      
          tableBody.appendChild(row);
        });
      
        table.appendChild(tableBody);
        console.log(table)
        document.body.appendChild(table);
    }

    function changeTableClass() {
        var myCell = document.getElementsByTagName("td")
        console.log(myCell.length)
        myCell[0].classList.add("mh-5");
    }

    // function createTable(tableData) {
    //     var table = document.createElement('table');
    //     var tableBody = document.createElement('tbody');
      
    //     tableData.forEach(function(rowData) {
    //       var row = document.createElement('tr');
      
    //       rowData.forEach(function(cellData) {
    //         var cell = document.createElement('td');
    //         cell.appendChild(document.createTextNode(cellData));
    //         row.appendChild(cell);
    //       });
      
    //       tableBody.appendChild(row);
    //     });
      
    //     table.appendChild(tableBody);
    //     console.log(table)
    //     document.body.appendChild(table);
    // }
      
}