
function loadImagesSequential(name, length, localstorageName){
    var totalImages = length
    var rowLength = 12



    var img;
    var imgArray = new Array();
    
    for(var j=0; j < totalImages; j++){
        loadImage(j);
    }


    createTable(imgArray);
    changeTableClass();
    makeGrayscale();
    // end of main calls

    function loadImage(j) {
        var ratio = window.devicePixelRatio || 1;
        var w = screen.width * ratio;
        var h = screen.height * ratio;
        // var w = screen.width;
        // var h = screen.height;
        // var w = document.documentElement.clientWidth;
        // var h = document.documentElement.clientHeight;
        img = new Image();
        img.onload = imgArray.push(img);
        if (w < 1200){
            img.width = 100;
        }
        else {
            img.width = w / 13;
        }
        img.height = img.width
        // img.src = 'images/all_both/bw_' + j + '.png';
        img.src = `${name}/bw_${j}.png`;
        // img.setAttribute("class", "col-md-1")
    }

    function createTable(tableData) {
        var prevState = document.createElement('table');
        prevState.innerHTML = localStorage.getItem('myTable'+localstorageName);
        if (prevState.innerHTML.length < 20){
            var table = document.createElement('table');
            // for screenshot purposes add #id=table0
            table.setAttribute("id", "table0");
            // for localstorage purposes add .class=table1
            table.setAttribute("class", "table1");

            var tableBody = document.createElement('tbody');
            var row = document.createElement('tr');
            var cnt = 0

            tableData.forEach(function(rowData) {
        
                var cell = document.createElement('td');
                cell.appendChild(rowData);
                row.appendChild(cell);
                
                
                cnt++
                if (cnt % rowLength == 0 || (cnt == totalImages)){
                    tableBody.appendChild(row);
                    row = document.createElement('tr');
                }
            });
        
            table.appendChild(tableBody);
            document.body.appendChild(table);
            localStorage.setItem("myTable"+localstorageName, table.outerHTML);
        }
        else{
            var myTable = document.createElement('table');
            myTable.setAttribute("id", "table0");
            myTable.setAttribute("class", "table1");
            myTable.innerHTML = localStorage.getItem("myTable"+localstorageName)
            document.body.appendChild(myTable);
        }
    }

    function changeTableClass() {
        var myCell = document.getElementsByTagName("img")
        for (const [_, eachImg] of Object.entries(myCell)){
            eachImg.classList.add("img1");
        }
    }

    function makeGrayscale() {
        var myCell = document.getElementsByTagName("img")
        for (const [_, eachImg] of Object.entries(myCell)){
            eachImg.onclick = function () {switchGrayscale(eachImg)}
        }
    }

    function switchGrayscale(elmt) {
      if (typeof elmt !== 'undefined') {
          state = (elmt.src.indexOf("bw_") === -1) ? 'clr' : 'bw';
          (state === 'bw') ? elmt.src = elmt.src.replace('bw_','clr_') : elmt.src = elmt.src.replace('clr_','bw_');  
      }
      else{
          console.log("undefined")
      }
    }


}

function resetLocalstorage(){
    // localStorage.clear()
    var images = document.getElementsByClassName("img1");
    for (i=0; i<images.length; i++){
        if (images[i].src.indexOf("bw_") === -1){
            images[i].src = images[i].src.replace('clr_','bw_')
        }
    }
}