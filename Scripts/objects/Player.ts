module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _died:boolean = false;
        private _verticalPosition?:number;
        //private _keyPosition:Vector2 = new Vector2(346, 0);
        
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
            
            //this.position = new Vector2(this._keyPosition.x, this._verticalPosition);
            if(config.Game.keyboardManager.moveLeft){
                this.x -=5;
            }
            if(config.Game.keyboardManager.moveRight){
                this.x +=5;
            }
            this.position = new Vector2(this.x, this._verticalPosition);
        }
        // private _keyboardInput(event: KeyboardEvent) {
        //     // PRESS LEFT ARROW OR 'A' KEY
        //     if (event.keyCode == 37 || event.keyCode == 65) {
        //        this._keyPosition.x -= 5;
        //     }
            
        //     // PRESS RIGHT ARROW OR 'D' KEY
        //     else if (event.keyCode == 39 || event.keyCode == 68 ) {
        //         this._keyPosition.x += 5;
        //     }
           
        //  }
        // PUBLIC METHODS
        public Start(): void {
            // this.x = 320;
            // this.y = 430;
            this._verticalPosition = 760; 
        }

        public Update(): void {
            this._move();
            this._checkBounds();
           // this._keyboardInput();






            // let mouseX = config.Game.STAGE.mouseX;
            // let mouseY = config.Game.STAGE.mouseY;

            // this.position = new Vector2(mouseX, mouseY);
            //this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
        }

        public Reset(): void {
            
        }
    }
}