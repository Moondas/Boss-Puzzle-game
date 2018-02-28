/**
 * This is a very simple Boss puzzle board game
 * 
 * Zero is always means an empty cell,
 * and it's default location is a bottom left corner
 */

var config = {
  board: document.getElementById("board"),
  layout: [],
  sideLength: 120,
  align: 0,
};

function createMixedBlocks() {
  var block;
  var lastInsertedId = -1;
  var layout = config.layout;
  var align = config.align;
  var sideLength = config.sideLength;

  while (layout.length < 9) {
    /* The zero is always the last one */
    block = layout.length != 8 ? Math.floor(Math.random() * 8) + 1 : 0;
    if (layout.indexOf(block) == -1) {
      lastInsertedId = layout.push(block) - 1;
      board.innerHTML +=
        '<div class="block" id="b-' + layout[lastInsertedId] + '" style="top: ' +
        (align + Math.floor(lastInsertedId / 3) * sideLength) + 'px; left: ' +
        (align + Math.floor(lastInsertedId % 3) * sideLength) + 'px">' + layout[lastInsertedId] +
        '</div>';
    }
  }
}

function isNeighbour(which) {
  var selected = document.getElementById(which); /* Which is want to move */
  var empty = document.getElementById("b-0");
  var posSelected = {
    x: parseInt(selected.style.left),
    y: parseInt(selected.style.top)
  };
  var posEmpty = {
    x: parseInt(empty.style.left),
    y: parseInt(empty.style.top)
  };
  var sideLength = config.sideLength;

  if (
    (posSelected.x == posEmpty.x && (posSelected.y + sideLength >= posEmpty.y) && (posSelected.y - sideLength <= posEmpty.y)) ||
    (posSelected.y == posEmpty.y && (posSelected.x + sideLength >= posEmpty.x) && (posSelected.x - sideLength <= posEmpty.x))
  ) {
    return true;
  }
}

function replacer(which) {
  var selected = document.getElementById(which); /* Which is want to move */
  var empty = document.getElementById("b-0");
  var posSelected = {
    x: selected.style.left,
    y: selected.style.top
  };
  var posEmpty = {
    x: empty.style.left,
    y: empty.style.top
  };

  if (isNeighbour(which)) {
    /* Because the shadow is... */
    setTimeout(function () {
      if (posSelected.x == posEmpty.x) {
        var selectedAfter = selected.nextSibling;
        board.insertBefore(selected, empty);
        board.insertBefore(empty, selectedAfter);
      }
    }, 300);

    if (posSelected.y == posEmpty.y) {
      if (posSelected.x > posEmpty.x) {
        board.insertBefore(empty, selected.nextSibling);
      }
      else {
        board.insertBefore(empty, selected);
      }
    }

    empty.style.top = selected.style.top;
    empty.style.left = selected.style.left;
    selected.style.top = posEmpty.y;
    selected.style.left = posEmpty.x;
  }
}

board.onclick = function (event) {
  event = event || window.event;
  var source = event.srcElement || event.target;
  if (source.id[2] > 0) {
    replacer(source.id);
  }
};

createMixedBlocks();