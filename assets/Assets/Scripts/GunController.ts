import {
    _decorator,
    Component,
    Node,
    EventMouse,
    warn,
    log,
    Animation,
    AudioClip,
    input,
    Input,
    instantiate,
    director,
    AudioSource,
    RigidBody,
    Vec3
} from 'cc';
import { GunData } from './data/GunData';
const { ccclass, property } = _decorator;

@ccclass('GunController')
export class GunController extends Component {
    animComp: Animation | null = null;
    gunData: GunData | null = null;
    audioSource: AudioSource | null = null;
    rigidbody: RigidBody | null = null;

    onLoad() {
        this.audioSource = this.getComponent(AudioSource);
        this.rigidbody = this.getComponent(RigidBody);
        const childGun = this.node.children[0];

        if (childGun) {
            this.animComp = childGun.getComponent(Animation);
            this.gunData = childGun.getComponent(GunData);
        } else {
            warn("there is no child");
        }
        

    }

    update(deltaTime: number) {
        
    }

    setInputActive(active: Boolean) {
        if (active) {
            input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        }
    }

    onMouseDown(event: EventMouse) {
        log("mouseDown");
        if (event.getButton() == 0) {
            this.playAnimation();
            this.shotBullet();
            //this.playShotAudio(this.gunData.gunSound);
            this.giveRotation();

        }
    }


    playAnimation() {
        if (this.animComp) {
            this.animComp.play();
        } else {
            warn("no animation component found!");
        }

    }

    shotBullet() {
        if (this.gunData.bullet) {
            const bullet: Node = instantiate(this.gunData.bullet);
            const worldMuzzlePos = this.gunData.muzzle.getWorldPosition();
            const worldMuzzleRot = this.gunData.muzzle.getWorldRotation();
            bullet.setWorldPosition(worldMuzzlePos);
            bullet.setWorldRotation(worldMuzzleRot);
            director.getScene().addChild(bullet);
            console.log("Bullet created");
        }
    }
    giveRotation() {
        if (this.node.eulerAngles.x==0) {
            this.rigidbody.setAngularVelocity(new Vec3(0, 0, this.gunData.gunRotationSpeed));
        } else {
            this.rigidbody.setAngularVelocity(new Vec3(0, 0, -this.gunData.gunRotationSpeed));
        }

    }

    playShotAudio(gunSound: AudioClip) {
        if (gunSound) {
            this.audioSource.playOneShot(gunSound);
        }

    }
    // playDropAudio(){

    // }

}