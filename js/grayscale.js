var myCell = document.getElementsByTagName("img")
console.log(myCell.length)
for (const [_, eachImg] of Object.entries(myCell)){
  eachImg.onclick = switchGrayscale(eachImg)
}
   
function switchGrayscale(elmt) {
  if (typeof elmt !== 'undefined') {
      state = (elmt.src.indexOf("bw_") === -1) ? 'clr' : 'bw';
      (state === 'bw') ? elmt.src = elmt.src.replace('bw_','clr_') : elmt.src = elmt.src.replace('clr_','bw_');  
  }
  console.log(elmt)
  // $(this).attr("src", src);
}