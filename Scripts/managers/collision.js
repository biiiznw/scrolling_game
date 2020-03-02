"use strict";
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.Check = function (object1, object2) {
            var P1 = new calculate.Vec2(object1.x, object1.y);
            var P2 = new calculate.Vec2(object2.x, object2.y);
            if (calculate.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    this.live--;
                    console.log("Attack " + this.live);
                    object2.isColliding = true;
                    if (!config.Game.keyboardManager.mute) {
                        createjs.Sound.play("./Assets/sounds/crashPlayer.wav");
                    }
                    // config.Game.SCENE_STATE = scenes.State.END;
                }
            }
            else {
                object2.isColliding = false;
            }
        }; //end check
        Collision.squaredRadiusCheck = function (object1, object2) {
            var sqrDistance = objects.Vector2.sqrDistance(object1.position, object2.position);
            var radii = object1.halfWidth + object2.halfWidth;
            if (sqrDistance < (radii * radii)) {
                if (!object2.isColliding) {
                    console.log("Collision!");
                    object2.isColliding = true;
                }
            }
            else {
                object2.isColliding = false;
            }
        };
        Collision.AABBCheck = function (object1, object2) {
            var object1Offset = new objects.Vector2(0, 0);
            var object2Offset = new objects.Vector2(0, 0);
            if (object1.isCentered) {
                object1Offset.x = object1.halfWidth;
                object1Offset.y = object1.halfHeight;
            }
            if (object2.isCentered) {
                object2Offset.x = object2.halfWidth;
                object2Offset.y = object2.halfHeight;
            }
            var object1TopLeft = objects.Vector2.subtract(object1.position, object1Offset);
            var object2TopLeft = objects.Vector2.subtract(object2.position, object2Offset);
            if (object1TopLeft.x < object2TopLeft.x + object2.width &&
                object1TopLeft.x + object1.width > object2TopLeft.x &&
                object1TopLeft.y < object2TopLeft.y + object2.height &&
                object1TopLeft.y + object1.height > object2TopLeft.y) {
                if (!object2.isColliding) {
                    Collision.count += 1;
                    console.log("Collision!");
                    object2.isColliding = true;
                    createjs.Sound.play("./Assets/sounds/crash.wav");
                    console.log("Kill enemies" + Collision.count);
                    //alert("You died!")
                    // config.Game.SCENE_STATE = scenes.State.END;
                }
            }
            else {
                object2.isColliding = false;
            }
        };
        Collision.count = 0;
        Collision.live = 3;
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map