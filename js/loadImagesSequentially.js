function loadImagesSequential(){
    // SET VARIABLES
    var totalImages = 4;
    var rowLength = 4

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
        var width = screen.width;
        var height = screen.height;
        img = new Image();
        img.onload = imgArray.push(img);
        img.width = width / 18;
        img.height = height / 12;
        img.src = 'images/all_both/bw_' + j + '.png';
        // img.onclick = switchGrayscale(img)
    }

    function createTable(tableData) {
        var table = document.createElement('table');
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
    }

    function changeTableClass() {
        var myCell = document.getElementsByTagName("img")
        for (const [_, eachImg] of Object.entries(myCell)){
            eachImg.classList.add("img1");
            // alternative
            // eachImage.setAttribute(‘class’, ‘Class-s-m-x’);
        }
    }

    function makeGrayscale() {
        var myCell = document.getElementsByTagName("img")
        console.log(myCell.length)
        for (const [_, eachImg] of Object.entries(myCell)){
            eachImg.onclick = function () {switchGrayscale(eachImg)}
        }
    }

    function switchGrayscale(elmt) {
      if (typeof elmt !== 'undefined') {
          state = (elmt.src.indexOf("bw_") === -1) ? 'clr' : 'bw';
          (state === 'bw') ? elmt.src = elmt.src.replace('bw_','clr_') : elmt.src = elmt.src.replace('clr_','bw_');  
      }
      console.log(elmt)
      // $(this).attr("src", src);
    }

    // function switchGrayscale() {
    //     $("td").find('img').bind("click", function() {
    //         var src = $(this).attr("src"), 
    //             state = (src.indexOf("bw_") === 0) ? 'bw' : 'clr';
            
    //         (state === 'bw') ? src = src.replace('bw_','clr_') : src = src.replace('clr_','bw_');  
          
    //         $(this).attr("src", src);
          
    //     });
    // }

    function grayscaleIt() {
        const img = document.getElementById("img1");
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        
        img.onload = function () {
          img.crossOrigin = "anonymous";
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          for (i = 0; i < imgData.data.length; i += 4) {
            let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
            let colour = 0;
            if (count > 510) colour = 255;
            else if (count > 255) colour = 127.5;
        
            imgData.data[i] = colour;
            imgData.data[i + 1] = colour;
            imgData.data[i + 2] = colour;
            imgData.data[i + 3] = 255;
          }
          ctx.putImageData(imgData, 0, 0);
        }
    };
      
}