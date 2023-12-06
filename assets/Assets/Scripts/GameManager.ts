import { _decorator, Component, log, Node } from 'cc';
import {GunController}from "./GunController";
const { ccclass, property } = _decorator;
enum GameState{
    
    playing,
    success,
    over
}
@ccclass('GameManager')
export class GameManager extends Component {
    @property({type:GunController})
    public gunController:GunController|null=null;

    set curState(value:GameState){
        switch(value){
            case GameState.playing:
                log("setting playing");
                setTimeout(()=>{
                    if(this.gunController){
                        this.gunController.setInputActive(true);
                    }else{
                        log("guncontroller empty");
                    }
                })
                break;
            
        }
    }
    start() {
        this.curState=GameState.playing;
    }

    
    update(deltaTime: number) {
        
    }
}


