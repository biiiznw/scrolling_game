"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PRIVATE INSTANCE MEMBERS
        // private playLabel:objects.Label;
        // private nextButton:objects.Button;
        // private  _ocean:objects.Ocean;
        // private _plane:objects.Plane;
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            // initialization
            // this.playLabel = new objects.Label();
            // this.nextButton = new objects.Button();
            // this._ocean = new objects.Ocean();
            // this._plane = new objects.Plane();
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        //initilize 
        Play.prototype.Start = function () {
            // this.playLabel = new objects.Label("Place Scene", "80px","Consolas", "#FFFF00", 320, 200, true);
            // this.nextButton = new objects.Button(config.Game.ASSETS.getResult("nextButton"), 320, 400, true);
            // this._ocean = new objects.Ocean();
            // this._plane = new objects.Plane();
            // this._plane.position.y =430;
            this.Main();
        };
        Play.prototype.Update = function () {
            // this._ocean.Update();
            // this._plane.Update();
        };
        Play.prototype.Main = function () {
            // this.addChild(this._ocean);
            // this.addChild(this._plane);
            // this.addChild(this.playLabel);
            // this.addChild(this.nextButton);
            // this.nextButton.on("click", function() {
            //    config.Game.SCENE_STATE = scenes.State.END;
            // });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map