module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
       
        private _player:objects.Player;
        private _background: objects.Background;
        private _level:objects.Label;
        private _ememies:objects.Enemy[];
        private _playBackSound: createjs.PlayPropsConfig;
        private _bullets: Array<objects.Bullet>;
        private _enemybullets: Array<objects.Bullet>;
        private _numOfEnemy:Number =0;
        private _bulletNum = 20;
        private _bulletNumLabel: objects.Label;


        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();
            // initialization
            this._player = new objects.Player;
            this._level = new objects.Label;
            this._ememies = new Array<objects.Enemy>();
            this._background = new objects.Background();
            this._playBackSound= new createjs.PlayPropsConfig();
            this._bullets = new Array<objects.Bullet>();
            this._enemybullets = new Array<objects.Bullet>();
            this._numOfEnemy;
            this._bulletNum = 20;
            this._bulletNumLabel = new objects.Label();
            this.Start();
        }

        // PUBLIC METHODS

        //initilize 
        public Start(): void 
        {
            this._background = new objects.Background();
            this._level = new objects.Label("Level : 1", "15px","Consolas", "#000000", 50, 20, true);
            //Set Number of Enemies
            this._numOfEnemy =5;
            //unlimited background sound
            this._playBackSound= new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5});
            createjs.Sound.play("playSound", this._playBackSound)
            this._ememies = new Array<objects.Enemy>();
            this._enemybullets = new Array<objects.Bullet>();
            this._bulletNumLabel = new objects.Label("Bullet: 20", "15px", "Consolas", "#fff", 600, 770, true);
            // this._enemyNum =4;
            //Add ememies
            this.AddEnemies(this._numOfEnemy);
            //this.AddEnemies(10, this._enemybullets);
            this.Main();
        }

        public AddEnemies(number:Number):void{
            let createEnemy = setInterval(()=>{
                if(this._ememies.length < number)
                {
                    let enemy = new objects.Enemy();
                    this._ememies.push(enemy);
                    this.addChild(enemy)
                    console.log("CREATE")
                    this.FireGun(enemy, this._enemybullets);
                }
                else {
                    clearInterval(createEnemy)
                }
            }, 1000)
        }
        
        // public AddEnemies(EnemyNum:number):void{
        //     for(let count = 0; count < EnemyNum; count++)
        //     {
        //         this._ememies[count] = new objects.Enemy();
        //     }
        // }

        
        public Update(): void 
        {   
            this._background.Update();
            this._player.Update();
            //this.updateBullet();
            this.UpdatePosition();
            //if player kill all the enemies
            if(managers.Collision.count == this._numOfEnemy)
            {
                config.Game.SCENE_STATE = scenes.State.Stage2;
            }
            //if attacked more than 3 times, game over
            if(managers.Collision.attack == 3)
            {
                this.removeChild(this._player);
                config.Game.SCENE_STATE = scenes.State.END;
            }
        }

        public Main(): void {
            // adds background to the stage
            this.addChild(this._background);
            this.addChild(this._level);
            this._player = new objects.Player();
            this.addChild(this._player);
            this.addChild(this._bulletNumLabel);
            //this.FireGun(this._ememies, this._enemybullets);
            this._player.addEventListener("click", () =>{
                console.log("click");
                this._bulletNum--;
                let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam1"), this._player.x, this._player.y-20, true);
                this._bullets.push(bullet);
                this.addChild(bullet);
                // this.Update();
            });

        }//end public Main() method

        public BulletSpeed(eBullet:objects.Bullet, eSpeed:number, eMove:number, pick:boolean=false):void{
            //enemy direction
            if(pick == true)
            {
                eBullet.y += eSpeed;
                eBullet.position.y += eMove;
                if(eBullet.y >= 800) {
                    this.removeChild(eBullet);
                } 
            }
            //player direction
            else{
                eBullet.y -= eSpeed;
                eBullet.position.y -= eMove;
                if(eBullet.y <= 0) {
                    this.removeChild(eBullet);
                } 
            }
        }

        public UpdatePosition() 
        {
            this._ememies.forEach(enemy => {
                this.addChild(enemy);
                enemy.Update();
                
                enemy.addEventListener("tick", ()=>{
                
                    if(enemy.canShoot())
                    {
                        let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam2"), enemy.x+20, enemy.y+50, true);
                        this._enemybullets.push(bullet);
                        this.addChild(bullet);
                    }
                });
                this._enemybullets.forEach((bullet)=>{
                    this.BulletSpeed(bullet, 3, 1, true);
                    managers.Collision.Check(this._player, bullet);
                    if(bullet.isColliding) {
                        this._player.position = new objects.Vector2(-100,-200);
                        this._player.died = true;
                        bullet.position = new objects.Vector2(-200,-200);
                        this.removeChild(bullet);
                    //config.Game.SCENE_STATE = scenes.State.END;
                    }
                });
                this._bullets.forEach((bullet) => {
                    this.BulletSpeed(bullet, 2, 2, false);
                    managers.Collision.AABBCheck(enemy, bullet);
                    if(bullet.isColliding) {
                        this.ExploreAnimation(enemy.x, enemy.y);
                        enemy.position = new objects.Vector2(-100,-200);
                        enemy.died = true;
                        this.removeChild(enemy);
                        bullet.position = new objects.Vector2(-200,-200);
                        this.removeChild(bullet);
                    }
                });
            //check collision player and enemies
            //managers.Collision.Check(enemy, this._player);
            // if(this._player.isColliding)
            // {
            //     console.log("debug: Player collision");
            //     //createjs.Sound.play("./Assets/sounds/crash.wav");
            //     //config.Game.SCENE_STATE = scenes.State.END;
            //     //createjs.Sound.stop();//
            // }

            });
            
        }//end update positon

        // Shot fire until enemies are colliding
        public FireGun(enemy:objects.Enemy, bullArray:Array<objects.Bullet>):void
        {
            //newArray.forEach(enemy => {
                //this.addChild(enemy);
                    if(enemy.canShoot()){
                        let fire = setInterval(()=>{
                            if(!enemy.isColliding)
                            {
                                let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam2"), enemy.x+20, enemy.y+50, true);
                                bullArray.push(bullet);
                                this.addChild(bullet);
                            }
                            else clearInterval(fire)
                        }, 500)
                    }
            //});
        }//end public FireGun

        // for(var i = 0; i < 3; i++) {
        //     (function(index) {
        //         setTimeout(function() { alert(index); }, index*5000);
        //     })(i);
        // }

        public ExploreAnimation(obX:number, obY:number) {
            let chopperImg1 = document.createElement('img')
            let chopperImg2 = document.createElement('img')
            let chopperImg3 = document.createElement('img')
            let chopperImg4 = document.createElement('img')
            let chopperImg5 = document.createElement('img')
            let chopperImg6 = document.createElement('img')
            let chopperImg7 = document.createElement('img')
            let chopperImg8 = document.createElement('img')
            let chopperImg9 = document.createElement('img')
            let chopperImg10 = document.createElement('img')
            let chopperImg11 = document.createElement('img')
            let chopperImg12 = document.createElement('img')
            let chopperImg13 = document.createElement('img')
            let chopperImg14 = document.createElement('img')
            let chopperImg15 = document.createElement('img')
            let chopperImg16 = document.createElement('img')

            chopperImg1.src = "./Assets/images/e1.png";
            chopperImg2.src = "./Assets/images/e2.png";
            chopperImg3.src = "./Assets/images/e3.png";
            chopperImg4.src = "./Assets/images/e4.png";
            chopperImg5.src = "./Assets/images/e5.png";
            chopperImg6.src = "./Assets/images/e6.png";
            chopperImg7.src = "./Assets/images/e7.png";
            chopperImg8.src = "./Assets/images/e8.png";
            chopperImg9.src = "./Assets/images/e9.png";
            chopperImg10.src = "./Assets/images/e10.png";
            chopperImg11.src = "./Assets/images/e11.png";
            chopperImg12.src = "./Assets/images/e12.png";
            chopperImg13.src = "./Assets/images/e13.png";
            chopperImg14.src = "./Assets/images/e14.png";
            chopperImg15.src = "./Assets/images/e15.png";
            chopperImg16.src = "./Assets/images/e16.png";

                let spriteSheet = new createjs.SpriteSheet({
                    images: [ chopperImg1, chopperImg2, chopperImg3, chopperImg4, chopperImg5,
                        chopperImg6,chopperImg7, chopperImg8, chopperImg9, chopperImg10, 
                        chopperImg11, chopperImg12, chopperImg13, chopperImg14, chopperImg15, chopperImg16],
                    frames: { width: 150, height: 150, count: 17},
                    animations: {
                        explore: [0, 16, false]
                    }
                });
                let animation = new createjs.Sprite(spriteSheet);
                animation.x = obX -65;
                animation.y = obY -50;
                animation.spriteSheet.getAnimation('explore').speed = 0.5;
                animation.gotoAndPlay('explore');

                this.addChild(animation);
            
        }

        public WinOrLoseCondition() {
            this._bulletNumLabel.text = "Bullets: " + this._bulletNum;
            if (this._bulletNum == 0) {
                config.Game.SCENE_STATE = scenes.State.END;
            }

            
        }


    }//end class
}//end module

