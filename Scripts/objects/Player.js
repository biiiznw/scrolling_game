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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTOR
        function Player() {
            var _this = _super.call(this, config.Game.ASSETS.getResult("player"), 0, 0, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this._died = false;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "died", {
            // PUBLIC PROPERTIES
            set: function (status) {
                this._died = status;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
            // left boundary
            if (this.position.x <= this.halfWidth) {
                this.position = new objects.Vector2(this.halfWidth, this.position.y);
            }
            // right boundary
            if (this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth) {
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }
        };
        Player.prototype._move = function () {
            var newPositionX = util.Math.Lerp(this.position.x, this.stage.mouseX, 0.05);
            this.position = new objects.Vector2(newPositionX, this._verticalPosition);
        };
        // PUBLIC METHODS
        Player.prototype.Start = function () {
            this._verticalPosition = 430; // locked to the bottom of the screen
        };
        Player.prototype.Update = function () {
            this._move();
            this._checkBounds();
            // let mouseX = config.Game.STAGE.mouseX;
            // let mouseY = config.Game.STAGE.mouseY;
            // this.position = new Vector2(mouseX, mouseY);
            //this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
        };
        Player.prototype.Reset = function () {
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map