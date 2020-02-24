module objects
{
    export class Enemy extends GameObject
    {
        private _dy: number =0; //speed
        private _dx:number =0;
        
        // PRIVATE INSTANCE MEMBERS

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super((config.Game.ASSETS.getResult("placeholder1")));

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            if(this.x >= 640 - this.halfWidth)
            {
                this.x = 640 - this.halfWidth;
            }
            if(this.y >=480 + this.height)
            {
                this.Reset();
            }
        }      

        // PUBLIC METHODS
        public Start(): void {
            // this._dy = 3; //speed
            this.Reset();
            
        }

        public Update(): void {
            this.Move();
            this._checkBounds();
        }

        public Reset(): void {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
            this._dx = Math.floor((Math.random() * 4) -2);
            this._dy = Math.floor((Math.random() * 5) +5);
        }

        public Move(): void
        {
            this.x += this._dx;
            this.y += this._dy;
        }
    }
}