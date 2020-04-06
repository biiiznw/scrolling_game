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

        //Sounds
        { id: "playSound", src: "./Assets/sounds/BackSound.mp3" },
        { id: "startSound", src: "./Assets/sounds/BackSound.mp3" },
        { id: "crashSound", src: "./Assets/sounds/crash.wav" },
        { id: "powerup", src: "./Assets/sounds/PowerUp.wav" },
        { id: "crashSoundP", src: "./Assets/sounds/crashPlayer.wav" },
        { id: "break", src: "./Assets/sounds/break.wav" },
        { id: "powerup", src: "./Assets/sounds/powerup.wav" },

        { id: "back", src: "./Assets/images/back.png" },
        { id: "movement01", src: "./Assets/images/move03.png" },
        { id: "movement02", src: "./Assets/images/move02.png" },
        { id: "movement03", src: "./Assets/images/move01.png" },
        { id: "alien", src: "./Assets/images/WALK_2.png" },
        { id: "cloud", src: "./Assets/images/cloud.png" },
        { id: "flower", src: "./Assets/images/flower.png" },
        { id: "finish", src: "./Assets/images/finish.png" },
        { id: "coin", src: "./Assets/images/coin.png" },
        { id: "firstScreen", src: "./Assets/images/firstPage.png" },
        { id: "tutorial", src: "./Assets/images/TutorialButton.png" },
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
            case scenes.State.COMPLETE:
                currentScene = new scenes.Complete();
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