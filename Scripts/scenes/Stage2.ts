module scenes
{
    export class Stage2 extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private endLabel:objects.Label;
        private _backButton:objects.Button;
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
            // this._ocean = new objects.Ocean();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this._background = new objects.Background();
            this.endLabel = new objects.Label("Stage2", "80px","Consolas", "#FFFFFF", 320, 200, true);
            //this._backButton = new objects.Button(config.Game.ASSETS.getResult("returnButton"), 320, 400, true);
           
            this.Main();
        }        
        
        public Update(): void 
        {
            // this._ocean.Update();
        }
        
        public Main(): void {
            // this.addChild(this._ocean);
            this.addChild(this._background);
            this.addChild(this.endLabel);
    
            // this.addChild(this._backButton);
    
            // this._backButton.on("click", function() {
            //     config.Game.SCENE_STATE = scenes.State.PLAY;
            //     createjs.Sound.stop();
            // });
        }

        
    }
}
            //Update
            // if (this._enemy1.y == 480)
            // {
            //     this._enemy1.y = 100;
            // } else
            // {
            //     this._enemy1.y += 1;
            // }

            // if (this._enemy2.y == 480)
            // {
            //     this._enemy2.y = 50;
            // } else
            // {
            //     this._enemy2.y += 2;
            // }

            // if (this._enemy3.y == 480)
            // {
            //     this._enemy3.y = 50;
            // } else
            // {
            //     this._enemy3.y += 2.5;
            // }
            // this._enemy1.position = new objects.Vector2(this._enemy1.x, this._enemy1.y);
            // this._enemy2.position = new objects.Vector2(this._enemy2.x, this._enemy2.y);
            // this._enemy3.position = new objects.Vector2(this._enemy3.x, this._enemy3.y);
            // console.log("player: " + this._player.x + " " +this._player.y);
            // console.log(this._enemy3.x, this._enemy3.y);
            // managers.Collision.AABBCheck(this._player, this._enemy1);
            // managers.Collision.AABBCheck(this._player, this._enemy2);
            //managers.Collision.AABBCheck(this._player, this._ememies[10]);


            // main
            // this._enemy1 = new objects.Enemy();
            // this._enemy1.x = 150;
            // this._enemy1.y = 100;
            //this.addChild(this._enemy1);

            // this._enemy2 = new objects.Enemy();
            // this._enemy2.x = 280;
            // this._enemy2.y = 50;
            // this.addChild(this._enemy2);

            // this._enemy3 = new objects.Enemy();
            // this._enemy3.x = 450;
            // this._enemy3.y = 70;
            // this._enemy3.position = new objects.Vector2(this._enemy3.x, this._enemy3.y);
            // this.addChild(this._enemy3);