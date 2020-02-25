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
        // PRIVATE METHODS
        Enemy.prototype._checkBounds = function () {
            if (this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
        };
        // PUBLIC METHODS
        Enemy.prototype.Start = function () {
            // this._dy = 3; //speed
            this.Reset();
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