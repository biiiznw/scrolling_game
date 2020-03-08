"use strict";
var scenes;
(function (scenes) {
    class FinalStage extends objects.Scene {
        constructor() {
            super();
            this._background = new objects.Background();
            this.Start();
        }
        Start() {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
        }
        Update() {
            this._background.Update();
        }
        Main() {
            this.addChild(this._background);
        }
    }
    scenes.FinalStage = FinalStage;
})(scenes || (scenes = {}));
//# sourceMappingURL=FinalStage.js.map