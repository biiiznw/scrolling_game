//IIFE -- Immediately Invoked Function Expression
// mean? is an anonymous self-executing function
/**
 * AUTHOR: YERIN AN
 * STUDENT NUMBER: 300947515
 * LAST MODIFIED BY: YERIN AN
 * DATE LAST MODIFIED: APRIL 05
 * PROGRAM DESCRIPTION: SCROLLING GAME
 * REVISON HISTORY: VERSION 03
 */
let game1 = (function () {
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;
    let assets: createjs.LoadQueue;
    let currentSceneState: scenes.State;
    let currentScene: objects.Scene;
    let keyboardManager: managers.Keyboard;

    let assetManifast = [
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "returnButton", src: "./Assets/images/restartButton.png" },
        { id: "back", src: "./Assets/images/back.png" },
        { id: "movement01", src: "./Assets/images/move03.png" },
        { id: "movement02", src: "./Assets/images/move02.png" },
        { id: "movement03", src: "./Assets/images/move01.png" },
        { id: "alien", src: "./Assets/images/alien.png" },
        { id: "cloud", src: "./Assets/images/cloud.png" },
        { id: "flower", src: "./Assets/images/flower.png" },
        { id: "finish", src: "./Assets/images/finish.png" },
        { id: "coin", src: "./Assets/images/coin.png" },
        { id: "redCoin", src: "./Assets/images/redCoin.png" },
        { id: "greenCoin", src: "./Assets/images/greenCoin.png" },
        { id: "firstScreen", src: "./Assets/images/firstPage.png" },
        { id: "tutorial", src: "./Assets/images/TutorialButton.png" },
        { id: "duck", src: "./Assets/images/duck.png" },
        { id: "screen", src: "./Assets/images/duggy.png" },
        { id: "back2", src: "./Assets/images/back2.png" },
        { id: "item", src: "./Assets/images/item.png" },
        { id: "totoro", src: "./Assets/images/totoro.png" },

        //Sounds
        { id: "startSound", src: "./Assets/sounds/background.wav" },
        { id: "cloudSound", src: "./Assets/sounds/cloud.wav" },
        { id: "coinSound", src: "./Assets/sounds/coin.wav" },
        { id: "jumpSound", src: "./Assets/sounds/jump.mp3" },
        { id: "monsterSound", src: "./Assets/sounds/monster.mp3" },
        
    ];

    // comments from Tom
    function Preload(): void {
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
    function Start(): void {
        console.log(`%c Game Started`, "color: blue; font-size:20px;");
        stage = new createjs.Stage(canvas);
        config.Game.STAGE = stage; // create a reference to the Global Stage
        createjs.Ticker.framerate = 60; // declare the framerate as 60FPS
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE_STATE = scenes.State.START;
        keyboardManager = new managers.Keyboard();
        config.Game.keyboardManager = keyboardManager;
    }

    /**
     * This is the main Game Loop
     * This function 'triggers' every frame
     */
    function Update(): void {
        if (currentSceneState != config.Game.SCENE_STATE) {
            Main();
        }

        currentScene.Update();
        stage.update();
    }

    /**
     * This function is the main function of the game
     *
     */
    function Main(): void {
        console.log(`%c Switching Scenes`, "color: green; font-size:16px;");
        // cleanup
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }

        // state machine
        switch (config.Game.SCENE_STATE) {
            case scenes.State.START:
                currentScene = new scenes.Start();
                break;
            case scenes.State.STAGE01:
                    currentScene = new scenes.Stage01();
                    break;
            case scenes.State.TUTORIAL:
                currentScene = new scenes.Tutorial();
                break;
            case scenes.State.STORY:
                currentScene = new scenes.Story();
                break;
            case scenes.State.STAGE02:
                currentScene = new scenes.Stage02();
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