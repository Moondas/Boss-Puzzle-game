board = document.getElementById("board");
layout = [1, 2, 3, 4, 5, 6, 7, 8, 0]; /* Don't remove zero */
sideLength = 120; /* Block's side size */
align = 0;

board.onclick = function (event) {
  event = event || window.event;
  var source = event.srcElement || event.target;
  if (source.id[2] > 0) {
    replacer(source.id);
  }
};

function hasABlocks(num) {
  return layout.indexOf(num) > -1;
}

function randomizeBlocks() {
  var rand;
  layout = [];
  while (layout.length < 8) {
    rand = Math.floor(Math.random() * 8) + 1;
    if (!hasABlocks(rand)) {
      layout.push(rand);
    }
  }
  layout.push(0); /* The zero is always the last one */
  console.log(layout);
}

function renderBlocks() {
  board.innerHTML = "";

  for (var i = 0; i < layout.length; i++) { /* Fill the board */
    board.innerHTML +=
      '<div class="block" id="b-' + layout[i] + '" style="top: ' + 
        (align + Math.floor(i / 3) * sideLength) + 'px; left: ' +
        (align + Math.floor(i % 3) * sideLength) + 'px">' + layout[i] +
      '</div>';
  }
}

function isNeighbour(which) {
  var active = document.getElementById(which); /* Which is want to move */
  var block0 = document.getElementById("b-0"); /* 0 */
  var posActive = { x: parseInt(active.style.left), y: parseInt(active.style.top) };
  var posBlock0 = { x: parseInt(block0.style.left), y: parseInt(block0.style.top) };

  if (
    (posActive.x == posBlock0.x && (posActive.y + sideLength >= posBlock0.y) && (posActive.y - sideLength <= posBlock0.y)) ||
    (posActive.y == posBlock0.y && (posActive.x + sideLength >= posBlock0.x) && (posActive.x - sideLength <= posBlock0.x))
  ) {
    return true;
  }
}

function replacer(which) {
  var active = document.getElementById(which); /* Which is want to move */
  var block0 = document.getElementById("b-0"); /* 0 */
  var posActive = { x: parseInt(active.style.left), y: parseInt(active.style.top) };
  var posBlock0 = { x: parseInt(block0.style.left), y: parseInt(block0.style.top) };
  var tmp = [ block0.style.top, block0.style.left ]
  var tmpO;

  if (isNeighbour(which)) {
    /* Because the shadow is... */
    setTimeout(function () {
      if (posActive.x == posBlock0.x) {
        tmpO = active.nextSibling;
        board.insertBefore(active, block0);
        board.insertBefore(block0, tmpO);
      }
    }, 300);

    if (posActive.y == posBlock0.y) {
      if (posActive.x > posBlock0.x) {
        board.insertBefore(block0, active.nextSibling);
      }
      else {
        board.insertBefore(block0, active);
      }
    }

    block0.style.top = active.style.top;
    block0.style.left = active.style.left;
    active.style.top = tmp[0];
    active.style.left = tmp[1];
  }
}

randomizeBlocks();
renderBlocks();