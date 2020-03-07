"use strict";
var scenes;
(function (scenes) {
    class Stage2 extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            // initialization
            this._player = new objects.Player;
            this._ememies = new Array();
            this._background = new objects.Background();
            this.Start();
        }
        AddEnemies(number) {
            let createEnemy = setInterval(() => {
                if (this._ememies.length < number) {
                    let enemy = new objects.Enemy(config.Game.ASSETS.getResult("enemy02"));
                    this._ememies.push(enemy);
                    this.addChild(enemy);
                    console.log("CREATE");
                    // this.FireGun(enemy, this._enemybullets);
                }
                else {
                    clearInterval(createEnemy);
                }
            }, 1000);
        }
        UpdatePosition() {
            this._ememies.forEach(enemy => {
                this.addChild(enemy);
                enemy.Update();
                // this._enemybullets.forEach((bullet)=>{
                //     managers.Collision.Check(this._player, bullet);
                //     if(bullet.isColliding) {
                //         if(managers.Collision.live <= 0) {
                //             this.ExploreAnimation(this._player.x, this._player.y);
                //         } else {
                //             this.ShieldAnimation(this._player.x, this._player.y);
                //         }
                //         bullet.position = new objects.Vector2(-200,-200);
                //         this.removeChild(bullet);
                //     //config.Game.SCENE_STATE = scenes.State.END;
                //     }
                // });
                // this._bullets.forEach((bullet) => {
                //     managers.Collision.AABBCheck(enemy, bullet);
                //     if(bullet.isColliding) {
                //         this.ExploreAnimation(enemy.x, enemy.y);
                //         enemy.position = new objects.Vector2(-100,-200);
                //         enemy.died = true;
                //         this.removeChild(enemy);
                //         bullet.position = new objects.Vector2(-200,-200);
                //         this.removeChild(bullet);
                //         this._point += 100;
                //     }
                // });
            });
        } //end update positon
        // PUBLIC METHODS
        Start() {
            this._background = new objects.Background();
            this._ememies = new Array();
            this.AddEnemies(2);
            this.Main();
        }
        Update() {
            this._background.Update();
            this._player.Update();
            this.UpdatePosition();
        }
        Main() {
            this.addChild(this._background);
            this.addChild(this._player);
        }
    }
    scenes.Stage2 = Stage2;
})(scenes || (scenes = {}));
//# sourceMappingURL=Stage2.js.map