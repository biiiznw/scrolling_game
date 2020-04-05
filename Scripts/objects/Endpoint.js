"use strict";
var objects;
(function (objects) {
    class Endpoint extends objects.GameObject {
        constructor(imagePath = config.Game.ASSETS.getResult("placeholder")) {
            super(imagePath);
            this.Start();
        }
        _checkBounds() {
        }
        Start() {
            this.alpha = 0;
            this.Reset();
        }
        Update() {
            if (config.Game.keyboardManager.moveRight)
                this.alpha = 1;
            this.Reset();
        }
        Reset() {
            this.x = 4500;
            this.x += config.Game.BACKGROUND;
            this.y = 200;
            this.position = new objects.Vector2(this.x, this.y);
        }
    }
    objects.Endpoint = Endpoint;
})(objects || (objects = {}));
//# sourceMappingURL=Endpoint.js.map