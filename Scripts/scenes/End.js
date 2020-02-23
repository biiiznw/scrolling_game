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
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PRIVATE INSTANCE MEMBERS
        // private endLabel:objects.Label;
        // private _backButton:objects.Button;
        // private  _ocean:objects.Ocean;
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function End() {
            var _this = _super.call(this) || this;
            // // initialization
            // this.endLabel = new objects.Label();
            // this._backButton = new objects.Button();
            // this._ocean = new objects.Ocean();
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        End.prototype.Start = function () {
            // this.endLabel = new objects.Label("End Scene", "80px","Consolas", "#FFFF00", 320, 200, true);
            // this._backButton = new objects.Button(config.Game.ASSETS.getResult("backButton"), 320, 400, true);
            this.Main();
        };
        End.prototype.Update = function () {
            // this._ocean.Update();
        };
        End.prototype.Main = function () {
            // this.addChild(this._ocean);
            // this.addChild(this.endLabel);
            // this.addChild(this._backButton);
            // this._backButton.on("click", function() {
            //    config.Game.SCENE_STATE = scenes.State.PLAY;
            // });
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map