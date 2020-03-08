"use strict";
var scenes;
(function (scenes) {
    let State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["PLAY"] = 1] = "PLAY";
        State[State["Stage2"] = 2] = "Stage2";
        State[State["FINALSTAGE"] = 3] = "FINALSTAGE";
        State[State["COMPLETE"] = 4] = "COMPLETE";
        State[State["END"] = 5] = "END";
        State[State["NUM_OF_SCENES"] = 6] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map