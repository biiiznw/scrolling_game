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
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        //private _background:createjs.Bitmap;
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            // initialization
            _this._player = new objects.Player;
            _this._enemy1 = new objects.Enemy;
            _this._enemy2 = new objects.Enemy;
            _this._enemy3 = new objects.Enemy;
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        //initilize 
        Play.prototype.Start = function () {
            this.Main();
        };
        Play.prototype.Update = function () {
            if (this._enemy1.y == 480) {
                this._enemy1.y = 100;
            }
            else {
                this._enemy1.y += 1;
            }
            if (this._enemy2.y == 480) {
                this._enemy2.y = 50;
            }
            else {
                this._enemy2.y += 2;
            }
            if (this._enemy3.y == 480) {
                this._enemy3.y = 50;
            }
            else {
                this._enemy3.y += 2.5;
            }
            this._enemy1.position = new objects.Vector2(this._enemy1.x, this._enemy1.y);
            this._enemy2.position = new objects.Vector2(this._enemy2.x, this._enemy2.y);
            this._enemy3.position = new objects.Vector2(this._enemy3.x, this._enemy3.y);
            console.log("player: " + this._player.x + " " + this._player.y);
            console.log(this._enemy3.x, this._enemy3.y);
            managers.Collision.AABBCheck(this._player, this._enemy1);
            managers.Collision.AABBCheck(this._player, this._enemy2);
            managers.Collision.AABBCheck(this._player, this._enemy3);
            this._player.Update();
        };
        Play.prototype.Main = function () {
            this._player = new objects.Player();
            this.addChild(this._player);
            this._enemy1 = new objects.Enemy();
            this._enemy1.x = 150;
            this._enemy1.y = 100;
            this.addChild(this._enemy1);
            this._enemy2 = new objects.Enemy();
            this._enemy2.x = 280;
            this._enemy2.y = 50;
            this.addChild(this._enemy2);
            this._enemy3 = new objects.Enemy();
            this._enemy3.x = 450;
            this._enemy3.y = 70;
            this._enemy3.position = new objects.Vector2(this._enemy3.x, this._enemy3.y);
            this.addChild(this._enemy3);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map