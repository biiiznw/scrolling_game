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
    var Stage2 = /** @class */ (function (_super) {
        __extends(Stage2, _super);
        // private  _ocean:objects.Ocean;
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Stage2() {
            var _this = _super.call(this) || this;
            // initialization
            _this.endLabel = new objects.Label();
            _this._background = new objects.Background();
            _this._backButton = new objects.Button();
            // this._ocean = new objects.Ocean();
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Stage2.prototype.Start = function () {
            this._background = new objects.Background();
            this.endLabel = new objects.Label("Stage2", "80px", "Consolas", "#FFFFFF", 320, 200, true);
            //this._backButton = new objects.Button(config.Game.ASSETS.getResult("returnButton"), 320, 400, true);
            this.Main();
        };
        Stage2.prototype.Update = function () {
            // this._ocean.Update();
        };
        Stage2.prototype.Main = function () {
            // this.addChild(this._ocean);
            this.addChild(this._background);
            this.addChild(this.endLabel);
            // this.addChild(this._backButton);
            // this._backButton.on("click", function() {
            //     config.Game.SCENE_STATE = scenes.State.PLAY;
            //     createjs.Sound.stop();
            // });
        };
        return Stage2;
    }(objects.Scene));
    scenes.Stage2 = Stage2;
})(scenes || (scenes = {}));
//Update
// if (this._enemy1.y == 480)
// {
//     this._enemy1.y = 100;
// } else
// {
//     this._enemy1.y += 1;
// }
// if (this._enemy2.y == 480)
// {
//     this._enemy2.y = 50;
// } else
// {
//     this._enemy2.y += 2;
// }
// if (this._enemy3.y == 480)
// {
//     this._enemy3.y = 50;
// } else
// {
//     this._enemy3.y += 2.5;
// }
// this._enemy1.position = new objects.Vector2(this._enemy1.x, this._enemy1.y);
// this._enemy2.position = new objects.Vector2(this._enemy2.x, this._enemy2.y);
// this._enemy3.position = new objects.Vector2(this._enemy3.x, this._enemy3.y);
// console.log("player: " + this._player.x + " " +this._player.y);
// console.log(this._enemy3.x, this._enemy3.y);
// managers.Collision.AABBCheck(this._player, this._enemy1);
// managers.Collision.AABBCheck(this._player, this._enemy2);
//managers.Collision.AABBCheck(this._player, this._ememies[10]);
// main
// this._enemy1 = new objects.Enemy();
// this._enemy1.x = 150;
// this._enemy1.y = 100;
//this.addChild(this._enemy1);
// this._enemy2 = new objects.Enemy();
// this._enemy2.x = 280;
// this._enemy2.y = 50;
// this.addChild(this._enemy2);
// this._enemy3 = new objects.Enemy();
// this._enemy3.x = 450;
// this._enemy3.y = 70;
// this._enemy3.position = new objects.Vector2(this._enemy3.x, this._enemy3.y);
// this.addChild(this._enemy3);
//# sourceMappingURL=Stage2.js.map