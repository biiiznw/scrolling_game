module objects
{
    export class Background extends GameObject
    {
        
        private _startMove:number = 200;
        private currentSceneState: scenes.State;
        
        //constructor
        constructor(imagePath:Object = config.Game.ASSETS.getResult("placeholder")){
            super(imagePath);
            this.Start();
        }

        protected _checkBounds(): void {
            if(this.x >= 4400)
            {
                console.log("end");
            }
        }

        private _move():void
        {
            if(config.Game.SCENE_STATE != scenes.State.START)
            {
                config.Game.USERACTIVE;
                this.x = -(config.Game.USERACTIVE);
            }
            config.Game.BACKGROUND = this.x;
        }

        //public method
        public Start():void
        {
            this.Reset();
        }

        public Update():void
        {
            this._move();
            this._checkBounds();
            
        }

        public Reset():void{
            this.position.x = -4480;
        }
    }
}