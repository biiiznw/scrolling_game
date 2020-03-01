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
            //private _keyPosition:Vector2 = new Vector2(346, 0);
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
            //this.position = new Vector2(this._keyPosition.x, this._verticalPosition);
            if (config.Game.keyboardManager.moveLeft) {
                this.x -= 5;
            }
            if (config.Game.keyboardManager.moveRight) {
                this.x += 5;
            }
            this.position = new objects.Vector2(this.x, this._verticalPosition);
        };
        // private _keyboardInput(event: KeyboardEvent) {
        //     // PRESS LEFT ARROW OR 'A' KEY
        //     if (event.keyCode == 37 || event.keyCode == 65) {
        //        this._keyPosition.x -= 5;
        //     }
        //     // PRESS RIGHT ARROW OR 'D' KEY
        //     else if (event.keyCode == 39 || event.keyCode == 68 ) {
        //         this._keyPosition.x += 5;
        //     }
        //  }
        // PUBLIC METHODS
        Player.prototype.Start = function () {
            // this.x = 320;
            // this.y = 430;
            this._verticalPosition = 760;
        };
        Player.prototype.Update = function () {
            this._move();
            this._checkBounds();
            // this._keyboardInput();
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