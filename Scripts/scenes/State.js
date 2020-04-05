"use strict";
var scenes;
(function (scenes) {
    let State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["TUTORIAL"] = 1] = "TUTORIAL";
        State[State["STAGE01"] = 2] = "STAGE01";
        State[State["PLAY"] = 3] = "PLAY";
        State[State["STAGE2"] = 4] = "STAGE2";
        State[State["FINALSTAGE"] = 5] = "FINALSTAGE";
        State[State["COMPLETE"] = 6] = "COMPLETE";
        State[State["END"] = 7] = "END";
        State[State["NUM_OF_SCENES"] = 8] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map