module objects
{
    export class Endpoint extends GameObject
    {
        private _dx:number;
        private _dy:number;


        public get Dy() : number 
        {
            return this._dy;
        }
        public set Dy(v : number) 
        {
            this._dy = v;
        }
        

        public get Dx() : number 
        {
            return this._dx;
        }
        public set Dx(v : number) 
        {
            this._dx = v;
        }
        

        constructor(imagePath:Object = config.Game.ASSETS.getResult("placeholder"))
        {
            super(imagePath)
            this.Start();
        }
        protected _checkBounds(): void 
        {
 
        }
        public Start(): void 
        {
            this.alpha = 0;
            this.scaleX = -1;
            this.Reset();
        }
        public Update(): void 
        {
            if(config.Game.keyboardManager.moveRight) this.alpha = 1;
            this.Reset();   
        }
        public Reset(): void 
        {
            this.x = this._dx;
            this.x += config.Game.BACKGROUND;
            this.y = this._dy;
            this.position = new Vector2(this.x, this.y);
        }
    }
}