module managers
{
    export class ScoreBoard
    {
        //private instance members
        private _lives : number =0;
        private _score : number =0;
        private _livesLabel : objects.Label = new objects.Label;
        private _scoreLabel : objects.Label = new objects.Label;
        private _highScoreLabel : objects.Label = new objects.Label;
        private _highScore : number =0;
        private _missionCoin : number =0;
        private _missionLabel : objects.Label = new objects.Label;
        private _status : boolean = false;

        public get status() : boolean 
        {
            return this._status;
        }
        public set status(v : boolean ) 
        {
            this._status = v;
            config.Game.STATUS = this._status;
        }
        

        public get MissionLabel() : objects.Label 
        {
            return this._missionLabel;
        }

        public get MissionCoin() : number 
        {
            return this._missionCoin;
        }

        public set MissionCoin(v : number) 
        {
            this._missionCoin = v;
            //config.Game.MISSON = this._missionCoin;
            this._missionCoin = config.Game.MISSON;
            this._missionLabel.setText("MISSION: COLLECT " + this._missionCoin + " COINS");
        }
        
        public get HighScore() : number 
        {
            return this._highScore;
        }
        public set HighScore(v : number) 
        {
            this._highScore = v;
            config.Game.HIGH_SCORE = this._highScore;
            this._highScoreLabel.setText("HIGH SCORE: " + this._highScore);
        }
 
        public get HighScoreLabel() : objects.Label 
        {
            return this._highScoreLabel;
        }

        public get ScoreLabel():objects.Label
        {
            return this._scoreLabel;
        }

        public get LivesLabel() :objects.Label
        {
            return this._livesLabel;
        }
        
        public get Score() : number {
            return this._score;
        }

        public set Score(v : number) {
            this._score = v;
            config.Game.SCORE = this._score;
            this._scoreLabel.text = "COINS : " + this._score;
        }
        
        public get Lives() : number {
            return this._lives;
        }
        public set Lives(v : number) 
        {
            this._lives = v;
            config.Game.LIVES = this._lives;
            this._livesLabel.text = "LIVES : " + this._lives;
        }
        
        //public properties
        //comstructor
        constructor()
        {
            this._initialize();
        }

        //private method

        // public ScoreLabel:objects.Label;
        // public LivesLabel:objects.Label;

        public _initialize()
        {
            this._livesLabel = new objects.Label("3", "23px", "Impact, Charcoal, sans-serif", "#000000", 40, 30, true);
            this._scoreLabel = new objects.Label("0", "23px", "Impact, Charcoal, sans-serif", "#000000", 500, 30, true);
            this._highScoreLabel = new objects.Label("0", "23px", "Impact, Charcoal, sans-serif", "#000000", 320, 30, true);
            this._missionLabel= new objects.Label("0", "23px", "Impact, Charcoal, sans-serif", "#FF0000", 320, 70, true);
            this.Lives = config.Game.LIVES;
            this.Score = config.Game.SCORE;
            this.HighScore = config.Game.HIGH_SCORE;
            this.MissionCoin = config.Game.MISSON;
        }
    }
}