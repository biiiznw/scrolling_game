"use strict";
var scenes;
(function (scenes) {
    let State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["TUTORIAL"] = 1] = "TUTORIAL";
        State[State["STAGE01"] = 2] = "STAGE01";
        State[State["STORY"] = 3] = "STORY";
        State[State["STAGE02"] = 4] = "STAGE02";
        State[State["COMPLETE"] = 5] = "COMPLETE";
        State[State["END"] = 6] = "END";
        State[State["NUM_OF_SCENES"] = 7] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map