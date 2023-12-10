import { _decorator, Component, Node ,ParticleSystem} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ParticalController')
export class ParticalController extends Component {
    @property(ParticleSystem)
    smoke:ParticleSystem|null=null;
    @property(ParticleSystem)
    fire:ParticleSystem|null=null;
   
    

    shotPartical(){
        this.playPartical(this.smoke);
        this.playPartical(this.fire);
    }

    playPartical(particle:ParticleSystem){
        if(particle.isPlaying){
            particle.stop();
        }
        particle.play();
    }
}


