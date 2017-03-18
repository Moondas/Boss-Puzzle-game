board = document.getElementById("board");
layout = [1, 2, 3, 4, 5, 6, 7, 8, 0]; /* Don't remove zero */
w = 120; /* Block's side size */
align = 0;

board.onclick = function (e) {
  e = e || event || window.event;
  var src = e.srcElement || e.target,
      id = src.id;
  if (id[2]>0) replacer(id);
};

function hasABlocks(num) {
  for (var i = 0; i < layout.length; i++) {
    if (layout[i] == num) return true;
  }
  
  return false;
}

function mixBlocks() {
  var rnd;
  layout = [];
  /* alert(layout.length);*/
  while (layout.length < 8) {
    rnd = Math.floor(Math.random()*8)+1;
    if (!hasABlocks(rnd)) layout.push(rnd);
  }
  layout.push(0); /* The zero is always the last one */
}

function makeBlocks() {
  board.innerHTML = "";
  
  for (var i = 0; i < layout.length; i++) { /* Fill the board */
    board.innerHTML += '<div class="block" id="b-' + layout[i] + '" style="top: ' + (align + Math.floor(i/3)*w) + 'px; left: ' + (align + Math.floor(i%3)*w) + 'px">' + layout[i] + '</div>';
  }
}

function isNeighbour(which){
  var a = document.getElementById(which), /* Which is want to move */
      n = document.getElementById("b-0"), /* 0 */
      posA = {x:parseInt(a.style.left), y:parseInt(a.style.top)},
      posN = {x:parseInt(n.style.left), y:parseInt(n.style.top)};
  
  if ( (posA.x == posN.x && (posA.y + w >= posN.y) && (posA.y - w <= posN.y)) || (posA.y == posN.y && (posA.x + w >= posN.x) && (posA.x - w <= posN.x))) {
    return true;
  }
}

function replacer(which) {
  var a = document.getElementById(which), /* Which is want to move */
      n = document.getElementById("b-0"), /* 0 */
      posA = {x:parseInt(a.style.left), y:parseInt(a.style.top)},
      posN = {x:parseInt(n.style.left), y:parseInt(n.style.top)},
      tmp = [n.style.top, n.style.left], tmpO;
  
  if (isNeighbour(which)) {
    /* Because the shadow is... */
    setTimeout(function() {
    if (posA.x == posN.x) {
        tmpO = a.nextSibling;
        board.insertBefore(a, n);
        board.insertBefore(n, tmpO);
    }
    }, 300);
    
    if (posA.y == posN.y) {
       if (posA.x > posN.x) board.insertBefore(n,a.nextSibling);
        else board.insertBefore(n,a);
    }
        
    /*if (posA.y < posN.y) a.style.zIndex++;*/
    
    /* alert("I like to move it!"); */
    
    n.style.top = a.style.top;
    n.style.left = a.style.left;
    a.style.top = tmp[0];
    a.style.left = tmp[1];
    
    /*if (posA.y > posN.y && a.style.zIndex > 0) {
      a.style.zIndex--;
    }*/
  }
}

mixBlocks();

makeBlocks();