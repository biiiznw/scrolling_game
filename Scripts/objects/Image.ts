module objects {
    export class Image extends GameObject {
        constructor (
            imagePath:Object = config.Game.ASSETS.getResult("placeholder"), 
            x:number = 0, y:number = 0, isCentered:boolean = true) 
        {
            super(imagePath, x, y, isCentered);
            this.Start();
        }
        protected _checkBounds(): void {
            
        }        
        public Start(): void {
            this.RandomPoint(false);
        }
        public Update(): void {
            
        }
        public Reset(): void {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
        }

        public RandomPoint(w:boolean): Vector2 {
            if(w == true)
            {
                this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
                this.y = -this.height;
            }
            return new Vector2(this.x, this.y);
        }

        
    }
}