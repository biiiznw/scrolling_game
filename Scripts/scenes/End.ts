/**
 * AUTHOR: YERIN AN
 * STUDENT NUMBER: 300947515
 * LAST MODIFIED BY: YERIN AN
 * DATE LAST MODIFIED: APRIL 05
 * PROGRAM DESCRIPTION: SCROLLING GAME
 * REVISON HISTORY: VERSION 02
 */

module scenes
{
    export class End extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private endLabel:objects.Label;
        private _backButton:objects.Button;
        private _scoreBoard: managers.ScoreBoard;
        // private  _ocean:objects.Ocean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.endLabel = new objects.Label();
            this._background = new objects.Background();
            this._backButton = new objects.Button();
            this._scoreBoard  = new managers.ScoreBoard;

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this._background = new objects.Background(config.Game.ASSETS.getResult("back"));

            if(config.Game.STATUS == true && config.Game.ENDSCENE == false)
            {
                this.endLabel = new objects.Label("SEE YOU AGAIN", "80px","Impact, Charcoal, sans-serif", "#000000", 320, 150, true);
            }
            else if(config.Game.STATUS == true && config.Game.ENDSCENE == false)
            {
                this.endLabel = new objects.Label("CONGRATULATION", "80px","Impact, Charcoal, sans-serif", "#000000", 320, 150, true);
            }
            else{
                this.endLabel = new objects.Label("GAME OVER", "80px","Impact, Charcoal, sans-serif", "#000000", 320, 150, true);
            }
            this._backButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 320, 300, true);
            //this._backButton = new objects.Button("startButton", 320, 300, true);
            managers.Collision._checkHighScore;
            this._scoreBoard = new managers.ScoreBoard();
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
           
            this.Main();
        }        
        
        public Update(): void 
        {
            this._background.Update();
        }
        
        public Main(): void {
            this.addChild(this._background);
            this.addChild(this.endLabel);
            this.addChild(this._backButton);
    
            this._backButton.on("click", function() {
                config.Game.SCORE_BOARD.Lives = 3;
                managers.Collision.count = 0;
                config.Game.SCENE_STATE = scenes.State.STAGE01;
                config.Game.SCORE_BOARD.Score = 0;
                //config.Game.ANTIBOOMITEM = 0;
                //User.point = 0;
                createjs.Sound.stop();
            });
            this.addChild(this._scoreBoard.HighScoreLabel);
        }

        
    }
}