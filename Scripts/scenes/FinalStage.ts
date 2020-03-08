module scenes
{
    export class FinalStage extends objects.Scene
    {
        private _background: objects.Background;

        constructor()
        {
            super();
            this._background = new objects.Background();

            this.Start();
        }

        public Start(): void {
            this._background = new objects.Background(config.Game.ASSETS.getResult("background"));
            
        }        
        public Update(): void {
            this._background.Update();
            
        }
        public Main(): void {
            this.addChild(this._background);
            
        }

    }
}