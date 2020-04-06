"use strict";
var objects;
(function (objects) {
    class Endpoint extends objects.GameObject {
        constructor(imagePath = config.Game.ASSETS.getResult("placeholder")) {
            super(imagePath);
            this.Start();
        }
        get Dy() {
            return this._dy;
        }
        set Dy(v) {
            this._dy = v;
        }
        get Dx() {
            return this._dx;
        }
        set Dx(v) {
            this._dx = v;
        }
        _checkBounds() {
        }
        Start() {
            this.alpha = 0;
            this.scaleX = -1;
            this.Reset();
        }
        Update() {
            if (config.Game.keyboardManager.moveRight)
                this.alpha = 1;
            this.Reset();
        }
        Reset() {
            this.x = this._dx;
            this.x += config.Game.BACKGROUND;
            this.y = this._dy;
            this.position = new objects.Vector2(this.x, this.y);
        }
    }
    objects.Endpoint = Endpoint;
})(objects || (objects = {}));
//# sourceMappingURL=Endpoint.js.map