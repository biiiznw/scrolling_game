"use strict";
var objects;
(function (objects) {
    class cloud extends objects.GameObject {
        constructor() {
            super(config.Game.ASSETS.getResult("cloud"));
            this._isActive = false;
            this.Start();
        }
        get Speed() {
            return this._speed;
        }
        set Speed(v) {
            this._speed = v;
        }
        _checkBounds() {
            if (this.x >= 4400 + this.width || this.x <= -150) {
                //console.log("cloud " + this.x);
                this.Reset();
            }
            if (this.y >= 200) {
                this._isActive = true;
            }
        }
        _move() {
            this.x -= this._dx;
            if (this._isActive == false) {
                this.y += this._speed;
            }
            else {
                this.y -= this._speed;
                if (this.y <= 140)
                    this._isActive = false;
            }
            this.position = new objects.Vector2(this.x, this.y);
        }
        Start() {
            this.Reset();
        }
        Update() {
            this._move();
            this._checkBounds();
        }
        Reset() {
            this.x = Math.floor((Math.random() * (4500 - this.width)) + this.halfWidth);
            this.y = -100;
            //this.velocity = new Vector2(this._horizontalSpeed, this._verticalSpeed);
            this._dx = Math.floor((Math.random() * 5) - 2);
            //this._dy = Math.floor((Math.random() * 4) -2);
            if (this._dx <= 0) {
                this.Reset();
            }
        }
    }
    objects.cloud = cloud;
})(objects || (objects = {}));
//# sourceMappingURL=cloud.js.map