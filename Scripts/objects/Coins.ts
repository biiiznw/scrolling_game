module objects 
{
    export class Coin extends GameObject
    {
        private _dx?:number;
        private _dy?:number;
        private _isActive:boolean = false;

        constructor()
        {
            super(config.Game.ASSETS.getResult("coin"));
            this.Start();
        }

        protected _checkBounds(): void 
        {
            if(this.x >= 4400 + this.width || this.x <= -150)
            {
                //console.log("cloud " + this.x);
                this.Reset();
            }
            if(this.y >= 230)
            {
                this._isActive = true;
            }
        }
        
        private _move():void
        {
            this.x -= this._dx;
            if(this._isActive == false)
            {
                this.y += 0.5;
            }
            else
            {
                this.y -= 0.5;
                if(this.y <= 160) this._isActive =false;
            }
            
            this.position = new Vector2(this.x, this.y);
        }

        public Start(): void 
        {
            this.Reset();
        }
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        public Reset(): void 
        {
            this.x =  Math.floor((Math.random() * (4500 - this.width)) + this.halfWidth);
            this.y =  -100;
            //this.velocity = new Vector2(this._horizontalSpeed, this._verticalSpeed);
            this._dx = Math.floor((Math.random() * 5) -2);
            //this._dy = Math.floor((Math.random() * 4) -2);
            if(this._dx <= 0)
            {
                this.Reset();
            }
        }
    }
}