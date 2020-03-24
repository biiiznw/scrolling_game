"use strict";
var scenes;
(function (scenes) {
    class FinalStage extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            this.fire = true;
            this._numOfEnemy = 0;
            this._bulletNum = 20;
            this._bulletImg = new Image();
            // initialization
            this._player = new objects.Player;
            this._ememies = new Array();
            this._background = new objects.Background();
            this._enemybullets = new Array();
            this._bullets = new Array();
            this._bulletImage = new objects.Button();
            this._bulletImg.src = "./Assets/images/beam1.png";
            this._bulletNumLabel = new objects.Label();
            this._playerBullet = new objects.Bullet();
            this._pointLabel = new objects.Label();
            this._liveLabel = new objects.Label();
            this._bulletImage = new objects.Button();
            this._scoreImage = new objects.Button();
            this._lifeImage = new objects.Button();
            this._levelup = new objects.Image();
            this._blackhole = new objects.Blackhole();
            this._numOfEnemy;
            this._bulletNum = 30;
            this._point = 0;
            this._boss = new objects.Boss();
            this.Start();
        }
        //#########################################
        //          create enamies
        //#########################################
        AddEnemies(number) {
            let createEnemy = setInterval(() => {
                if (this._ememies.length < number) {
                    let enemy = new objects.Enemy(config.Game.ASSETS.getResult("enemy03"));
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
        //#########################################
        //      FIRE MULTIPLE GUNS
        //#########################################
        FireGun(enemy, bullArray) {
            if (enemy.canShoot()) {
                let fire = setInterval(() => {
                    if (!enemy.isColliding) {
                        let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam4"), enemy.x + 40, enemy.y + 70, true);
                        bullArray.push(bullet);
                        this.addChild(bullet);
                    }
                    else
                        clearInterval(fire);
                }, 500);
            }
        } //end public FireGun
        // public EventLife():void
        // {
        //     if(this._point > 100)
        //     {
        //         let lifeImage = new objects.Button(config.Game.ASSETS.getResult("life.png"));
        //     }
        // }
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
                        //this.ExploreAnimation(enemy.x, enemy.y);
                        enemy.position = new objects.Vector2(-100, -200);
                        enemy.died = true;
                        this.removeChild(enemy);
                        bullet.position = new objects.Vector2(-200, -200);
                        this.removeChild(bullet);
                        this._point += 200;
                    }
                });
            });
        } //end update positon
        //#########################################
        //    CONTROL BULLETS' MOVEMENT, SPEED
        //#########################################
        UpdateBullets() {
            this._bullets.forEach((bullet) => {
                this.BulletSpeed(bullet, 10, 10, false);
            });
            this._ememies.forEach(enemy => {
                enemy.addEventListener("tick", () => {
                    if (enemy.canShoot()) {
                        let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam4"), enemy.x + 40, enemy.y + 70, true);
                        this._enemybullets.push(bullet);
                        this.addChild(bullet);
                    }
                });
            });
            this._enemybullets.forEach((bullet) => {
                this.BulletSpeed(bullet, 10, 10, true);
            });
        }
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
        UpdateWinOrLoseCondition() {
            this._bulletNumLabel.text = " : " + this._bulletNum;
            if (this._bulletNum == 0) {
                config.Game.SCENE_STATE = scenes.State.END;
            }
            this._pointLabel.text = " : " + this._point;
            this._liveLabel.text = " : " + managers.Collision.live;
            //if player kill all the enemies
            if (managers.Collision.count == this._numOfEnemy) {
                config.Game.SCENE_STATE = scenes.State.FINALSTAGE;
            }
            //if attacked more than 3 times, game over
            if (managers.Collision.live <= 0) {
                setTimeout(() => {
                    this.removeChild(this._player);
                    config.Game.SCENE_STATE = scenes.State.END;
                }, 300);
            }
        }
        // PUBLIC METHODS
        Start() {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background3"));
            this._blackhole = new objects.Blackhole();
            this._ememies = new Array();
            this._bulletImage = new objects.Button(config.Game.ASSETS.getResult("bullet"), 560, 30, true);
            this._bulletImage = new objects.Button(config.Game.ASSETS.getResult("bullet"), 560, 30, true);
            this._scoreImage = new objects.Button(config.Game.ASSETS.getResult("score"), 420, 30, true);
            this._lifeImage = new objects.Button(config.Game.ASSETS.getResult("life"), 30, 30, true);
            this._bulletNumLabel = new objects.Label("bullets:", "23px", "Impact, Charcoal, sans-serif", "#fff", 610, 30, true);
            this._pointLabel = new objects.Label("Scores: 0", "23px", "Impact, Charcoal, sans-serif", "#ffffff", 480, 30, true);
            this._liveLabel = new objects.Label("Live: 3", "23px", "Impact, Charcoal, sans-serif", "#fff", 75, 30, true);
            this._levelup = new objects.Image(config.Game.ASSETS.getResult("levelup"), 400, 50, true);
            this._numOfEnemy = 10;
            this._boss = new objects.Boss(config.Game.ASSETS.getResult("boss"));
            // this.AddEnemies(this._numOfEnemy);
            this.Main();
        } //end start
        Update() {
            this._background.Update();
            this._player.Update();
            this._blackhole.Update();
            this.UpdateBullets();
            this.UpdatePlayerFire();
            this.UpdatePosition();
            this.UpdateWinOrLoseCondition();
            this._levelup.y += 5;
            this._levelup.position.y += 5;
            //check Black hole Collison
            managers.Collision.squaredRadiusCheck(this._player, this._blackhole);
            managers.Collision.AABBCheck(this._player, this._levelup);
            if (this._levelup.isColliding) {
                this.removeChild(this._levelup);
                this._bulletImg.src = "./Assets/images/beam3.png";
            }
            this._boss.Update();
        } //end update
        Main() {
            this.addChild(this._background);
            this.addChild(this._blackhole);
            this.addChild(this._bulletImage);
            this.addChild(this._bulletNumLabel);
            this.addChild(this._lifeImage);
            this.addChild(this._scoreImage);
            this.addChild(this._player);
            this.addChild(this._pointLabel);
            this.addChild(this._liveLabel);
            this.addChild(this._levelup);
            this.addChild(this._boss);
        } //end main
        //#########################################
        //      FIRE SHOOT WITH SPACE BUTTON
        //#########################################
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
        } //end UpdatePlayerFire
        //#########################################
        //      ANIMATION
        //#########################################
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
    }
    scenes.FinalStage = FinalStage;
})(scenes || (scenes = {}));
//# sourceMappingURL=FinalStage.js.map