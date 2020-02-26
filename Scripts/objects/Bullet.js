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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // constructor
        function Bullet(imagePath, x, y, isCentered) {
            if (imagePath === void 0) { imagePath = config.Game.ASSETS.getResult("beam2"); }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            // private _fireRate:number=0;
            // private _fireTimer:number=0;
            _this._player = objects.Player;
            _this._enemy = objects.Enemy;
            _this.Start();
            return _this;
        }
        Bullet.prototype._checkBounds = function () {
        };
        Bullet.prototype.Start = function () {
            //this._verticalSpeed = -5;
            //this.velocity = new Vector2(0, this._verticalSpeed);
            //this.Direction();
        };
        Bullet.prototype._move = function () {
            //this.position = Vector2.add(this.position, this.velocity);
        };
        Bullet.prototype.Update = function () {
            //this._move();
        };
        Bullet.prototype.Reset = function () {
        };
        Bullet.prototype.Direction = function () {
            // if(this._enemy)
            // {
            //     console.log("is enemy");
            //     this.position = Vector2.add(this.position, this.velocity);
            // }
            // if(this._player)
            // {
            //     this.position = Vector2.add(this.position, this.velocity);
            //     console.log("is not enemy");
            // }
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map