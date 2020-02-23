module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _startButton:objects.Button;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();
            // initialization
            this._startButton = new objects.Button();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            
            this._startButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 320, 400, true);
           
            this.Main();
        }        
        
        public Update(): void 
        {

        }
        
        public Main(): void {
            this.addChild(this._startButton);
    
            this._startButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.PLAY;
            });
        }

        
    }
}