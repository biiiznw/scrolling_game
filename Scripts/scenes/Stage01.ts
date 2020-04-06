/**
 * AUTHOR: YERIN AN
 * STUDENT NUMBER: 300947515
 * LAST MODIFIED BY: YERIN AN
 * DATE LAST MODIFIED: APRIL 05
 * PROGRAM DESCRIPTION: SCROLLING GAME
 * REVISON HISTORY: VERSION 03
 */

module scenes {
    export class Stage01 extends objects.Scene {

        //take
        private _scoreBoard: managers.ScoreBoard = new managers.ScoreBoard;
        private _background: objects.Background;
        private _user: objects.User;
        private _clouds: Array<objects.cloud>;
        private _aliens: Array<objects.Alien>;
        //private _flowers: Array<objects.Flower>;
        private _finish: objects.Endpoint;
        private _coins: Array<objects.Coin>;

        constructor()
        {
            super();
            // initialization
            this._background = new objects.Background();
            this._user = new objects.User();
            this._clouds= new Array<objects.cloud>();
            this._aliens = new Array<objects.Alien>();
            //this._flowers = new Array<objects.Flower>();
            this._finish = new objects.Endpoint();
            this._coins = new Array<objects.Coin>();
            this.Start();
        }

        public Start(): void 
        {
            // config.Game.SCORE_BOARD = this._scoreBoard;
            // this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this._background = new objects.Background(config.Game.ASSETS.getResult("back"));
            this._user = new objects.User();
            this._aliens = new Array<objects.Alien>();
            this._clouds = new Array<objects.cloud>();
            this._coins = new Array<objects.Coin>();
            this._finish = new objects.Endpoint(config.Game.ASSETS.getResult("finish"));
            //this.AddAliens(4);
            for(let cloud = 0; cloud < 15; cloud ++)
            {
                this._clouds.push(new objects.cloud());
            }

            for(let alien = 0; alien < 15; alien ++)
            {
                this._aliens.push(new objects.Alien(config.Game.ASSETS.getResult("alien")));
            }

            // for(let flower = 0; flower < 20; flower ++)
            // {
            //     this._flowers.push(new objects.Flower(config.Game.ASSETS.getResult("flower")));
            // }

            for(let coin = 0; coin < 20; coin ++)
            {
                this._coins.push(new objects.Coin());
            }
            config.Game.SCORE_BOARD = this._scoreBoard;
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;

            this.Main();
        }//and Start method

        // public CheckStatus():void
        // {
        //     if (config.Game.SCORE_BOARD.Lives < 0) {
        //         setTimeout(() => {
        //             this.removeChild(this._user);
        //             config.Game.SCENE_STATE = scenes.State.END;
        //         }, 300);
        //     }
        // }

        public Update(): void 
        {
            this._user.Update();
            this._background.Update();
            this._finish.Update();
            

            this._aliens.forEach(alien => {
                alien.Update();
                managers.Collision.AABBCheckWithoutP(this._user, alien)
                if(alien.isColliding)
                {
                    //ADD SOUND
                }
            });

            this._clouds.forEach(cloud => {
                cloud.Update();
                managers.Collision.squaredRadiusCheck(this._user, cloud, true);
                if(cloud.isColliding)
                {
                    //ADD SOUND
                }
            });
            // this._flowers.forEach(flower => {
            //     flower.Update();
            // });
            this._coins.forEach(coin => {
                coin.Update();
                managers.Collision.squaredRadiusCheck(this._user, coin, false, 100)
                if(coin.isColliding)
                {
                    //ADD SOUND
                    this.removeChild(coin);
                }
            });
            managers.Collision.AABBCheck(this._user, this._finish, 0);
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
            
            if(this._finish.isColliding)
            {
                config.Game.ENDSCENE = true;
                config.Game.SCENE_STATE = scenes.State.END;
            }
        }//end Update method

        public Main(): void 
        {
            this.addChild(this._background);
            this.addChild(this._user);
            this.addChild(this._finish);
            // this.addChild(this._scoreBoard.ItemLabel);
            for (const alien of this._aliens){ this.addChild(alien);};
            for (const cloud of this._clouds){this.addChild(cloud);};
            // for (const flower of this._flowers){this.addChild(flower);};
            for (const coin of this._coins){this.addChild(coin);};
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._scoreBoard.HighScoreLabel);
        }//end Main method

    }//class Stage01
}//end module