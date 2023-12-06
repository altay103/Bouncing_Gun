import { _decorator, Component, Node ,EventMouse,warn,log,Vec3, Animation, input, Input, instantiate, debug, director } from 'cc';
import { GunData } from './data/GunData';
const { ccclass, property } = _decorator;

@ccclass('GunController')
export class GunController extends Component {
    @property(Animation)
    animComp: Animation | null = null;
    @property(GunData)
    gunData:GunData|null=null;

    onLoad(){
        const childGun = this.node.children[0];
        
        if(childGun){
            this.animComp=childGun.getComponent(Animation);
            this.gunData=childGun.getComponent(GunData);
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
            this.shotBullet();
        }
    }


    playAnimation(){
        if(this.animComp){
            this.animComp.play();
        }else{
            warn("no animation component found!");
        }
        
    }

    shotBullet(){
        if(this.gunData.bullet){
            const bullet: Node = instantiate(this.gunData.bullet);
            const worldMuzzlePos = this.gunData.muzzle.getWorldPosition();
            const worldMuzzleRot = this.gunData.muzzle.getWorldRotation();
            bullet.setWorldPosition(worldMuzzlePos);
            bullet.setWorldRotation(worldMuzzleRot);
            director.getScene().addChild(bullet);
            
            console.log("Bullet created");
        }
    }
    // playShotAudio(){

    // }
    // playDropAudio(){

    // }

}