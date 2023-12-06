import { _decorator, Component, Node ,EventMouse,warn,log, Animation, input, Input} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GunController')
export class GunController extends Component {
    @property(Animation)
    animComp: Animation | null = null;

    onLoad(){
        const childGun = this.node.children[0];

        if(childGun){
            this.animComp=childGun.getComponent(Animation);
        }else{
            warn("there is no child");
        }
        
        
    }
    
    update(deltaTime: number) {
        
    }

    setInputActive(active:Boolean){
        if(active){
            input.on(Input.EventType.MOUSE_DOWN,this.onMouseDown,this);
        }
    }

    onMouseDown(event:EventMouse){
        log("mouseDown");
        if(event.getButton() == 0){
            this.playAnimation();
        }
    }


    playAnimation(){
        if(this.animComp){
            this.animComp.play();
        }else{
            warn("no animation component found!");
        }
        
    }
    // playShotAudio(){

    // }
    // playDropAudio(){

    // }

}


