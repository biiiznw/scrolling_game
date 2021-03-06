"use strict";
var scenes;
(function (scenes) {
    class Start extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            // initialization
            this._startButton = new objects.Button();
            this._background = new objects.Background();
            // this._startLabel = new objects.Label();
            // this._user = new objects.User();
            this._firstSceen = new objects.Image();
            this._tutorialButton = new objects.Button();
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            //this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
            this._firstSceen = new objects.Image(config.Game.ASSETS.getResult("firstScreen"), 320, 200, true);
            this._startButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 320, 220, true);
            //this._startLabel = new objects.Label("SEE YOU AGAIN", "80px","Impact, Charcoal, sans-serif", "#142950", 320, 150, true);
            this._background = new objects.Background(config.Game.ASSETS.getResult("back"));
            this._tutorialButton = new objects.Button(config.Game.ASSETS.getResult("tutorial"), 320, 300, true);
            createjs.Sound.play("startSound");
            this.Main();
        }
        Update() {
            this._background.Update();
        }
        Main() {
            this.addChild(this._background);
            //this.addChild(this._startLabel);
            this.addChild(this._firstSceen);
            this.addChild(this._startButton);
            this.addChild(this._tutorialButton);
            this._startButton.on("click", function () {
                //changed it for the testing
                config.Game.SCENE_STATE = scenes.State.STAGE01;
                createjs.Sound.stop();
            });
            this._tutorialButton.on("click", function () {
                //changed it for the testing
                config.Game.SCENE_STATE = scenes.State.TUTORIAL;
                createjs.Sound.stop();
            });
        }
    }
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map