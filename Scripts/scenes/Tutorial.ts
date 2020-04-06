module scenes
{
    export class Tutorial extends objects.Scene
    {
        private _background: objects.Background;
        //private _scoreBoard: managers.ScoreBoard = new managers.ScoreBoard;
        // private _playBackSound: createjs.PlayPropsConfig;
        private _text = new objects.Label();
        private _showResult = new objects.Label();
        private _user: objects.User;
        private _clouds: Array<objects.cloud>;
        private _aliens: Array<objects.Alien>;
        private _coins: Array<objects.Coin>;

        // CONSTRUCTOR
        constructor()
        {
            super();
            // initialization
            this._background = new objects.Background();
            // this._playBackSound= new createjs.PlayPropsConfig();
            this._user = new objects.User();
            this._clouds= new Array<objects.cloud>();
            this._aliens = new Array<objects.Alien>();
            this._coins = new Array<objects.Coin>();
            this.Start();
        }

        // PUBLIC METHODS

        //initilize 
        public Start(): void 
        {
            this._background = new objects.Background(config.Game.ASSETS.getResult("back"));
            // this._playBackSound= new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5});
            this._text = new objects.Label("Press Arrow Key : MOVE RIGHT , MOVE UP\n\nPress 'ESC' key : Escape", "23px", "Impact, Charcoal, sans-serif", "#142950", 320, 50, true);
            this._user = new objects.User();
            //this._showResult = new objects.Label();
            this._aliens = new Array<objects.Alien>();
            this._clouds = new Array<objects.cloud>();
            this._coins = new Array<objects.Coin>();
            for(let cloud = 0; cloud < 5; cloud ++)
            {
                this._clouds.push(new objects.cloud());
            }
            for(let alien = 0; alien < 5; alien ++)
            {
                this._aliens.push(new objects.Alien(config.Game.ASSETS.getResult("alien")));
            }
            for(let coin = 0; coin < 10; coin ++)
            {
                this._coins.push(new objects.Coin(config.Game.ASSETS.getResult("coin")));
            }
            //config.Game.SCORE_BOARD = this._scoreBoard;

            this.Main();
        }

        public Update(): void 
        {   
            this._background.Update();
            this._user.Update();

            this._aliens.forEach(alien => {
                alien.Update();
                managers.Collision.squaredRadiusCheck(this._user, alien, false);
                if(alien.isColliding)
                {
                    //ADD SOUND
                }
            });

            this._clouds.forEach(cloud => {
                cloud.Update();
                managers.Collision.squaredRadiusCheck(this._user, cloud, false);
                if(cloud.isColliding)
                {
                    //ADD SOUND
                }
            });

            this._coins.forEach(coin => {
                coin.Update();
                managers.Collision.squaredRadiusCheck(this._user, coin, false, 100)
                if(coin.isColliding)
                {
                    //ADD SOUND
                    this.removeChild(coin);
                }
            });
        }

        public Main(): void {
            // adds background to the stage
            this.addChild(this._background);
            this.addChild(this._user);
            for (const alien of this._aliens){ this.addChild(alien);};
            for (const cloud of this._clouds){this.addChild(cloud);};
            for (const coin of this._coins){this.addChild(coin);};
            //this.addChild(this._scoreBoard.ScoreLabel);
            // this.addChild(this._showResult);
            this.addChild(this._text);
            
        }//end public Main() method

        public UpdateWinOrLoseCondition() {

                // setTimeout(() => {
                //     this._startPage = new objects.Image(config.Game.ASSETS.getResult("firstPage"), 320, 200, true);
                // }, 5000);
                config.Game.SCENE_STATE = scenes.State.STAGE01;
                managers.Collision.count = 0;
          
        }

    }//end class
}//end module