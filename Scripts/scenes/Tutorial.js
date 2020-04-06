"use strict";
var scenes;
(function (scenes) {
    class Tutorial extends objects.Scene {
        // CONSTRUCTOR
        constructor() {
            super();
            //private _scoreBoard: managers.ScoreBoard = new managers.ScoreBoard;
            // private _playBackSound: createjs.PlayPropsConfig;
            this._text = new objects.Label();
            this._showResult = new objects.Label();
            // initialization
            this._background = new objects.Background();
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
            this._text = new objects.Label("Press Arrow Key : MOVE RIGHT , MOVE UP\n\nPress 'ESC' key : Escape", "23px", "Impact, Charcoal, sans-serif", "#142950", 320, 50, true);
            this._user = new objects.User();
            //this._showResult = new objects.Label();
            this._aliens = new Array();
            this._clouds = new Array();
            this._coins = new Array();
            for (let cloud = 0; cloud < 5; cloud++) {
                this._clouds.push(new objects.cloud());
            }
            for (let alien = 0; alien < 5; alien++) {
                this._aliens.push(new objects.Alien(config.Game.ASSETS.getResult("alien")));
            }
            for (let coin = 0; coin < 10; coin++) {
                this._coins.push(new objects.Coin(config.Game.ASSETS.getResult("coin")));
            }
            //config.Game.SCORE_BOARD = this._scoreBoard;
            this.Main();
        }
        Update() {
            this._background.Update();
            this._user.Update();
            this._aliens.forEach(alien => {
                alien.Update();
                managers.Collision.squaredRadiusCheck(this._user, alien, false);
                if (alien.isColliding) {
                    //ADD SOUND
                }
            });
            this._clouds.forEach(cloud => {
                cloud.Update();
                managers.Collision.squaredRadiusCheck(this._user, cloud, false);
                if (cloud.isColliding) {
                    //ADD SOUND
                }
            });
            this._coins.forEach(coin => {
                coin.Update();
                managers.Collision.squaredRadiusCheck(this._user, coin, false, 100);
                if (coin.isColliding) {
                    //ADD SOUND
                    this.removeChild(coin);
                }
            });
        }
        Main() {
            // adds background to the stage
            this.addChild(this._background);
            this.addChild(this._user);
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
        } //end public Main() method
        UpdateWinOrLoseCondition() {
            // setTimeout(() => {
            //     this._startPage = new objects.Image(config.Game.ASSETS.getResult("firstPage"), 320, 200, true);
            // }, 5000);
            config.Game.SCENE_STATE = scenes.State.STAGE01;
            managers.Collision.count = 0;
        }
    } //end class
    scenes.Tutorial = Tutorial;
})(scenes || (scenes = {})); //end module
//# sourceMappingURL=Tutorial.js.map