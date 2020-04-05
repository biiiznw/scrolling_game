"use strict";
var config;
(function (config) {
    class Game {
    }
    Game.SCREEN_WIDTH = 5120;
    Game.SCREEN_HEIGHT = 400;
    Game.LIVES = 3;
    Game.SCORE = 0;
    Game.HIGH_SCORE = 0;
    Game.ANTIBOOMITEM = 0;
    Game.ENDSCENE = false;
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=game.js.map