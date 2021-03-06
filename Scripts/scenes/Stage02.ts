/**
 * AUTHOR: YERIN AN
 * STUDENT NUMBER: 300947515
 * LAST MODIFIED BY: YERIN AN
 * DATE LAST MODIFIED: APRIL 05
 * PROGRAM DESCRIPTION: SCROLLING GAME
 * REVISON HISTORY: VERSION 03
 */

module scenes {
    export class Stage02 extends objects.Scene {

        //take
        private _scoreBoard: managers.ScoreBoard = new managers.ScoreBoard;
        private _background: objects.Background;
        private _user: objects.User;
        private _clouds: Array<objects.cloud>;
        private _clouds2: Array<objects.cloud>;
        private _aliens: Array<objects.Alien>;
        private _finish: objects.Endpoint;
        private _coins: Array<objects.Coin>;
        private _redCoins: Array<objects.Coin>;
        private _greenCoins: Array<objects.Coin>;
        //private _duck: objects.Image;

        constructor()
        {
            super();
            // initialization
            this._background = new objects.Background();
            this._user = new objects.User();
            this._clouds= new Array<objects.cloud>();
            this._clouds2= new Array<objects.cloud>();
            this._aliens = new Array<objects.Alien>();
            this._finish = new objects.Endpoint();
            this._coins = new Array<objects.Coin>();
            this._redCoins = new Array<objects.Coin>();
            this._greenCoins = new Array<objects.Coin>();
            this.Start();
        }

        public Start(): void 
        {
            // config.Game.SCORE_BOARD = this._scoreBoard;
            // this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this._background = new objects.Background(config.Game.ASSETS.getResult("back2"));
            this._user = new objects.User();
            this._aliens = new Array<objects.Alien>();
            this._clouds = new Array<objects.cloud>();
            this._clouds2 = new Array<objects.cloud>();
            this._coins = new Array<objects.Coin>();
            this._redCoins = new Array<objects.Coin>();
            this._greenCoins = new Array<objects.Coin>();
            this._finish = new objects.Endpoint(config.Game.ASSETS.getResult("finish"));
            //this._duck = new objects.Image(config.Game.ASSETS.getResult("duck"), 320, 200, true);
            
            //this.AddAliens(4);
            for(let cloud = 0; cloud < 10; cloud ++)
            {
                this._clouds.push(new objects.cloud());
            }
            this._clouds.forEach(cloud => {
                cloud.Speed = 1.5;
                cloud.Update();
            });

            for(let cloud = 0; cloud < 10; cloud ++)
            {
                this._clouds2.push(new objects.cloud());
            }
            this._clouds2.forEach(cloud => {
                cloud.Speed = 0.5;
                cloud.Update();
            });

            for(let alien = 0; alien < 10; alien ++)
            {
                this._aliens.push(new objects.Alien(config.Game.ASSETS.getResult("alien")));
            }
            this._aliens.forEach(alien => {
                alien.Speed = 4;
                alien.Update();
            });

            for(let coin = 0; coin < 20; coin ++)
            {
                this._coins.push(new objects.Coin(config.Game.ASSETS.getResult("coin")));
            }
            this._coins.forEach(coin => {
                coin.Speed = 1.5;
                coin.Update();
            });
            for(let coin = 0; coin < 10; coin ++)
            {
                this._redCoins.push(new objects.Coin(config.Game.ASSETS.getResult("redCoin")));
            }
            this._redCoins.forEach(coin => {
                coin.Speed = 1;
                coin.Update();
            });
            for(let coin = 0; coin < 5; coin ++)
            {
                this._greenCoins.push(new objects.Coin(config.Game.ASSETS.getResult("greenCoin")));
            }
            this._greenCoins.forEach(coin => {
                coin.Speed = 0.5;
                coin.Update();
            });
            this._finish.Dx = 4500;
            this._finish.Dy = 200;
            config.Game.SCORE_BOARD = this._scoreBoard;
            config.Game.MISSON = 2000;
            console.log(config.Game.MISSON)
            this._scoreBoard.MissionCoin = config.Game.MISSON;
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;

            this.Main();
        }//and Start method

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
                    createjs.Sound.play("monsterSound");
                }
            });

            this._clouds.forEach(cloud => {
                cloud.Update();
                managers.Collision.AABBCheckWithoutP(this._user, cloud);
                if(cloud.isColliding)
                {
                    //ADD SOUND
                    createjs.Sound.play("cloudSound");
                }
            });

            this._clouds2.forEach(cloud => {
                cloud.Update();
                managers.Collision.AABBCheckWithoutP(this._user, cloud);
                if(cloud.isColliding)
                {
                    //ADD SOUND
                    createjs.Sound.play("coinSound");
                }
            });

            this._coins.forEach(coin => {
                coin.Update();
                managers.Collision.AABBCheck(this._user, coin, 100, true)
                if(coin.isColliding)
                {
                    //ADD SOUND
                    createjs.Sound.play("coinSound");
                    this.removeChild(coin);
                }
            });

            this._redCoins.forEach(coin => {
                coin.Update();
                managers.Collision.AABBCheck(this._user, coin, 200, true)
                if(coin.isColliding)
                {
                    //ADD SOUND
                    createjs.Sound.play("coinSound");
                    this.removeChild(coin);
                }
            });

            this._greenCoins.forEach(coin => {
                coin.Update();
                managers.Collision.AABBCheck(this._user, coin, 300, true)
                if(coin.isColliding)
                {
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

            if(this._finish.isColliding)
            {
                if(config.Game.SCORE_BOARD.Score >= config.Game.MISSON)
                {
                    config.Game.MISSON = 0;
                    config.Game.ENDSCENE = true;
                    config.Game.SCENE_STATE = scenes.State.END;
                }
                else
                {
                    config.Game.MISSON = 0;
                    config.Game.SCENE_STATE = scenes.State.END;
                }
            }
        }//end Update method

        public Main(): void 
        {
            this.addChild(this._background);
            this.addChild(this._user);
            this.addChild(this._finish);
            for (const alien of this._aliens){ this.addChild(alien);};
            for (const cloud of this._clouds){this.addChild(cloud);};
            for (const cloud of this._clouds2){this.addChild(cloud);};
            for (const coin of this._coins){this.addChild(coin);};
            for (const coin of this._redCoins){this.addChild(coin);};
            for (const coin of this._greenCoins){this.addChild(coin);};
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._scoreBoard.MissionLabel);
            this.addChild(this._scoreBoard.HighScoreLabel);
        }//end Main method

    }//class Stage01
}//end module