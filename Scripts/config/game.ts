module config
{  
    export class Game
    {
        public static STAGE: createjs.Stage;
        public static SCENE_STATE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static SCREEN_WIDTH:number = 5120;
        public static SCREEN_HEIGHT:number = 400;
        public static keyboardManager: managers.Keyboard;
        public static LIVES:number = 3;
        public static SCORE: number = 0;
        public static HIGH_SCORE: number = 0;
        public static ANTIBOOMITEM: number = 0;
        public static STATUS: boolean;
        public static SCORE_BOARD: managers.ScoreBoard;
        public static IMAGE: objects.Button;
        public static ENDSCENE: boolean = false;
        public static BACKGROUND: number;
        public static USERACTIVE: number;
        public static LASTTIME:number;
        public static CURRENTTIME:number;
    }
}