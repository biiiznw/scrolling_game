/**
 * AUTHOR: YERIN AN
 * STUDENT NUMBER: 300947515
 * LAST MODIFIED BY: YERIN AN
 * DATE LAST MODIFIED: APRIL 05
 * PROGRAM DESCRIPTION: SCROLLING GAME
 * REVISON HISTORY: VERSION 02
 */

module objects
{
    export class Alien extends GameObject
    {
        private _died:boolean = false;
        private _limitBottom: number = 300;
        private _horizontalSpeed?:number;
        private _dy: number =0; //speed
        private _dx:number =0;
        private _isActive:boolean = false;

        //PUBLIC PROPERTIES
        set died(status:boolean) {
            this._died = status;
        }

        // CONSTRUCTOR
        constructor(imagePath:Object = config.Game.ASSETS.getResult("placeholder"))
        {
            super(imagePath);
            this.Start();
        }

        protected _checkBounds(): void {
            //console.log("hh" + (config.Game.USERACTIVE + 200))
            if(this.x >= 4300 - this.halfWidth || this.x < -30)
            {
                if(this.x < config.Game.USERACTIVE + 200)
                {
                    this.Reset();
                    console.log("Alien " + this.x);
                }
            }

            if(this.position.x >= 4300)
            {
                this._isActive = true;
                //console.log("end");
            }
            // if(this.x >= config.Game.SCREEN_WIDTH + this.width)
            // {
            //     this.Reset();
            // }
        }

        public Move(): void
        {
            if(this._isActive == false)
            {
                this.x -= 3;
                //this.x -= this._dx;
            }
            else
            {
                this.x += 3;
                //this.x += this._dx;
                if(this.x <= 250) this._isActive =false;
            }
            //this.x -= this._dx;
            this.y = this._limitBottom;
            this.position = new Vector2(this.x, this.y);
        }

        public Start(): void 
        {
            this.scaleX = -1;
            this.Reset();
        }

        public Update(): void
        {
            if(! this._died) {
                this.Move();
                this._checkBounds();
            }
        }

        public Reset(): void 
        {
            this.x =  Math.floor((Math.random() * (4500 - this.width)) + this.halfWidth);
            this.y = this._limitBottom;
            this._dx = Math.floor((Math.random() * 4) -2);
            if(this._dx <= 0)
            {
                this.Reset();
            }
            if(this.x < 640)
            {
                this.x = this.x + 400
            }
        }

        public static RandomRange(min:number, max:number):number
        {
            return Math.random() * (max - min + 1) + min;
        }
    }
}