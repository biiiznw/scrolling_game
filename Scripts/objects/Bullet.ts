module objects 
{
    export class Bullet extends GameObject
    {

        // private _fireRate:number=0;
        // private _fireTimer:number=0;

         // constructor
         constructor(
            imagePath:Object = config.Game.ASSETS.getResult("beam2"), 
            x:number = 0, y:number = 0, isCentered:boolean = true)
        {
            super(imagePath, x, y, isCentered);

            this.Start();
        }


        protected _checkBounds(): void 
        {

        }        
        public Start(): void {
            
        }
        public Update(): void {

        }
        public Reset(): void {
            
        }

        // public OneShot():void{
        //     //shot
        // }
        
    }
}