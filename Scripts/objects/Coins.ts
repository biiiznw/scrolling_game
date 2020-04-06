module objects 
{
    export class Coin extends GameObject
    {
        private _dx?:number;
        private _dy?:number;
        private _isActive:boolean = false;
        private _high:number = 150;
        private _low:number = 200;

        private _speed : number;
        public get Speed() : number {
            return this._speed;
        }
        public set Speed(v : number) {
            this._speed = v;
        }
        

        constructor(imagePath:Object = config.Game.ASSETS.getResult("placeholder"))
        {
            super(imagePath);
            this.Start();
        }

        protected _checkBounds(): void 
        {
            if(this.x >= 4400 + this.width || this.x <= -150)
            {
                //console.log("cloud " + this.x);
                this.Reset();
            }
            if(this.y >= this._low)
            {
                this._isActive = true;
            }
        }
        
        private _move():void
        {
            this.x -= this._dx;
            if(this._isActive == false)
            {
                this.y += this._speed;
            }
            else
            {
                this.y -= this._speed;
                if(this.y <= this._high) this._isActive =false;
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