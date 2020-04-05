module objects
{
    export class Endpoint extends GameObject
    {
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
            this.Reset();
        }
        public Update(): void 
        {
            if(config.Game.keyboardManager.moveRight) this.alpha = 1;
            this.Reset();   
        }
        public Reset(): void 
        {
            this.x = 4500;
            this.x += config.Game.BACKGROUND;
            this.y = 200;
            this.position = new Vector2(this.x, this.y);
        }
    }
}