"use strict";
/**
 * AUTHOR: YERIN AN
 * STUDENT NUMBER: 300947515
 * LAST MODIFIED BY: YERIN AN
 * DATE LAST MODIFIED: APRIL 05
 * PROGRAM DESCRIPTION: SCROLLING GAME
 * REVISON HISTORY: VERSION 02
 */
var scenes;
(function (scenes) {
    class End extends objects.Scene {
        // private  _ocean:objects.Ocean;
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            // initialization
            this.endLabel = new objects.Label();
            this._background = new objects.Background();
            this._backButton = new objects.Button();
            this._scoreBoard = new managers.ScoreBoard;
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this._background = new objects.Background(config.Game.ASSETS.getResult("back"));
            if (config.Game.STATUS == true) {
                this.endLabel = new objects.Label("SEE YOU AGAIN", "80px", "Impact, Charcoal, sans-serif", "#000000", 320, 150, true);
            }
            else if (config.Game.ENDSCENE == true) {
                this.endLabel = new objects.Label("YOU ARE HERO", "80px", "Impact, Charcoal, sans-serif", "#000000", 320, 150, true);
                config.Game.ENDSCENE = false;
            }
            else {
                this.endLabel = new objects.Label("MISSION FAIL", "80px", "Impact, Charcoal, sans-serif", "#000000", 320, 150, true);
            }
            this._backButton = new objects.Button(config.Game.ASSETS.getResult("returnButton"), 320, 300, true);
            //this._backButton = new objects.Button("startButton", 320, 300, true);
            managers.Collision._checkHighScore;
            this._scoreBoard = new managers.ScoreBoard();
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this.Main();
        }
        Update() {
            this._background.Update();
        }
        Main() {
            this.addChild(this._background);
            this.addChild(this.endLabel);
            this.addChild(this._backButton);
            this._backButton.on("click", function () {
                config.Game.SCORE_BOARD.Lives = 3;
                managers.Collision.count = 0;
                config.Game.SCENE_STATE = scenes.State.STAGE01;
                config.Game.SCORE_BOARD.Score = 0;
                //config.Game.ANTIBOOMITEM = 0;
                //User.point = 0;
                createjs.Sound.stop();
            });
            this.addChild(this._scoreBoard.HighScoreLabel);
        }
    }
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map