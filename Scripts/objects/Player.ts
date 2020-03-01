module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _died:boolean = false;
        private _verticalPosition?:number;
        // PUBLIC PROPERTIES
        set died(status:boolean) {
            this._died = status;
        }

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.ASSETS.getResult("player"),0,0,true);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
           
            // left boundary
            if(this.position.x <= this.halfWidth)
            {
                this.position = new Vector2(this.halfWidth, this.position.y);
            }

            // right boundary

            if(this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth)
            {
                this.position = new Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            } 
        }      
        private _move(): void
        {
            let newPositionX = util.Math.Lerp(this.position.x, this.stage.mouseX, 0.05);
            this.position = new Vector2(newPositionX, this._verticalPosition);
        }
        // PUBLIC METHODS
        public Start(): void {
            this._verticalPosition = 430; // locked to the bottom of the screen
        }

        public Update(): void {
            this._move();
            this._checkBounds();





            // let mouseX = config.Game.STAGE.mouseX;
            // let mouseY = config.Game.STAGE.mouseY;

            // this.position = new Vector2(mouseX, mouseY);
            //this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
        }

        public Reset(): void {
            
        }
    }
}