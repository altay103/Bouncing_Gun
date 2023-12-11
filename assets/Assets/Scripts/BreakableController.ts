import { _decorator, BoxCollider, Collider, Component, Layers, log, Material, MeshRenderer, Node, Animation, AudioSource } from 'cc';
import { Constants } from './data/Constants';
import { GameManager, GameState } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('BreakableController')
export class BreakableController extends Component {
    @property(Material)
    material: Material | null = null;
    @property(Boolean)
    rainbow: boolean = false;
    @property(Number)
    bonusRate:number=0;
    private animation: Animation | null = null;
    meshRenderer: MeshRenderer | null = null;
    destoryTime: number = 1;
    start() {
        for (let i = 0; i < this.node.children.length - 1; i++) {
            this.node.children[i].getComponent(MeshRenderer).material = this.material;
        }
        if (this.rainbow) {
            this.node.children[0].getComponent(MeshRenderer);
        }
        const collider: Collider = this.getComponent(BoxCollider);
        this.animation=this.getComponent(Animation);
        collider.on("onTriggerEnter", this.onTriggerEnter, this)

    }
    onTriggerEnter(event: any) {
        if (event.otherCollider.node.name == "Bullet") {
            Constants.bonusRate=this.bonusRate;
            Constants.gameManager.curState=GameState.success;
            if(Constants.sounds){
                this.getComponent(AudioSource).play();
            }
            
            this.animation.play();
            this.schuleDestroy();
            event.otherCollider.node.destroy();
           
        }

    }
    schuleDestroy() {
        this.scheduleOnce(() => {
            this.node.destroy()
        }, this.destoryTime);
    }
    update(deltaTime: number) {

    }
}


