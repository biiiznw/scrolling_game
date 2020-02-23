"use strict";
//IIFE -- Immediately Invoked Function Expression
// mean? is an anonymous self-executing function
var game = (function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var startLabel;
    var startButton;
    var player;
    var enemy1;
    var enemy2;
    var enemy3;
    var background;
    var assetManifast = [
        // {id: "placeholder", src: "./Assets/images/placeholder.png"},
        { id: "startButton", src: "./Assets/images/startButton.png" },
    ];
    // comments from Tom
    /**
     * Perform Initialization in the Start function
     *
     */
    function Start() {
        console.log("%c Game Started", "color: blue; font-size:20px;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // declare the framerate as 60FPS
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Main();
    }
    /**
     * This is the main Game Loop
     * This function 'triggers' every frame
     */
    function Update() {
        if (enemy1.y == 480) {
            enemy1.y = 100;
        }
        else {
            enemy1.y += 1;
        }
        if (enemy2.y == 480) {
            enemy2.y = 50;
        }
        else {
            enemy2.y += 2;
        }
        if (enemy3.y == 480) {
            enemy3.y = 50;
        }
        else {
            enemy3.y += 2.5;
        }
        enemy1.position = new objects.Vector2(enemy1.x, enemy1.y);
        enemy2.position = new objects.Vector2(enemy2.x, enemy2.y);
        enemy3.position = new objects.Vector2(enemy3.x, enemy3.y);
        console.log("player: " + player.x + " " + player.y);
        console.log(enemy3.x, enemy3.y);
        managers.Collision.AABBCheck(player, enemy1);
        managers.Collision.AABBCheck(player, enemy2);
        managers.Collision.AABBCheck(player, enemy3);
        player.Update();
        stage.update();
    }
    /**
     * This function is the main function of the game
     *
     */
    function Main() {
        console.log("%c Main Started", "color: green; font-size:16px;");
        background = new createjs.Bitmap('./Assets/images/background.png');
        stage.addChild(background);
        // startLabel = new objects.Label("The Game", "80px","Consolas", "#000000", 320, 200, true);
        // stage.addChild(startLabel);
        // startButton = new objects.Button("./Assets/images/startButton.png", 320, 400, true);
        // stage.addChild(startButton);
        // startButton.on("click", function() {
        //    console.log("Start Clicked!");
        // });
        player = new objects.Player();
        stage.addChild(player);
        enemy1 = new objects.Enemy();
        enemy1.x = 150;
        enemy1.y = 100;
        stage.addChild(enemy1);
        enemy2 = new objects.Enemy();
        enemy2.x = 280;
        enemy2.y = 50;
        stage.addChild(enemy2);
        enemy3 = new objects.Enemy();
        enemy3.x = 450;
        enemy3.y = 70;
        enemy3.position = new objects.Vector2(enemy3.x, enemy3.y);
        stage.addChild(enemy3);
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map