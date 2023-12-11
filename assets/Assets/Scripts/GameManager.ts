import { _decorator, Component, director, log, Node, Scene } from 'cc';
import { GunController } from "./GunController";
import { Constants } from './data/Constants';
const { ccclass, property } = _decorator;
export enum GameState {
    playing,
    success,
    nextLevel,
    over
}
@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: GunController })
    public gunController: GunController | null = null;
    @property(Node)
    nextUI:Node|null=null;
    
    set curState(value: GameState) {
        switch (value) {
            case GameState.playing:
                setTimeout(() => {
                    if (this.gunController) {
                        this.gunController.setInputActive(true);
                    } else {
                        log("guncontroller empty");
                    }
                })
                break;
            case GameState.success:
                setTimeout(() => {
                    if (this.gunController) {
                        
                    } else {
                        log("guncontroller empty");
                    }
                })
                this.gunController.setInputActive(false);
                this.nextUI.active=true;
                break;
            case GameState.nextLevel:
                director.loadScene("lvl "+Constants.level.toString())
                break;
            case GameState.over:
                this.scheduleOnce(()=>director.loadScene(director.getScene().name))
                break;
        }
    }
    

    start() {
        this.curState = GameState.playing;
        Constants.sceneMoney=100;
        Constants.gameManager=this;
    }


    update(deltaTime: number) {
       
    }
}


