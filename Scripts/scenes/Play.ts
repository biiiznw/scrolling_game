module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        // private playLabel:objects.Label;
        // private nextButton:objects.Button;
        // private  _ocean:objects.Ocean;
        // private _plane:objects.Plane;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            // this.playLabel = new objects.Label();
            // this.nextButton = new objects.Button();
            // this._ocean = new objects.Ocean();
            // this._plane = new objects.Plane();

            this.Start();
        }

        // PUBLIC METHODS

        //initilize 
        public Start(): void 
        {
            // this.playLabel = new objects.Label("Place Scene", "80px","Consolas", "#FFFF00", 320, 200, true);
            // this.nextButton = new objects.Button(config.Game.ASSETS.getResult("nextButton"), 320, 400, true);
            // this._ocean = new objects.Ocean();
            // this._plane = new objects.Plane();
            // this._plane.position.y =430;
           
            this.Main();
        }        
        
        public Update(): void 
        {
            // this._ocean.Update();
            // this._plane.Update();
        }
        
        public Main(): void {
            // this.addChild(this._ocean);
            // this.addChild(this._plane);

            
            // this.addChild(this.playLabel);
            // this.addChild(this.nextButton);
    
            // this.nextButton.on("click", function() {
            //    config.Game.SCENE_STATE = scenes.State.END;
            // });
        }

        
    }
}