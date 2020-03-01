"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // CONSTRUCTOR
        function Enemy() {
            var _this = _super.call(this, (config.Game.ASSETS.getResult("enemy"))) || this;
            _this._died = false;
            _this._dy = 0; //speed
            _this._dx = 0;
            _this.canFire = true;
            _this.maxTime = 0;
            _this._enemybullets = new Array();
            _this._enemies = new Array();
            _this.Start();
            return _this;
        }
        Object.defineProperty(Enemy.prototype, "died", {
            // PRIVATE INSTANCE MEMBERS
            // PUBLIC PROPERTIES
            set: function (status) {
                this._died = status;
            },
            enumerable: true,
            configurable: true
        });
        Enemy.prototype.canShoot = function () {
            if (!this.isColliding) {
                if (this.canFire) {
                    this.canFire = false;
                    return true;
                }
            }
            return false;
        };
        //         // To start the loop
        // var mainLoopId = setInterval(function(){
        //     // Do your update stuff...
        //     move();
        // }, 40);
        // // To stop the loop
        // clearInterval(mainLoopId);`
        // PRIVATE METHODS
        Enemy.prototype._checkBounds = function () {
            if (this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }
            if (this.y >= 800 + this.height) {
                this.Reset();
            }
        };
        // PUBLIC METHODS
        Enemy.prototype.Start = function () {
            // this._dy = 3; //speed
            this.Reset();
            this.Main();
        };
        Enemy.prototype.Main = function () {
        };
        Enemy.prototype.Update = function () {
            if (!this._died) {
                this.Move();
                this._checkBounds();
            }
        };
        Enemy.prototype.Reset = function () {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
            this._dx = Math.floor((Math.random() * 4) - 2);
            this._dy = Math.floor((Math.random() * 5) + 5);
            this.canFire = true;
        };
        Enemy.prototype.Move = function () {
            this.x += this._dx;
            this.y += this._dy;
            this.position = new objects.Vector2(this.x, this.y);
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=Enemy.js.map