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
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this._numOfEnemy = 0;
            _this._bulletNum = 20;
            // initialization
            _this._player = new objects.Player;
            _this._level = new objects.Label;
            _this._ememies = new Array();
            _this._background = new objects.Background();
            _this._playBackSound = new createjs.PlayPropsConfig();
            _this._bullets = new Array();
            _this._enemybullets = new Array();
            _this._numOfEnemy;
            _this._bulletNum = 20;
            _this._bulletNumLabel = new objects.Label();
            _this._point = 0;
            _this._pointLabel = new objects.Label();
            _this._liveLabel = new objects.Label();
            _this.bullet = new objects.Bullet;
            document.addEventListener('keydown', _this.Show.bind(_this), false);
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        //initilize 
        Play.prototype.Start = function () {
            this._background = new objects.Background();
            this._level = new objects.Label("Level : 1", "15px", "Consolas", "#000000", 50, 20, true);
            //Set Number of Enemies
            this._numOfEnemy = 5;
            //unlimited background sound
            this._playBackSound = new createjs.PlayPropsConfig().set({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
            createjs.Sound.play("playSound", this._playBackSound);
            this._ememies = new Array();
            this._enemybullets = new Array();
            this._bulletNumLabel = new objects.Label("Bullet: 20", "20px", "Impact, Charcoal, sans-serif", "#fff", 580, 20, true);
            this._pointLabel = new objects.Label("Scores: 0", "20px", "Impact, Charcoal, sans-serif", "#ffffff", 480, 20, true);
            this._liveLabel = new objects.Label("Live: 3", "20px", "Impact, Charcoal, sans-serif", "#fff", 40, 20, true);
            //this.bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam1"), this._player.x, this._player.y-20, true);
            // this._enemyNum =4;
            //Add ememies
            this.AddEnemies(this._numOfEnemy);
            //this.AddEnemies(10, this._enemybullets);
            this.Main();
        };
        Play.prototype.AddEnemies = function (number) {
            var _this = this;
            var createEnemy = setInterval(function () {
                if (_this._ememies.length < number) {
                    var enemy = new objects.Enemy();
                    _this._ememies.push(enemy);
                    _this.addChild(enemy);
                    console.log("CREATE");
                    _this.FireGun(enemy, _this._enemybullets);
                }
                else {
                    clearInterval(createEnemy);
                }
            }, 1000);
        };
        Play.prototype.Show = function (e) {
            if (e.keyCode == config.Keys.FIREGUN) {
                this._bulletNum--;
                var bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam1"), this._player.x, this._player.y - 20, true);
                this._bullets.push(bullet);
                console.log("FIRE GUN");
                this.addChild(bullet);
            }
        };
        // public AddEnemies(EnemyNum:number):void{
        //     for(let count = 0; count < EnemyNum; count++)
        //     {
        //         this._ememies[count] = new objects.Enemy();
        //     }
        // }
        Play.prototype.Update = function () {
            this._background.Update();
            this._player.Update();
            //this.updateBullet();
            this.UpdatePosition();
            this.UpdateWinOrLoseCondition();
        };
        Play.prototype.Main = function () {
            // adds background to the stage
            this.addChild(this._background);
            this.addChild(this._level);
            //this._player = new objects.Player();
            this.addChild(this._player);
            this.addChild(this._bulletNumLabel);
            this.addChild(this._pointLabel);
            this.addChild(this._liveLabel);
            this.bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam1"), this._player.x, this._player.y - 20, true);
            //this._player.on('event', );
            // this._player.addEventListener("tick", ()=>{
            //     if(config.Game.keyboardManager.fireGun)
            //     {
            //         console.log("click");
            //         this._bulletNum--;
            //         let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam1"), this._player.x, this._player.y-20, true);
            //         this._bullets.push(bullet);
            //         console.log(this._bullets.length);
            //         this.addChild(bullet);
            //         //this.Update();
            //     }
            // }, false);
        }; //end public Main() method
        Play.prototype.BulletSpeed = function (eBullet, eSpeed, eMove, pick) {
            if (pick === void 0) { pick = false; }
            //enemy direction
            if (pick == true) {
                eBullet.y += eSpeed;
                eBullet.position.y += eMove;
                if (eBullet.y >= 800) {
                    this.removeChild(eBullet);
                }
            }
            //player direction
            else {
                eBullet.y -= eSpeed;
                eBullet.position.y -= eMove;
                if (eBullet.y <= 0) {
                    this.removeChild(eBullet);
                }
            }
        };
        Play.prototype.UpdatePosition = function () {
            var _this = this;
            this._ememies.forEach(function (enemy) {
                _this.addChild(enemy);
                enemy.Update();
                enemy.addEventListener("tick", function () {
                    if (enemy.canShoot()) {
                        var bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam2"), enemy.x + 20, enemy.y + 50, true);
                        _this._enemybullets.push(bullet);
                        _this.addChild(bullet);
                    }
                });
                _this._enemybullets.forEach(function (bullet) {
                    _this.BulletSpeed(bullet, 3, 1, true);
                    managers.Collision.Check(_this._player, bullet);
                    if (bullet.isColliding) {
                        _this._player.position = new objects.Vector2(-100, -200);
                        _this._player.died = true;
                        bullet.position = new objects.Vector2(-200, -200);
                        _this.removeChild(bullet);
                        //config.Game.SCENE_STATE = scenes.State.END;
                    }
                });
                _this._bullets.forEach(function (bullet) {
                    _this.BulletSpeed(bullet, 3, 2, false);
                    managers.Collision.AABBCheck(enemy, bullet);
                    if (bullet.isColliding) {
                        _this.ExploreAnimation(enemy.x, enemy.y);
                        enemy.position = new objects.Vector2(-100, -200);
                        enemy.died = true;
                        _this.removeChild(enemy);
                        bullet.position = new objects.Vector2(-200, -200);
                        _this.removeChild(bullet);
                        _this._point += 100;
                    }
                });
                //check collision player and enemies
                //managers.Collision.Check(enemy, this._player);
                // if(this._player.isColliding)
                // {
                //     console.log("debug: Player collision");
                //     //createjs.Sound.play("./Assets/sounds/crash.wav");
                //     //config.Game.SCENE_STATE = scenes.State.END;
                //     //createjs.Sound.stop();//
                // }
            });
        }; //end update positon
        // Shot fire until enemies are colliding
        Play.prototype.FireGun = function (enemy, bullArray) {
            var _this = this;
            //newArray.forEach(enemy => {
            //this.addChild(enemy);
            if (enemy.canShoot()) {
                var fire_1 = setInterval(function () {
                    if (!enemy.isColliding) {
                        var bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam2"), enemy.x + 20, enemy.y + 50, true);
                        bullArray.push(bullet);
                        _this.addChild(bullet);
                    }
                    else
                        clearInterval(fire_1);
                }, 500);
            }
            //});
        }; //end public FireGun
        // for(var i = 0; i < 3; i++) {
        //     (function(index) {
        //         setTimeout(function() { alert(index); }, index*5000);
        //     })(i);
        // }
        Play.prototype.ExploreAnimation = function (obX, obY) {
            var chopperImg1 = document.createElement('img');
            var chopperImg2 = document.createElement('img');
            var chopperImg3 = document.createElement('img');
            var chopperImg4 = document.createElement('img');
            var chopperImg5 = document.createElement('img');
            var chopperImg6 = document.createElement('img');
            var chopperImg7 = document.createElement('img');
            var chopperImg8 = document.createElement('img');
            var chopperImg9 = document.createElement('img');
            var chopperImg10 = document.createElement('img');
            var chopperImg11 = document.createElement('img');
            var chopperImg12 = document.createElement('img');
            var chopperImg13 = document.createElement('img');
            var chopperImg14 = document.createElement('img');
            var chopperImg15 = document.createElement('img');
            var chopperImg16 = document.createElement('img');
            chopperImg1.src = "./Assets/images/e1.png";
            chopperImg2.src = "./Assets/images/e2.png";
            chopperImg3.src = "./Assets/images/e3.png";
            chopperImg4.src = "./Assets/images/e4.png";
            chopperImg5.src = "./Assets/images/e5.png";
            chopperImg6.src = "./Assets/images/e6.png";
            chopperImg7.src = "./Assets/images/e7.png";
            chopperImg8.src = "./Assets/images/e8.png";
            chopperImg9.src = "./Assets/images/e9.png";
            chopperImg10.src = "./Assets/images/e10.png";
            chopperImg11.src = "./Assets/images/e11.png";
            chopperImg12.src = "./Assets/images/e12.png";
            chopperImg13.src = "./Assets/images/e13.png";
            chopperImg14.src = "./Assets/images/e14.png";
            chopperImg15.src = "./Assets/images/e15.png";
            chopperImg16.src = "./Assets/images/e16.png";
            var spriteSheet = new createjs.SpriteSheet({
                images: [chopperImg1, chopperImg2, chopperImg3, chopperImg4, chopperImg5,
                    chopperImg6, chopperImg7, chopperImg8, chopperImg9, chopperImg10,
                    chopperImg11, chopperImg12, chopperImg13, chopperImg14, chopperImg15, chopperImg16],
                frames: { width: 150, height: 150, count: 17 },
                animations: {
                    explore: [0, 16, false]
                }
            });
            var animation = new createjs.Sprite(spriteSheet);
            animation.x = obX - 65;
            animation.y = obY - 50;
            animation.spriteSheet.getAnimation('explore').speed = 0.5;
            animation.gotoAndPlay('explore');
            this.addChild(animation);
        };
        Play.prototype.UpdateWinOrLoseCondition = function () {
            this._bulletNumLabel.text = "Bullets: " + this._bulletNum;
            if (this._bulletNum == 0) {
                config.Game.SCENE_STATE = scenes.State.END;
            }
            this._pointLabel.text = "Scores: " + this._point;
            this._liveLabel.text = "Live: " + managers.Collision.live;
            //if player kill all the enemies
            if (managers.Collision.count == this._numOfEnemy) {
                config.Game.SCENE_STATE = scenes.State.Stage2;
            }
            //if attacked more than 3 times, game over
            if (managers.Collision.live == 0) {
                this.removeChild(this._player);
                config.Game.SCENE_STATE = scenes.State.END;
            }
        };
        return Play;
    }(objects.Scene)); //end class
    scenes.Play = Play;
})(scenes || (scenes = {})); //end module
// this._player.addEventListener("click", () =>{
//     console.log("click");
//     this._bulletNum--;
//     let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam1"), this._player.x, this._player.y-20, true);
//     this._bullets.push(bullet);
//     console.log(this._bullets.length);
//     this.addChild(bullet);
//     this.Update();
// });
// // Shot fire until enemies are colliding
// public FireGun(newArray:Array<objects.Enemy>, bullArray:Array<objects.Bullet>):void
// {
//     newArray.forEach(enemy => {
//         this.addChild(enemy);
//             if(enemy.canShoot()){
//                 let fire = setInterval(()=>{
//                     if(!enemy.isColliding)
//                     {
//                         let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam2"), enemy.x+20, enemy.y+50, true);
//                         bullArray.push(bullet);
//                         this.addChild(bullet);
//                     }
//                     else clearInterval(fire)
//                 }, 500)
//             }
//     });
// }//end public FireGun
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