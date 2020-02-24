//IIFE -- Immediately Invoked Function Expression
// mean? is an anonymous self-executing function
let game1 = (function(){
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    // let startLabel:objects.Label;
    // let startButton:objects.Button;
    // let player:objects.Player;
    // let enemy1:objects.Enemy;
    // let enemy2:objects.Enemy;
    // let enemy3:objects.Enemy;
    // let background:createjs.Bitmap;
    let assets: createjs.LoadQueue; 
    let currentSceneState: scenes.State;
    let currentScene: objects.Scene;  

    let assetManifast = [
        {id: "placeholder", src: "./Assets/images/placeholder.png"},
        {id: "placeholder1", src: "./Assets/images/placeholder1.png"},
        {id: "startButton", src: "./Assets/images/startButton.png"},
        // {id: "nextButton", src: "./Assets/images/nextButton.png"},
        // {id: "backButton", src: "./Assets/images/backButton.png"},
        // {id: "ocean", src: "./Assets/images/ocean.gif"},
        // {id: "plane", src: "./Assets/images/plane.png"}
    ];

    // comments from Tom
    function Preload():void
    {
        assets = new createjs.LoadQueue();
        config.Game.ASSETS = assets;
        assets.installPlugin(createjs.Sound);
        assets.loadManifest(assetManifast);

        assets.on("complete", Start);
    }


    /**
     * Perform Initialization in the Start function
     *
     */
    function Start():void
    {
        console.log(`%c Game Started`, "color: blue; font-size:20px;");
        stage = new createjs.Stage(canvas);
        config.Game.STAGE = stage; // create a reference to the Global Stage
        createjs.Ticker.framerate = 60; // declare the framerate as 60FPS
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE_STATE = scenes.State.START;
    }

    /**
     * This is the main Game Loop
     * This function 'triggers' every frame
     */
    function Update():void
    {
        if(currentSceneState != config.Game.SCENE_STATE)
        {
            Main();
        }

        currentScene.Update();
        stage.update();
    }

    /**
     * This function is the main function of the game
     *
     */
    function Main():void
    {
        console.log(`%c Switching Scenes`, "color: green; font-size:16px;");

        // cleanup
        if(currentSceneState != scenes.State.NO_SCENE)
        {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }

        // state machine
        switch(config.Game.SCENE_STATE)
        {
            case scenes.State.START:
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                currentScene = new scenes.End();
                break;

        }

        // add the scene to the stage and setup the current scene
        stage.addChild(currentScene);
        currentSceneState = config.Game.SCENE_STATE;

    }

    window.addEventListener("load", Preload);

})();