// // Shot fire until enemies are colliding
// public FireGun(newArray:Array<objects.Enemy>, bullArray:Array<objects.Bullet>):void
// {
//     newArray.forEach(enemy => {
//         this.addChild(enemy);
//             if(enemy.canShoot()){
//                 let fire = setInterval(()=>{
//                     if(!enemy.isColliding)
//                     {
//                         let bullet = new objects.Bullet(config.Game.ASSETS.getResult("beam2"), enemy.x+20, enemy.y+50, true);
//                         bullArray.push(bullet);
//                         this.addChild(bullet);
//                     }
//                     else clearInterval(fire)
//                 }, 500)
//             }
//     });
// }//end public FireGun

            //Update
            // if (this._enemy1.y == 480)
            // {
            //     this._enemy1.y = 100;
            // } else
            // {
            //     this._enemy1.y += 1;
            // }

            // if (this._enemy2.y == 480)
            // {
            //     this._enemy2.y = 50;
            // } else
            // {
            //     this._enemy2.y += 2;
            // }

            // if (this._enemy3.y == 480)
            // {
            //     this._enemy3.y = 50;
            // } else
            // {
            //     this._enemy3.y += 2.5;
            // }
            // this._enemy1.position = new objects.Vector2(this._enemy1.x, this._enemy1.y);
            // this._enemy2.position = new objects.Vector2(this._enemy2.x, this._enemy2.y);
            // this._enemy3.position = new objects.Vector2(this._enemy3.x, this._enemy3.y);
            // console.log("player: " + this._player.x + " " +this._player.y);
            // console.log(this._enemy3.x, this._enemy3.y);
            // managers.Collision.AABBCheck(this._player, this._enemy1);
            // managers.Collision.AABBCheck(this._player, this._enemy2);
            //managers.Collision.AABBCheck(this._player, this._ememies[10]);


            // main
            // this._enemy1 = new objects.Enemy();
            // this._enemy1.x = 150;
            // this._enemy1.y = 100;
            //this.addChild(this._enemy1);

            // this._enemy2 = new objects.Enemy();
            // this._enemy2.x = 280;
            // this._enemy2.y = 50;
            // this.addChild(this._enemy2);

            // this._enemy3 = new objects.Enemy();
            // this._enemy3.x = 450;
            // this._enemy3.y = 70;
            // this._enemy3.position = new objects.Vector2(this._enemy3.x, this._enemy3.y);
            // this.addChild(this._enemy3);