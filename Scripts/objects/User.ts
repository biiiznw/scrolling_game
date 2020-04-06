module objects
{
    export class User extends GameObject
    {

        // PRIVATE INSTANCE MEMBERS
        private _died:boolean = false;
        private _limitY: number = 210;
        private _limitBottom: number = 270;
        private _startPoint: number = 100;
        private _endPoint: number = 4500;
        private _limitScreen: number = 150;
        private _keyPress:boolean = false;
        private _keyUp:boolean = false;
        private _keyRight:boolean = false;
        private _xPosition?:number;
        private _screenSize:number = 5120;
        private _isActive:boolean = false;
        static jcount:number = 0;

        set died(status:boolean) {
            this._died = status;
        }

        // CONSTRUCTOR
        //imagePath:Object = config.Game.ASSETS.getResult("movement01")
        constructor(imagePath:Object = config.Game.ASSETS.getResult("movement01"))
        {
            super(imagePath);
            this.Start();
        }

        public Options():void
        {
            if(config.Game.keyboardManager.escape){
                config.Game.SCENE_STATE = scenes.State.END;
                config.Game.STATUS = true;
            }
            else{
                config.Game.STATUS = false;
            }
        }

        private _move(): void
        {

            if(config.Game.keyboardManager.moveRight){
                // this._keyRight = true;
                //this.y = this._limitBottom;
                if(this.x >= this._limitScreen)
                {
                    this.x = this._limitScreen;
                    config.Game.USERACTIVE += 5;
                    //config.Game.BACKGROUND
                    //console.log("config.Game.BACKGROUND " + config.Game.BACKGROUND)
                }
                else{
                    this.x +=5;
                    config.Game.USERACTIVE = this.x;
                    //console.log("config.Game.USERACTIVE " + config.Game.USERACTIVE)
                }
                this.scaleX = 1;
            }
            //this.position = new Vector2(this.x, this.y);
            //jump
            if(config.Game.keyboardManager.moveForward){
                this._keyUp = true;
                if(this.y >= this._limitY)
                {
                    this.y -= 5;
                    this.position = new Vector2(this.x, this.y);
                    this._isActive = true;
                    console.log("???")

                }
                if(this.y < this._limitY)
                {
                    //this.y = this._limitBottom;
                    console.log("jaaa")
                    this._keyPress = true;
                    this.Reset();
                    //console.log("jaaa")
                }
                // if(this.y > this._limitBottom)
                // {
                //     this._keyPress = false;
                //     console.log("dddddd")
                //     //this.Reset();
                // }
            }
            this.position = new Vector2(this.x, this.y);
            this._keyRight = false;
        }

        protected _checkBounds(): void 
        {
            if(this.position.x <= this._startPoint)
            {
                this.position = new Vector2(this._startPoint, this.position.y);
            }
            // // right boundary
            if(this.position.x >= this._endPoint)
            {
                this.position = new Vector2(this._endPoint, this.position.y);
            }
        }

        public Start(): void 
        {
            this.x = this._startPoint;
            this.y = this._limitBottom;
            this.position = new Vector2(this.x, this.y);
        }

        public Update(): void 
        {
            let lastKeyTime;
            let currentTime;
            //this.Reset();
            
            if(this._keyRight == true) 
            {
                this.Reset();
            }  
            document.addEventListener('keydown', () => 
            {
                // lastKeyTime =Date.now();
                // config.Game.LASTTIME = lastKeyTime;
                if(config.Game.keyboardManager.moveRight && config.Game.keyboardManager.moveForward)
                {
                    lastKeyTime =Date.now();
                    config.Game.LASTTIME = lastKeyTime;
                }
                //User.jcount += 1;
                //console.log("Jump " + User.jcount)
            });

            this._move();
            this._checkBounds();
            this.Options();
            
            document.addEventListener('keyup', () => 
            {
                currentTime =Date.now();
                config.Game.CURRENTTIME = currentTime;
                this.position = new Vector2(this.position.x, this._limitBottom);
            });

            if(config.Game.CURRENTTIME - config.Game.LASTTIME >= 150)
            {
                console.log("ZZZ")
                this._keyPress = true;
                this.Reset();
            } 
        }

        public Reset(): void 
        {
            if(this._keyPress == true || this._isActive == true)
            {
                if(this.y < this._limitBottom && this.y > this._limitY)
                {
                    console.log("chekc")
                    this.y -= 5;
                    if(this.y > this._limitBottom) this.y = this._limitBottom;
                }
                else if(this.y <= this._limitY) {
                    this.y += 5;
                }
                else this._isActive = false;
                // if(this.y < this._limitBottom) this._keyPress = false;
            }
            else if (this.y > this._limitBottom && this._keyUp == true) this._move();
            else {
                console.log("ZZZ")
                if(this._keyUp == true) this.y -= 5;
                // {
                    
                    //this._move();
                    //this._keyUp = false;
                // }
                // else this.y = this._limitBottom;
            }
            this.position = new Vector2(this.position.x, this.y);
        }
        
    }
}