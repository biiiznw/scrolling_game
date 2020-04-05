"use strict";
var objects;
(function (objects) {
    class Background extends objects.GameObject {
        //constructor
        constructor(imagePath = config.Game.ASSETS.getResult("placeholder")) {
            super(imagePath);
            this._startMove = 200;
            this.Start();
        }
        _checkBounds() {
            if (this.x >= 4400) {
                console.log("end");
            }
        }
        _move() {
            if (config.Game.SCENE_STATE != scenes.State.START) {
                config.Game.USERACTIVE;
                this.x = -(config.Game.USERACTIVE);
            }
            config.Game.BACKGROUND = this.x;
        }
        //public method
        Start() {
            this.Reset();
        }
        Update() {
            this._move();
            this._checkBounds();
        }
        Reset() {
            this.position.x = -4480;
        }
    }
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=Background.js.map