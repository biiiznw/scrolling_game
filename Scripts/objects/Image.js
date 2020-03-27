"use strict";
var objects;
(function (objects) {
    class Image extends objects.GameObject {
        constructor(imagePath = config.Game.ASSETS.getResult("placeholder"), x = 0, y = 0, isCentered = true) {
            super(imagePath, x, y, isCentered);
            this.Start();
        }
        _checkBounds() {
        }
        Start() {
            this.RandomPoint(false);
        }
        Update() {
        }
        Reset() {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
        }
        RandomPoint(w) {
            if (w == true) {
                this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
                this.y = -this.height;
            }
            return new objects.Vector2(this.x, this.y);
        }
    }
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=Image.js.map