"use strict";
var scenes;
(function (scenes) {
    class Story extends objects.Scene {
        // CONSTRUCTOR
        constructor() {
            super();
            //private _background: objects.Background;
            //private _scoreBoard: managers.ScoreBoard = new managers.ScoreBoard;
            // private _playBackSound: createjs.PlayPropsConfig;
            this._screen = new objects.Image();
            this._item = new objects.Image();
            this._text = new objects.Label();
            // initialization
            //this._background = new objects.Background();
            // this._playBackSound= new createjs.PlayPropsConfig();
            this._screen = new objects.Image();
            this._item = new objects.Image();
            this._user = new objects.User();
            this.Start();
        }
        // PUBLIC METHODS
        //initilize 
        Start() {
            this._screen = new objects.Image(config.Game.ASSETS.getResult("screen"), 320, 200, true);
            this._item = new objects.Image(config.Game.ASSETS.getResult("item"), 160, 180, true);
            //this._background = new objects.Background(config.Game.ASSETS.getResult("back"));
            // this._playBackSound= new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5});
            this._text = new objects.Label("HIT THE ITEM !!!", "35px", "Impact, Charcoal, sans-serif", "#FFFFFF", 320, 50, true);
            this._user = new objects.User();
            //this._showResult = new objects.Label();
            //config.Game.SCORE_BOARD = this._scoreBoard;
            this.Main();
        }
        Update() {
            //this._background.Update();
            this._user.Update();
            managers.Collision.AABBCheck(this._user, this._item);
            if (this._item.isColliding) {
                config.Game.SCORE_BOARD.Lives = 3;
                //config.Game.SCORE_BOARD.HighScore = 0;
                config.Game.SCORE_BOARD.Score = 0;
                config.Game.SCENE_STATE = scenes.State.STAGE02;
            }
        }
        Main() {
            // adds background to the stage
            this.addChild(this._screen);
            this.addChild(this._item);
            this.addChild(this._user);
            //this.addChild(this._scoreBoard.ScoreLabel);
            // this.addChild(this._showResult);
            this.addChild(this._text);
        } //end public Main() method
    } //end class
    scenes.Story = Story;
})(scenes || (scenes = {})); //end module
//# sourceMappingURL=Story.js.map