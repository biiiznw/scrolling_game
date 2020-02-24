module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.ASSETS.getResult("player"),0,0,true);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            
        }      

        // PUBLIC METHODS
        public Start(): void {
            
        }

        public Update(): void {
            let mouseX = config.Game.STAGE.mouseX;
            let mouseY = config.Game.STAGE.mouseY;

            this.position = new Vector2(mouseX, mouseY);
            //this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
        }

        public Reset(): void {
            
        }
    }
}