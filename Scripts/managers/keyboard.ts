module managers {
    export class Keyboard {
      // private instance variables
  
      // public instance variables
      public moveForward?: boolean;
      public moveBackward?: boolean;
      public moveLeft?: boolean;
      public moveRight?: boolean;
<<<<<<< HEAD
      public fire?: boolean;
      public enabled?: boolean;
      public paused?: boolean;
      public fireOnce = true;
=======
      public fireGun?: boolean;
      public enabled?: boolean;
      public paused?: boolean;
      public mute?: boolean;
>>>>>>> 9f701af787de9e1e0906320e8b4480116e5ccc52
  
      // constructors
      constructor() {
        this.enabled = true;
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
      }
  
      // private methods
  
      // public methods
      public onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode) {
          case config.Keys.W:
          case config.Keys.UP_ARROW:
            this.moveForward = true;
          break;
  
          case config.Keys.A:
          case config.Keys.LEFT_ARROW:
            this.moveLeft = true;
          break;
  
          case config.Keys.S:
          case config.Keys.DOWN_ARROW:
            this.moveBackward = true;
          break;
  
          case config.Keys.D:
          case config.Keys.RIGHT_ARROW:
            this.moveRight = true;
          break;
  
<<<<<<< HEAD
          case config.Keys.SPACE:
            if (this.fireOnce) {
              this.fire = true;
              this.fireOnce= false;
            console.debug("debug: fire once" + this.fireOnce)
            break;
            } else {
              this.fire = false;
              break;
            }
            
=======
          case config.Keys.FIREGUN:
            this.fireGun = true;
          break;

          case config.Keys.ESCAPE:
            config.Game.SCENE_STATE = scenes.State.END;
          break;

          case config.Keys.MUTE:
            createjs.Sound.stop();
          break;
          
>>>>>>> 9f701af787de9e1e0906320e8b4480116e5ccc52
        }
      }
  
      public onKeyUp(event:KeyboardEvent): void {
        switch(event.keyCode) {
          case config.Keys.W:
          case config.Keys.UP_ARROW:
            this.moveForward = false;
          break;
  
          case config.Keys.A:
          case config.Keys.LEFT_ARROW:
            this.moveLeft = false;
          break;
  
          case config.Keys.S:
          case config.Keys.DOWN_ARROW:
            this.moveBackward = false;
          break;
  
          case config.Keys.D:
          case config.Keys.RIGHT_ARROW:
            this.moveRight = false;
          break;
  
<<<<<<< HEAD
          case config.Keys.SPACE:
            this.fireOnce = true;
            this.fire = false;
=======
          case config.Keys.FIREGUN:
            this.fireGun = false;
          break;

          case config.Keys.ESCAPE:
            config.Game.SCENE_STATE = scenes.State.END;
          break;

          case config.Keys.MUTE:
            createjs.Sound.stop();
>>>>>>> 9f701af787de9e1e0906320e8b4480116e5ccc52
          break;
  
        }
      }
    }
  }