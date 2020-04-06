module managers
{
    export class Collision
    {
        static count:number = 0;
        // static enemy:objects.Enemy;
        //static live:number = 100;

        public static _checkHighScore()
        {
            if(config.Game.SCORE > config.Game.HIGH_SCORE)
            {
                config.Game.HIGH_SCORE = config.Game.SCORE;
            }
        }

        public static Check(object1: objects.GameObject, object2: objects.GameObject)
        {
            let P1: calculate.Vec2 = new calculate.Vec2(object1.x, object1.y);
            let P2: calculate.Vec2 = new calculate.Vec2(object2.x, object2.y);

            if(calculate.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight))
            {
                
                if(!object2.isColliding)
                {
                    if(config.Game.SCORE_BOARD.Lives > 0)
                    {
                        config.Game.SCORE_BOARD.Lives -= 1;
                        console.log("Attack " + config.Game.SCORE_BOARD.Lives);
                        object2.isColliding = true;
                        //createjs.Sound.play("./Assets/sounds/crashPlayer.wav");
                    }
                }
            }
            else
            {
                object2.isColliding = false;
            }

        }//end check

        public static squaredRadiusCheck(object1:objects.GameObject, object2:objects.GameObject, life:boolean = false, point:number =0):boolean
        {
            // squared radius check
            let radii = object1.halfHeight + object2.halfHeight;

            if(objects.Vector2.sqrDistance(object1.position, object2.position) < (radii * radii))
            {
                if(!object2.isColliding)
                    {
                        if(life == true)
                        {
                            config.Game.SCORE_BOARD.Lives -=1;
                        }
                        if((config.Game.SCENE_STATE != scenes.State.TUTORIAL))
                        {
                            config.Game.SCORE_BOARD.Score += point;
                        }
                        // console.log("Attack BlackHole" + config.Game.SCORE_BOARD.Lives);
                        // createjs.Sound.play("./Assets/sounds/crash.wav");
                        object2.isColliding = true;
                        return true;
                    }
            }
            else
            {
                object2.isColliding = false;
            }
            return false;
        }

        public static circleRadiusCheck(object1:objects.GameObject, object2:objects.GameObject, life:boolean = false, point:number =0):boolean
        {
            // squared radius check
            let radii = object1.halfHeight + object2.halfHeight;

            if(objects.Vector2.circleDistance(object1.position, object2.position) < (radii * radii))
            {
                if(!object2.isColliding)
                    {
                        if(life == true)
                        {
                            config.Game.SCORE_BOARD.Lives -=1;
                        }
                        if((config.Game.SCENE_STATE != scenes.State.TUTORIAL))
                        {
                            config.Game.SCORE_BOARD.Score += point;
                        }
                        // console.log("Attack BlackHole" + config.Game.SCORE_BOARD.Lives);
                        // createjs.Sound.play("./Assets/sounds/crash.wav");
                        object2.isColliding = true;
                        return true;
                    }
            }
            else
            {
                object2.isColliding = false;
            }
            return false;
        }

        public static AABBCheck(object1:objects.GameObject, object2:objects.GameObject, point: number = 0, died:boolean = false)
        {
            let object1Offset = new objects.Vector2(0, 0);
            let object2Offset = new objects.Vector2(0, 0);

            if(object1.isCentered)
            {
                object1Offset.x = object1.halfWidth;
                object1Offset.y = object1.halfHeight;
            }

            if(object2.isCentered)
            {
                object2Offset.x = object2.halfWidth;
                object2Offset.y = object2.halfHeight;
            }

            let object1TopLeft = objects.Vector2.subtract(object1.position, object1Offset);
            let object2TopLeft = objects.Vector2.subtract(object2.position, object2Offset);

            if(object1TopLeft.x < object2TopLeft.x + object2.width &&
                object1TopLeft.x + object1.width > object2TopLeft.x &&
                object1TopLeft.y < object2TopLeft.y + object2.height &&
                object1TopLeft.y + object1.height > object2TopLeft.y)
            {
                if(!object2.isColliding)
                {
                    Collision.count += 1;
                    //console.log("Collision!");
                    object2.isColliding = true;
                    //console.log("Kill enemies"+ Collision.count);
                    if((config.Game.SCENE_STATE != scenes.State.TUTORIAL) && (died == true))
                    {
                        config.Game.SCORE_BOARD.Score += point;
                    }
                }
                this._checkHighScore()
            }
            else
            {
                object2.isColliding = false;
            }
        }

        public static AABBCheckWithoutP(object1:objects.GameObject, object2:objects.GameObject)
        {
            let object1Offset = new objects.Vector2(0, 0);
            let object2Offset = new objects.Vector2(0, 0);

            if(object1.isCentered)
            {
                object1Offset.x = object1.halfWidth;
                object1Offset.y = object1.halfHeight;
            }

            if(object2.isCentered)
            {
                object2Offset.x = object2.halfWidth;
                object2Offset.y = object2.halfHeight;
            }

            let object1TopLeft = objects.Vector2.subtract(object1.position, object1Offset);
            let object2TopLeft = objects.Vector2.subtract(object2.position, object2Offset);

            if(object1TopLeft.x < object2TopLeft.x + object2.width &&
                object1TopLeft.x + object1.width > object2TopLeft.x &&
                object1TopLeft.y < object2TopLeft.y + object2.height &&
                object1TopLeft.y + object1.height > object2TopLeft.y)
            {
                if(!object2.isColliding)
                {
                    //Collision.count += 1;
                    //console.log("Collision!");
                    config.Game.SCORE_BOARD.Lives -=1;
                    object2.isColliding = true;
                }
                this._checkHighScore()
            }
            else
            {
                object2.isColliding = false;
            }
        }
    }
}