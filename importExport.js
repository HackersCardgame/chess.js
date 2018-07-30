function importFromURL() {
  if(window.location.hash=="") return;
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
    {
      if(decodeURIComponent(window.location.hash).replace("#", "").substring(0+i*8+j,1+i*8+j)=="_")
        document.getElementById("f"+i+j).innerHTML="";
      else
      //console.log(decodeURIComponent(window.location.hash).replace("#", "").substring(2*i*8+j,1+i*8+j));
        document.getElementById("f"+i+j).innerHTML=decodeURIComponent(window.location.hash).replace("#", "").substring(0+i*8+j,1+i*8+j);
    }
    getBoardFromHTML();
}

function exportToURL() {
  window.location.hash="";
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      if(document.getElementById("f"+i+j).innerHTML=="")
        window.location.hash+="_";
      else
        window.location.hash+=document.getElementById("f"+i+j).innerHTML;
}
