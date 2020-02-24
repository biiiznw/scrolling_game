module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        //privete _startButton:objects.Button;
        private _player:objects.Player;
        private _enemy1:objects.Enemy;
        private _enemy2:objects.Enemy;
        private _enemy3:objects.Enemy;
        //private _background:createjs.Bitmap;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this._player = new objects.Player;
            this._enemy1 = new objects.Enemy;
            this._enemy2 = new objects.Enemy;
            this._enemy3 = new objects.Enemy;


            this.Start();
        }

        // PUBLIC METHODS

        //initilize 
        public Start(): void 
        {

            this.Main();
        }        
        
        public Update(): void 
        {
            if (this._enemy1.y == 480)
            {
                this._enemy1.y = 100;
            } else
            {
                this._enemy1.y += 1;
            }

            if (this._enemy2.y == 480)
            {
                this._enemy2.y = 50;
            } else
            {
                this._enemy2.y += 2;
            }

            if (this._enemy3.y == 480)
            {
                this._enemy3.y = 50;
            } else
            {
                this._enemy3.y += 2.5;
            }
            this._enemy1.position = new objects.Vector2(this._enemy1.x, this._enemy1.y);
            this._enemy2.position = new objects.Vector2(this._enemy2.x, this._enemy2.y);
            this._enemy3.position = new objects.Vector2(this._enemy3.x, this._enemy3.y);
            console.log("player: " + this._player.x + " " +this._player.y);
            console.log(this._enemy3.x, this._enemy3.y);
            managers.Collision.AABBCheck(this._player, this._enemy1);
            managers.Collision.AABBCheck(this._player, this._enemy2);
            managers.Collision.AABBCheck(this._player, this._enemy3);
            this._player.Update();
        }
        
        public Main(): void {
            this._player = new objects.Player();
            this.addChild(this._player);
            this._enemy1 = new objects.Enemy();
            this._enemy1.x = 150;
            this._enemy1.y = 100;
            this.addChild(this._enemy1);

            this._enemy2 = new objects.Enemy();
            this._enemy2.x = 280;
            this._enemy2.y = 50;
            this.addChild(this._enemy2);

            this._enemy3 = new objects.Enemy();
            this._enemy3.x = 450;
            this._enemy3.y = 70;
            this._enemy3.position = new objects.Vector2(this._enemy3.x, this._enemy3.y);
            this.addChild(this._enemy3);
        }

        
    }
}