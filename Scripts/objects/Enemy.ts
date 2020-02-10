module objects
{
    export class Enemy extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super("./Assets/images/placeholder.png", 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            
        }      

        // PUBLIC METHODS
        public Start(): void {
            
        }

        public Update(): void {
    
        }

        public Reset(): void {
            
        }
    }
}