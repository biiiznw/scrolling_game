"use strict";
var scenes;
(function (scenes) {
    class Tutorial extends objects.Scene {
        // CONSTRUCTOR
        constructor() {
            super();
            this._scoreBoard = new managers.ScoreBoard;
            this._text = new objects.Label();
            this._showResult = new objects.Label();
            // initialization
            this._background = new objects.Background();
            this._finish = new objects.Endpoint();
            // this._playBackSound= new createjs.PlayPropsConfig();
            this._user = new objects.User();
            this._clouds = new Array();
            this._aliens = new Array();
            this._coins = new Array();
            this.Start();
        }
        // PUBLIC METHODS
        //initilize 
        Start() {
            this._background = new objects.Background(config.Game.ASSETS.getResult("back"));
            // this._playBackSound= new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5});
            this._text = new objects.Label("Press Arrow Key : MOVE RIGHT , MOVE UP\nPress 'ESC' key : Escape\nAVOID CLOUDS & MONSTERS\nYOU SHOULD COMPLETE A MISSION OF EACH LEVEL", "23px", "Impact, Charcoal, sans-serif", "#142950", 320, 100, true);
            this._user = new objects.User();
            this._finish = new objects.Endpoint(config.Game.ASSETS.getResult("totoro"));
            //this._showResult = new objects.Label();
            this._aliens = new Array();
            this._clouds = new Array();
            this._coins = new Array();
            for (let cloud = 0; cloud < 5; cloud++) {
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
            for (let coin = 0; coin < 10; coin++) {
                this._coins.push(new objects.Coin(config.Game.ASSETS.getResult("coin")));
            }
            this._coins.forEach(coin => {
                coin.Speed = 0.5;
                coin.Update();
            });
            //config.Game.SCORE_BOARD = this._scoreBoard;
            this._finish.Dx = 2000;
            this._finish.Dy = 200;
            config.Game.SCORE_BOARD = this._scoreBoard;
            config.Game.MISSON = 200;
            console.log(config.Game.MISSON);
            this._scoreBoard.MissionCoin = config.Game.MISSON;
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            createjs.Sound.play("startSound");
            this.Main();
        }
        Update() {
            this._background.Update();
            this._user.Update();
            this._finish.Update();
            this._aliens.forEach(alien => {
                alien.Update();
                managers.Collision.AABBCheckWithoutP(this._user, alien);
                if (alien.isColliding) {
                    //ADD SOUND
                }
            });
            this._clouds.forEach(cloud => {
                cloud.Update();
                managers.Collision.AABBCheckWithoutP(this._user, cloud);
                if (cloud.isColliding) {
                    //ADD SOUND
                }
            });
            this._coins.forEach(coin => {
                coin.Update();
                managers.Collision.AABBCheck(this._user, coin, 100, true);
                if (coin.isColliding) {
                    //ADD SOUND
                    this.removeChild(coin);
                }
            });
            managers.Collision.AABBCheck(this._user, this._finish);
            if (this._finish.isColliding) {
                config.Game.SCORE_BOARD.Lives = 3;
                managers.Collision.count = 0;
                config.Game.SCORE_BOARD.HighScore = 0;
                config.Game.SCORE_BOARD.Score = 0;
                config.Game.SCENE_STATE = scenes.State.STAGE01;
                createjs.Sound.stop();
            }
        }
        Main() {
            // adds background to the stage
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
            //this.addChild(this._scoreBoard.ScoreLabel);
            // this.addChild(this._showResult);
            this.addChild(this._text);
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._scoreBoard.MissionLabel);
            this.addChild(this._scoreBoard.HighScoreLabel);
        } //end public Main() method
    } //end class
    scenes.Tutorial = Tutorial;
})(scenes || (scenes = {})); //end module
//# sourceMappingURL=Tutorial.js.map