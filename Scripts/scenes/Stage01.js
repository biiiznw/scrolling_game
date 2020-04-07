"use strict";
/**
 * AUTHOR: YERIN AN
 * STUDENT NUMBER: 300947515
 * LAST MODIFIED BY: YERIN AN
 * DATE LAST MODIFIED: APRIL 05
 * PROGRAM DESCRIPTION: SCROLLING GAME
 * REVISON HISTORY: VERSION 03
 */
var scenes;
(function (scenes) {
    class Stage01 extends objects.Scene {
        constructor() {
            super();
            //take
            this._playBackSound = new createjs.PlayPropsConfig();
            this._scoreBoard = new managers.ScoreBoard;
            // initialization
            this._background = new objects.Background();
            this._playBackSound = new createjs.PlayPropsConfig();
            this._user = new objects.User();
            this._clouds = new Array();
            this._aliens = new Array();
            this._finish = new objects.Endpoint();
            this._coins = new Array();
            this.Start();
        }
        Start() {
            // config.Game.SCORE_BOARD = this._scoreBoard;
            // this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this._background = new objects.Background(config.Game.ASSETS.getResult("back"));
            //unlimited background sound
            this._playBackSound = new createjs.PlayPropsConfig().set({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
            createjs.Sound.play("startSound", this._playBackSound);
            this._user = new objects.User();
            this._aliens = new Array();
            this._clouds = new Array();
            this._coins = new Array();
            this._finish = new objects.Endpoint(config.Game.ASSETS.getResult("duck"));
            //create multiple 
            for (let cloud = 0; cloud < 15; cloud++) {
                this._clouds.push(new objects.cloud());
            }
            this._clouds.forEach(cloud => {
                cloud.Speed = 0.5;
                cloud.Update();
            });
            for (let alien = 0; alien < 5; alien++) {
                this._aliens.push(new objects.Alien(config.Game.ASSETS.getResult("alien")));
            }
            this._aliens.forEach(alien => {
                alien.Speed = 3;
                alien.Update();
            });
            for (let coin = 0; coin < 20; coin++) {
                this._coins.push(new objects.Coin(config.Game.ASSETS.getResult("coin")));
            }
            this._coins.forEach(coin => {
                coin.Speed = 0.5;
                coin.Update();
            });
            this._finish.Dx = 4500;
            this._finish.Dy = 225;
            config.Game.SCORE_BOARD = this._scoreBoard;
            config.Game.MISSON = 500;
            console.log(config.Game.MISSON);
            this._scoreBoard.MissionCoin = config.Game.MISSON;
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this.Main();
        } //and Start method
        Update() {
            this._user.Update();
            this._background.Update();
            this._finish.Update();
            this._aliens.forEach(alien => {
                alien.Update();
                managers.Collision.AABBCheckWithoutP(this._user, alien);
                if (alien.isColliding) {
                    //ADD SOUND
                    createjs.Sound.play("monsterSound");
                }
            });
            this._clouds.forEach(cloud => {
                cloud.Update();
                managers.Collision.AABBCheckWithoutP(this._user, cloud);
                if (cloud.isColliding) {
                    //ADD SOUND
                    createjs.Sound.play("cloudSound");
                }
            });
            this._coins.forEach(coin => {
                coin.Update();
                managers.Collision.AABBCheck(this._user, coin, 100, true);
                if (coin.isColliding) {
                    //ADD SOUND
                    createjs.Sound.play("coinSound");
                    this.removeChild(coin);
                }
            });
            managers.Collision.AABBCheck(this._user, this._finish);
            //this.CheckStatus();
            if (config.Game.SCORE_BOARD.Lives < 1) {
                setTimeout(() => {
                    //this.removeChild(this._user);
                    this.removeAllChildren();
                    // this._aliens.forEach(alien => {
                    //     alien.died = true;
                    // });
                    config.Game.SCENE_STATE = scenes.State.END;
                }, 300);
            }
            if (this._finish.isColliding) {
                console.log("Money " + config.Game.SCORE_BOARD.Score);
                if (config.Game.SCORE_BOARD.Score >= (config.Game.MISSON + 1000)) {
                    config.Game.MISSON = 0;
                    config.Game.ENDSCENE = true;
                    config.Game.SCENE_STATE = scenes.State.END;
                }
                else {
                    config.Game.MISSON = 0;
                    config.Game.SCENE_STATE = scenes.State.STORY;
                }
            }
        } //end Update method
        Main() {
            this.addChild(this._background);
            this.addChild(this._user);
            this.addChild(this._finish);
            for (const alien of this._aliens) {
                this.addChild(alien);
            }
            ;
            for (const cloud of this._clouds) {
                this.addChild(cloud);
            }
            ;
            for (const coin of this._coins) {
                this.addChild(coin);
            }
            ;
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._scoreBoard.MissionLabel);
            this.addChild(this._scoreBoard.HighScoreLabel);
        } //end Main method
    } //class Stage01
    scenes.Stage01 = Stage01;
})(scenes || (scenes = {})); //end module
//# sourceMappingURL=Stage01.js.map