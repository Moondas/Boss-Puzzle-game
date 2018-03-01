/**
 * This is a very simple Boss puzzle board game
 * 
 * Zero is always means an empty cell,
 * and it's default location is a bottom left corner
 */

var game = {
  config: {
    sideLength: 120,
    align: 0,
  },
  board: document.getElementById("board"),
  selected: null,
  empty: null,
  posSelected: {
    x: "",
    y: ""
  },
  posEmpty: {
    x: "",
    y: ""
  },
  init: function() {
    board.onclick = function(event) {
      event = event || window.event;
      game.selected = event.srcElement || event.target;
      if (game.selected.id[2] > 0) {
        game.empty = document.querySelector("#b-0");
        game.posSelected.x = parseInt(game.selected.style.left);
        game.posSelected.y = parseInt(game.selected.style.top);
        game.posEmpty.x = parseInt(game.empty.style.left);
        game.posEmpty.y = parseInt(game.empty.style.top);

        game.replacer();
      }
    };
    game.createMixedBlocks();
  },
  createMixedBlocks: function() {
    var block;
    var lastInsertedId = -1;
    var layout = [];

    while (layout.length < 9) {
      /* The zero is always the last one */
      block = layout.length != 8 ? Math.floor(Math.random() * 8) + 1 : 0;
      if (layout.indexOf(block) == -1) {
        lastInsertedId = layout.push(block) - 1;
        game.board.innerHTML +=
          '<div class="block" id="b-' + layout[lastInsertedId] + '" style="top: ' +
          (game.config.align + Math.floor(lastInsertedId / 3) * game.config.sideLength) + 'px; left: ' +
          (game.config.align + Math.floor(lastInsertedId % 3) * game.config.sideLength) + 'px">' + layout[lastInsertedId] +
          '</div>';
      }
    }
  },
  isInterchangeable: function() {
    if (
      (game.posSelected.x == game.posEmpty.x && (game.posSelected.y + game.config.sideLength >= game.posEmpty.y) && (game.posSelected.y - game.config.sideLength <= game.posEmpty.y)) ||
      (game.posSelected.y == game.posEmpty.y && (game.posSelected.x + game.config.sideLength >= game.posEmpty.x) && (game.posSelected.x - game.config.sideLength <= game.posEmpty.x))
    ) {
      return true;
    }
    return false;
  },
  replacer: function() {
    if (game.isInterchangeable()) {
      if (game.posSelected.x == game.posEmpty.x) {
        /* Because the shadow is... */
        setTimeout(function() {
          var selectedAfter = game.selected.nextSibling;
          game.board.insertBefore(game.selected, game.empty);
          game.board.insertBefore(game.empty, game.selectedAfter);
        }, 300);
      }
      if (game.posSelected.y == game.posEmpty.y) {
        if (game.posSelected.x > game.posEmpty.x) {
          game.board.insertBefore(game.empty, game.selected.nextSibling);
        } else {
          game.board.insertBefore(game.empty, game.selected);
        }
      }
      game.empty.style.top = game.selected.style.top;
      game.empty.style.left = game.selected.style.left;
      game.selected.style.top = game.posEmpty.y + "px";
      game.selected.style.left = game.posEmpty.x + "px";
    }
  }
}
game.init();