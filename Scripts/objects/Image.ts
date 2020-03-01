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
            
        }
        public Update(): void {
            
        }
        public Reset(): void {
          
        }

        
    }
}