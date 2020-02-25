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
        //private _collision: createjs.Sound;
        //private _background:createjs.Bitmap;
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            // initialization
            _this._player = new objects.Player;
            _this._level = new objects.Label;
            _this._ememies = new Array();
            _this._background = new objects.Background();
            _this._playBackSound = new createjs.PlayPropsConfig();
            _this._bullets = new Array();
            //this._collision = new createjs.Sound();
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        //initilize 
        Play.prototype.Start = function () {
            this._background = new objects.Background();
            this._level = new objects.Label("Level : 1", "15px", "Consolas", "#000000", 50, 20, true);
            //unlimited background sound
            this._playBackSound = new createjs.PlayPropsConfig().set({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
            createjs.Sound.play("playSound", this._playBackSound);
            //this._collision = new createjs.Sound;
            this._ememies = new Array();
            this._enemyNum = 2;
            //add enemies
            for (var count = 0; count < this._enemyNum; count++) {
                this._ememies[count] = new objects.Enemy();
            }
            // this._enemy2 = new objects.Enemy;
            // this.nextButton = new objects.Button(config.Game.ASSETS.getResult("nextButton"), 320, 400, true);
            this.Main();
        };
        Play.prototype.Update = function () {
            this._background.Update();
            this._player.Update();
            // this._ememies.forEach(enemy => {
            //     enemy.Update();
            //     //check collision player and enemies
            //     managers.Collision.AABBCheck(enemy, this._player);
            //     if(this._player.isColliding)
            //     {
            //         console.log("debug: Player collision");
            //         createjs.Sound.play("./Assets/sounds/crash.wav");
            //         config.Game.SCENE_STATE = scenes.State.END;
            //         //createjs.Sound.stop();
            //     }
            // });
            this.UpdatePosition();
            //this._enemy1.Update();
            // this._enemy2.Update();
        };
        Play.prototype.Main = function () {
            var _this = this;
            // adds background to the stage
            this.addChild(this._background);
            this.addChild(this._level);
            this._player = new objects.Player();
            this.addChild(this._player);
            this._ememies.forEach(function (enemy) {
                _this.addChild(enemy);
            });
            this._player.addEventListener("click", function () {
                console.log("click");
                var bullet = new objects.Button(config.Game.ASSETS.getResult("beam1"), _this._player.x, _this._player.y - 20, true);
                _this._bullets.push(bullet);
                _this.addChild(bullet);
                // this.Update();
            });
        }; //end public Main() method
        Play.prototype.UpdatePosition = function () {
            var _this = this;
            this._ememies.forEach(function (enemy) {
                enemy.Update();
                _this._bullets.forEach(function (value) {
                    value.y -= 5;
                    value.position.y -= 5;
                    if (value.y >= 470) {
                        _this.removeChild(value);
                    }
                    managers.Collision.AABBCheck(enemy, value);
                    if (value.isColliding) {
                        enemy.position = new objects.Vector2(-100, -200);
                        enemy.died = true;
                        _this.removeChild(enemy);
                        createjs.Sound.play("./Assets/sounds/crash.wav");
                    }
                });
                //check collision player and enemies
                managers.Collision.AABBCheck(enemy, _this._player);
                if (_this._player.isColliding) {
                    console.log("debug: Player collision");
                    createjs.Sound.play("./Assets/sounds/crash.wav");
                    config.Game.SCENE_STATE = scenes.State.END;
                    //createjs.Sound.stop();
                }
                // managers.Collision.AABBCheck(value, this._testButton);
                // if(this._testButton.isColliding) {
                //     this.removeChild(this._testButton);
                //     this._testButton.position = new objects.Vector2(-100,-200);
                // }
            });
        };
        return Play;
    }(objects.Scene)); //end class
    scenes.Play = Play;
})(scenes || (scenes = {})); //end module
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
//# sourceMappingURL=Play.js.map