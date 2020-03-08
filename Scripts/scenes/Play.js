"use strict";
var scenes;
(function (scenes) {
    class Play extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            this._numOfEnemy = 0;
            this._bulletNum = 20;
            this.fire = true;
            this._bulletImg = new Image();
            // initialization
            this._player = new objects.Player;
            this._level = new objects.Label;
            this._ememies = new Array();
            this._background = new objects.Background();
            this._playBackSound = new createjs.PlayPropsConfig();
            this._bullets = new Array();
            this._enemybullets = new Array();
            this._numOfEnemy;
            this._bulletNum = 30;
            this._bulletNumLabel = new objects.Label();
            this._point = 0;
            this._pointLabel = new objects.Label();
            this._liveLabel = new objects.Label();
            this._bulletImage = new objects.Button();
            this._scoreImage = new objects.Button();
            this._lifeImage = new objects.Button();
            this._player = new objects.Player();
            this._levelup = new objects.Image();
            this._playerBullet = new objects.Bullet();
            this._bulletImg.src = "./Assets/images/beam1.png";
            this.Start();
        }
        // PUBLIC METHODS
        //initilize 
        Start() {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
            this._level = new objects.Label("Level : 1", "15px", "Consolas", "#000000", 50, 20, true);
            this.StartAnimation();
            //Set Number of Enemies
            this._numOfEnemy = 5;
            //unlimited background sound
            this._playBackSound = new createjs.PlayPropsConfig().set({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
            createjs.Sound.play("playSound", this._playBackSound);
            this._ememies = new Array();
            this._enemybullets = new Array();
            this._bulletImage = new objects.Button(config.Game.ASSETS.getResult("bullet"), 560, 30, true);
            this._scoreImage = new objects.Button(config.Game.ASSETS.getResult("score"), 420, 30, true);
            this._lifeImage = new objects.Button(config.Game.ASSETS.getResult("life"), 30, 30, true);
            this._bulletNumLabel = new objects.Label("bullets:", "23px", "Impact, Charcoal, sans-serif", "#fff", 610, 30, true);
            this._pointLabel = new objects.Label("Scores: 0", "23px", "Impact, Charcoal, sans-serif", "#ffffff", 480, 30, true);
            this._liveLabel = new objects.Label("Live: 3", "23px", "Impact, Charcoal, sans-serif", "#fff", 75, 30, true);
            this._levelup = new objects.Image(config.Game.ASSETS.getResult("levelup"), 400, 50, true);
            //this.bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam1"), this._player.x, this._player.y-20, true);
            // this._enemyNum =4;
            //Add ememies
            this.AddEnemies(this._numOfEnemy);
            //this.AddEnemies(10, this._enemybullets);
            this.Main();
        }
        AddEnemies(number) {
            let createEnemy = setInterval(() => {
                if (this._ememies.length < number) {
                    let enemy = new objects.Enemy(config.Game.ASSETS.getResult("enemy"));
                    this._ememies.push(enemy);
                    this.addChild(enemy);
                    console.log("CREATE");
                    this.FireGun(enemy, this._enemybullets);
                }
                else {
                    clearInterval(createEnemy);
                }
            }, 1000);
        }
        // public Controls(e:KeyboardEvent):void
        // {
        //     if(e.keyCode == config.Keys.FIREGUN)
        //     {
        //         this._bulletNum--;
        //         let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam1"), this._player.x, this._player.y-20, true);
        //         this._bullets.push(bullet);
        //         console.log("FIRE GUN");
        //         this.addChild(bullet);
        //     }
        // }
        // public AddEnemies(EnemyNum:number):void{
        //     for(let count = 0; count < EnemyNum; count++)
        //     {
        //         this._ememies[count] = new objects.Enemy();
        //     }
        // }
        Update() {
            this._background.Update();
            this._player.Update();
            this.UpdateBullets();
            this.UpdatePlayerFire();
            //this.updateBullet();
            this.UpdatePosition();
            this.UpdateWinOrLoseCondition();
            this._levelup.y += 5;
            this._levelup.position.y += 5;
            managers.Collision.AABBCheck(this._player, this._levelup, true);
            if (this._levelup.isColliding) {
                this.removeChild(this._levelup);
                this._bulletImg.src = "./Assets/images/beam3.png";
            }
        }
        Main() {
            // adds background to the stage
            this.addChild(this._background);
            this.addChild(this._bulletImage);
            this.addChild(this._lifeImage);
            this.addChild(this._scoreImage);
            //gitthis.addChild(this._level);
            this.addChild(this._player);
            this.addChild(this._bulletNumLabel);
            this.addChild(this._pointLabel);
            this.addChild(this._liveLabel);
            this.addChild(this._levelup);
        } //end public Main() method
        BulletSpeed(eBullet, eSpeed, eMove, pick = false) {
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
        }
        UpdatePosition() {
            this._ememies.forEach(enemy => {
                this.addChild(enemy);
                enemy.Update();
                this._enemybullets.forEach((bullet) => {
                    managers.Collision.Check(this._player, bullet);
                    if (bullet.isColliding) {
                        if (managers.Collision.live <= 0) {
                            this.ExploreAnimation(this._player.x, this._player.y);
                        }
                        else {
                            this.ShieldAnimation(this._player.x, this._player.y);
                        }
                        bullet.position = new objects.Vector2(-200, -200);
                        this.removeChild(bullet);
                        //config.Game.SCENE_STATE = scenes.State.END;
                    }
                });
                this._bullets.forEach((bullet) => {
                    managers.Collision.AABBCheck(enemy, bullet);
                    if (bullet.isColliding) {
                        this.ExploreAnimation(enemy.x, enemy.y);
                        createjs.Sound.play("./Assets/sounds/crash.wav");
                        enemy.position = new objects.Vector2(-100, -200);
                        enemy.died = true;
                        this.removeChild(enemy);
                        bullet.position = new objects.Vector2(-200, -200);
                        this.removeChild(bullet);
                        this._point += 100;
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
        } //end update positon
        // Shot fire until enemies are colliding
        FireGun(enemy, bullArray) {
            //newArray.forEach(enemy => {
            //this.addChild(enemy);
            if (enemy.canShoot()) {
                let fire = setInterval(() => {
                    if (!enemy.isColliding) {
                        let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam2"), enemy.x + 20, enemy.y + 50, true);
                        bullArray.push(bullet);
                        this.addChild(bullet);
                    }
                    else
                        clearInterval(fire);
                }, 500);
            }
            //});
        } //end public FireGun
        // for(var i = 0; i < 3; i++) {
        //     (function(index) {
        //         setTimeout(function() { alert(index); }, index*5000);
        //     })(i);
        // }
        UpdateBullets() {
            this._bullets.forEach((bullet) => {
                this.BulletSpeed(bullet, 8, 8, false);
            });
            this._ememies.forEach(enemy => {
                enemy.addEventListener("tick", () => {
                    if (enemy.canShoot()) {
                        let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam2"), enemy.x + 20, enemy.y + 50, true);
                        this._enemybullets.push(bullet);
                        this.addChild(bullet);
                    }
                });
            });
            this._enemybullets.forEach((bullet) => {
                this.BulletSpeed(bullet, 8, 8, true);
            });
        }
        UpdatePlayerFire() {
            if (config.Game.keyboardManager.fire) {
                if (this.fire) {
                    console.log("click1");
                    this._bulletNum--;
                    createjs.Sound.play("./Assets/sounds/firstGun1.wav");
                    this._playerBullet = new objects.Bullet(this._bulletImg, this._player.x, this._player.y - 20, true);
                    this._bullets.push(this._playerBullet);
                    this.addChild(this._playerBullet);
                    this.fire = false;
                }
            }
            if (!config.Game.keyboardManager.fire) {
                this.fire = true;
            }
        }
        ExploreAnimation(obX, obY) {
            let chopperImg1 = document.createElement('img');
            let chopperImg2 = document.createElement('img');
            let chopperImg3 = document.createElement('img');
            let chopperImg4 = document.createElement('img');
            let chopperImg5 = document.createElement('img');
            let chopperImg6 = document.createElement('img');
            let chopperImg7 = document.createElement('img');
            let chopperImg8 = document.createElement('img');
            let chopperImg9 = document.createElement('img');
            let chopperImg10 = document.createElement('img');
            let chopperImg11 = document.createElement('img');
            let chopperImg12 = document.createElement('img');
            let chopperImg13 = document.createElement('img');
            let chopperImg14 = document.createElement('img');
            let chopperImg15 = document.createElement('img');
            let chopperImg16 = document.createElement('img');
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
            let spriteSheet = new createjs.SpriteSheet({
                images: [chopperImg1, chopperImg2, chopperImg3, chopperImg4, chopperImg5,
                    chopperImg6, chopperImg7, chopperImg8, chopperImg9, chopperImg10,
                    chopperImg11, chopperImg12, chopperImg13, chopperImg14, chopperImg15, chopperImg16],
                frames: { width: 150, height: 150, count: 17 },
                animations: {
                    explore: [0, 16, false]
                }
            });
            let animation = new createjs.Sprite(spriteSheet);
            animation.x = obX - 65;
            animation.y = obY - 50;
            animation.spriteSheet.getAnimation('explore').speed = 0.5;
            animation.gotoAndPlay('explore');
            this.addChild(animation);
        }
        ShieldAnimation(obX, obY) {
            let chopperImg1 = document.createElement('img');
            let chopperImg2 = document.createElement('img');
            let chopperImg3 = document.createElement('img');
            let chopperImg4 = document.createElement('img');
            let chopperImg5 = document.createElement('img');
            let chopperImg6 = document.createElement('img');
            let chopperImg7 = document.createElement('img');
            let chopperImg8 = document.createElement('img');
            let chopperImg9 = document.createElement('img');
            let chopperImg10 = document.createElement('img');
            let chopperImg11 = document.createElement('img');
            let chopperImg12 = document.createElement('img');
            chopperImg1.src = "./Assets/images/s12.png";
            chopperImg2.src = "./Assets/images/s11.png";
            chopperImg3.src = "./Assets/images/s10.png";
            chopperImg4.src = "./Assets/images/s9.png";
            chopperImg5.src = "./Assets/images/s8.png";
            chopperImg6.src = "./Assets/images/s7.png";
            chopperImg7.src = "./Assets/images/s6.png";
            chopperImg8.src = "./Assets/images/s5.png";
            chopperImg9.src = "./Assets/images/s4.png";
            chopperImg10.src = "./Assets/images/s3.png";
            chopperImg11.src = "./Assets/images/s2.png";
            chopperImg12.src = "./Assets/images/s1.png";
            let spriteSheet = new createjs.SpriteSheet({
                images: [chopperImg1, chopperImg2, chopperImg3, chopperImg4, chopperImg5,
                    chopperImg6, chopperImg7, chopperImg8, chopperImg9, chopperImg10,
                    chopperImg11, chopperImg12],
                frames: { width: 136, height: 136, count: 12 },
                animations: {
                    shield: [0, 12, false]
                }
            });
            let shieldAnimation = new createjs.Sprite(spriteSheet);
            shieldAnimation.x = obX - 65;
            shieldAnimation.y = obY - 50;
            shieldAnimation.spriteSheet.getAnimation('shield').speed = 0.5;
            shieldAnimation.gotoAndPlay('shield');
            this.addChild(shieldAnimation);
        }
        StartAnimation() {
            let chopperImg1 = document.createElement('img');
            let chopperImg2 = document.createElement('img');
            let chopperImg3 = document.createElement('img');
            let chopperImg4 = document.createElement('img');
            let chopperImg5 = document.createElement('img');
            let chopperImg6 = document.createElement('img');
            let chopperImg7 = document.createElement('img');
            let chopperImg8 = document.createElement('img');
            let chopperImg9 = document.createElement('img');
            let chopperImg10 = document.createElement('img');
            let chopperImg11 = document.createElement('img');
            let chopperImg12 = document.createElement('img');
            chopperImg1.src = "./Assets/images/c03_1.png";
            chopperImg2.src = "./Assets/images/c03_2.png";
            chopperImg3.src = "./Assets/images/c03_3.png";
            chopperImg4.src = "./Assets/images/c02_1.png";
            chopperImg5.src = "./Assets/images/c02_2.png";
            chopperImg6.src = "./Assets/images/c02_3.png";
            chopperImg7.src = "./Assets/images/c01_1.png";
            chopperImg8.src = "./Assets/images/c01_2.png";
            chopperImg9.src = "./Assets/images/c01_3.png";
            chopperImg10.src = "./Assets/images/cstart_1.png";
            chopperImg11.src = "./Assets/images/cstart_2.png";
            chopperImg12.src = "./Assets/images/cstart_3.png";
            let spriteSheet = new createjs.SpriteSheet({
                images: [chopperImg1, chopperImg2, chopperImg3, chopperImg4, chopperImg5,
                    chopperImg6, chopperImg7, chopperImg8, chopperImg9, chopperImg10,
                    chopperImg11, chopperImg12],
                frames: { width: 640, height: 800, count: 12 },
                animations: {
                    counting: [0, 12, false]
                }
            });
            console.log("Ani");
            let startAnimation = new createjs.Sprite(spriteSheet);
            startAnimation.x = 320;
            startAnimation.y = 400;
            startAnimation.spriteSheet.getAnimation('counting').speed = 3;
            startAnimation.gotoAndPlay('counting');
            this.addChild(startAnimation);
        }
        UpdateWinOrLoseCondition() {
            this._bulletNumLabel.text = " : " + this._bulletNum;
            if (this._bulletNum == 0) {
                config.Game.SCENE_STATE = scenes.State.END;
            }
            this._pointLabel.text = " : " + this._point;
            this._liveLabel.text = " : " + managers.Collision.live;
            //if player kill all the enemies
            if (managers.Collision.count == this._numOfEnemy) {
                config.Game.SCENE_STATE = scenes.State.Stage2;
            }
            //if attacked more than 3 times, game over
            if (managers.Collision.live <= 0) {
                setTimeout(() => {
                    this.removeChild(this._player);
                    config.Game.SCENE_STATE = scenes.State.END;
                }, 300);
            }
        }
    } //end class
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