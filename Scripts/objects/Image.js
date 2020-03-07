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
        }
        Update() {
        }
        Reset() {
        }
    }
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=Image.js.map