"use strict";
/**
 * AUTHOR: YERIN AN
 * STUDENT NUMBER: 300947515
 * LAST MODIFIED BY: YERIN AN
 * DATE LAST MODIFIED: APRIL 05
 * PROGRAM DESCRIPTION: SCROLLING GAME
 * REVISON HISTORY: VERSION 02
 */
var objects;
(function (objects) {
    class Alien extends objects.GameObject {
        // CONSTRUCTOR
        constructor(imagePath = config.Game.ASSETS.getResult("placeholder")) {
            super(imagePath);
            this._died = false;
            this._limitBottom = 305;
            this._dy = 0; //speed
            this._dx = 0;
            this._isActive = false;
            this.Start();
        }
        get Speed() {
            return this._speed;
        }
        set Speed(v) {
            this._speed = v;
        }
        //PUBLIC PROPERTIES
        set died(status) {
            this._died = status;
        }
        _checkBounds() {
            //console.log("hh" + (config.Game.USERACTIVE + 200))
            if (this.x >= 4300 - this.halfWidth || this.x < -30) {
                if (this.x < config.Game.USERACTIVE + 200) {
                    this.Reset();
                    console.log("Alien " + this.x);
                }
            }
            if (this.position.x >= 4300) {
                this._isActive = true;
                //console.log("end");
            }
            // if(this.x >= config.Game.SCREEN_WIDTH + this.width)
            // {
            //     this.Reset();
            // }
        }
        Move() {
            if (this._isActive == false) {
                this.x -= this._speed;
                //this.x -= this._dx;
            }
            else {
                this.x += this._speed;
                //this.x += this._dx;
                if (this.x <= 250)
                    this._isActive = false;
            }
            //this.x -= this._dx;
            this.y = this._limitBottom;
            this.position = new objects.Vector2(this.x, this.y);
        }
        Start() {
            this.scaleX = -1;
            this.Reset();
        }
        Update() {
            if (!this._died) {
                this.Move();
                this._checkBounds();
            }
        }
        Reset() {
            this.x = Math.floor((Math.random() * (4500 - this.width)) + this.halfWidth);
            this.y = this._limitBottom;
            this._dx = Math.floor((Math.random() * 4) - 2);
            if (this._dx <= 0) {
                this.Reset();
            }
            if (this.x < 640) {
                this.x = this.x + 400;
            }
        }
        static RandomRange(min, max) {
            return Math.random() * (max - min + 1) + min;
        }
    }
    objects.Alien = Alien;
})(objects || (objects = {}));
//# sourceMappingURL=Alien.js.map