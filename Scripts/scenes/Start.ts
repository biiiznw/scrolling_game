module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _startButton:objects.Button;
        private _background: objects.Background;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();
            // initialization
            this._startButton = new objects.Button();
            this._background = new objects.Background();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this._background = new objects.Background();
            this._startButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 320, 400, true);
           
            this.Main();
        }        
        
        public Update(): void 
        {
            this._background.Update();
        }
        
        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._startButton);
    
            this._startButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.PLAY;
            });
        }

        
    }
}