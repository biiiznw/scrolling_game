"use strict";
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
            // this._ocean = new objects.Ocean();
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this._background = new objects.Background();
            this.endLabel = new objects.Label("Game Over", "80px", "Consolas", "#FFFFFF", 320, 200, true);
            this._backButton = new objects.Button(config.Game.ASSETS.getResult("returnButton"), 320, 400, true);
            this.Main();
        }
        Update() {
            // this._ocean.Update();
        }
        Main() {
            // this.addChild(this._ocean);
            this.addChild(this._background);
            this.addChild(this.endLabel);
            this.addChild(this._backButton);
            this._backButton.on("click", function () {
                managers.Collision.live = 3;
                managers.Collision.count = 0;
                config.Game.SCENE_STATE = scenes.State.PLAY;
                createjs.Sound.stop();
            });
        }
    }
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map