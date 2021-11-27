
    var totalImages = length
    var rowLength = 12
    var img;
    var imgArray = new Array();   

    for(var j=0; j < totalImages; j++){
        loadImage(j);
    }

    var imgMove = getImage();

    createTable(imgArray, imgMove);
    makeGrayscale();
    moveLevelOnclick();
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
        img.src = `${name}/bw_${j}.png`;
        // img.setAttribute("class", "col-md-1")
    }

    function createTable(tableData, imgMove) {
        var prevState = document.createElement('table');
        prevState.innerHTML = localStorage.getItem('myTable'+localstorageName);
        if (prevState.innerHTML.length < 20){
            var table = document.createElement('table');
            // for screenshot purposes add #id=table0
            // table.style.clear = "both";
            table.setAttribute("id", "table0");
            // for localstorage purposes add .class=table1
            table.setAttribute("class", "table1");
            table.classList.add("float-left");
            table.style.backgroundColor = "black";
            // table.style.border = "4px solid black";
            table.style.borderRadius = "5%";

            var tableBody = document.createElement('tbody');
            var row = document.createElement('tr');
            var rowMove = document.createElement('tr');

            var cnt = 0

            tableData.forEach(function(rowData) {
                var cell = document.createElement('td');
                rowData.classList.add("img1");
                rowData.style.border = "4px solid black";
                rowData.style.borderRadius = "30%";
                rowData.style.backgroundColor = "white";
                cell.appendChild(rowData);
                row.appendChild(cell);

                var cellMove = document.createElement('td');
                imgMove = getImage();
                imgMove.classList.add("img2");
                imgMove.style.position = "relative";
                imgMove.style.top = "-6px";
                imgMove.style.left = "6px";
                imgMove.style.textAlign = 'center';
                imgMove.style.border = "4px solid black";
                imgMove.style.backgroundColor = "white";

                // imgMove.style.borderRadius = "5%";
                cellMove.appendChild(imgMove);
                rowMove.appendChild(cellMove);

                cnt++
                if (cnt % rowLength == 0 || (cnt == totalImages)){
                    tableBody.appendChild(row);
                    row = document.createElement('tr');
                    tableBody.appendChild(rowMove);
                    rowMove = document.createElement('tr');
                }
            });
        
            table.appendChild(tableBody);
            container = document.getElementsByClassName("container")[0];
            container.insertBefore(table, container.firstChild);
            // container.appendChild(table);
            localStorage.setItem("myTable"+localstorageName, table.outerHTML);
        }
        else{
            var myTable = document.createElement('table');
            myTable.setAttribute("id", "table0");
            myTable.setAttribute("class", "table1");
            myTable.classList.add("float-left");
            myTable.style.backgroundColor = "black";
            // myTable.style.border = "4px solid black";   
            myTable.style.borderRadius = "5%";

            myTable.innerHTML = localStorage.getItem("myTable"+localstorageName)
            container = document.getElementsByClassName("container")[0];
            container.insertBefore(myTable, container.firstChild);
            // container.appendChild(myTable);
        }
    }

    // function changeTableClass() {
    //     var myCell = document.getElementsByTagName("img")
    //     for (const [_, eachImg] of Object.entries(myCell)){
    //         eachImg.classList.add("img1");
    //     }
    // }

    function getImage(){
        var ratio = window.devicePixelRatio || 1;
        var w = screen.width * ratio;
        var imgMove = new Image();
        if (w < 1200){
            img.width = 100;
        }
        else {
            img.width = w / 13;
        }
        imgMove.width = img.width * 0.9;
        imgMove.height = imgMove.width * 0.25
        imgMove.src = initPath + "moveLevels/a0.png";
        // imgMove.onclick = function () {increaseMoveLevel(imgMove)}
        return imgMove
    }

    function makeGrayscale() {
        var myCell = document.getElementsByClassName("img1")
        for (const [_, eachImg] of Object.entries(myCell)){
            eachImg.onclick = function () {switchGrayscale(eachImg)}
        }
    }

    function moveLevelOnclick(){
        var myCell = document.getElementsByClassName("img2")
        for (const [_, eachImg] of Object.entries(myCell)){
            eachImg.onclick = function () {increaseMoveLevel(eachImg)}
        }
    }

    function switchGrayscale(elmt) {
        if (typeof elmt !== 'undefined') {
            if (!(elmt.src.indexOf("bw_") === -1)) {state = 'bw';}
            else if (!(elmt.src.indexOf("clr_") === -1)) {state = 'clr';}
            else if (!(elmt.src.indexOf("ex_") === -1)) { state = 'ex';}
            if (state === 'bw') {elmt.src = elmt.src.replace('bw_','clr_')}
            else if (state === 'ex') {elmt.src = elmt.src.replace('ex_','bw_')}
            else if (state === 'clr') {
                prevSource = elmt.src.replace("clr_", "ex_")
                elmt.onerror = function() { elmt.src = elmt.src.replace("ex_", "bw_")}
                elmt.src = elmt.src.replace("clr_", "ex_")
            }
        }   
        else{
            console.log("undefined")
        }
      }

    function increaseMoveLevel(elmt){
        var initialPath = elmt.src.split('.png')[0];
        var moveLevel = initialPath.slice(-1);
        newMoveLevel = parseInt(moveLevel) + 1;
        if (newMoveLevel == 6){newMoveLevel = 0};
        moveLevel = String(moveLevel) + ".png"
        newMoveLevel = String(newMoveLevel) + ".png"
        elmt.src = elmt.src.replace(moveLevel, newMoveLevel)
    }

}