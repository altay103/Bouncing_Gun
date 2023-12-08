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
    Vec3,
    BoxCollider,
    PhysicsSystem,
    geometry,
    game
} from 'cc';
import { GunData } from './data/GunData';
import { Constants } from './data/Constants';
import { BreakableController } from './BreakableController';
const { ccclass, property } = _decorator;

enum Direction {
    left,
    right,
    none
}
@ccclass('GunController')
export class GunController extends Component {
    animComp: Animation | null = null;
    gunData: GunData | null = null;
    audioSource: AudioSource | null = null;
    rigidbody: RigidBody | null = null;
    launch: boolean = false;
    direction: Direction = Direction.none;

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

        let colliders = this.getComponents(BoxCollider);
        for (const collider of colliders) {
            if (collider.isTrigger) {
                collider.on("onTriggerEnter", this.onTriggerEnter, this);
                collider.on("onTriggerExit", this.onTriggerExit, this);
            }
        }

    }

    onTriggerEnter() {
        this.launch = true;
        this.direction = Direction.none;
        this.playAudio(this.gunData.dropSound)
    }

    onTriggerExit() {
        this.launch = false;
    }

    update(deltaTime: number) {
        this.giveRotation(this.direction);
    }

    applyReducedGravity() {
        this.rigidbody.applyForce(new Vec3(0, -9.8 * Constants.gravityScale, 0));
    }

    setInputActive(active: Boolean) {
        if (active) {
            input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        }
    }

    onMouseDown(event: EventMouse) {
        log("mouseDown");
        if (event.getButton() == 0) {
            this.slowmo();
            this.playAnimation();
            this.shotBullet();
            this.playAudio(this.gunData.gunSound);
            this.changeRotation();
            this.giveForce();

        }
    }

    slowmo() {
        const startPos = this.gunData.muzzle.getWorldPosition();
        const startDir = this.gunData.muzzle.up;
        const worldRay = new geometry.Ray(startPos.x, startPos.y, startPos.z, startDir.x, startDir.y, startDir.z);
        // Raycast işlemi
        const bResult = PhysicsSystem.instance.raycast(worldRay);
        if (bResult) {
            const results = PhysicsSystem.instance.raycastResults;
            results.sort((a, b) => a.distance - b.distance);
            if(results[0].collider.node.getComponent(BreakableController)){
                log("Işın çarptı: " + results[0].collider.node.name);
                
            }

           


        } else {
            log("Işın çarpmadı");
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

    giveRotation(direction: Direction) {
        if (direction == Direction.left) {
            this.rigidbody.setAngularVelocity(new Vec3(0, 0, this.gunData.gunRotationSpeed));
        } else if (direction == Direction.right) {
            this.rigidbody.setAngularVelocity(new Vec3(0, 0, -this.gunData.gunRotationSpeed));
        }

    }

    changeRotation() {
        if (this.node.eulerAngles.x < 90 && this.node.eulerAngles.x > -90) {
            this.direction = Direction.left;
        } else {
            this.direction = Direction.right;
        }
    }

    giveForce() {
        this.rigidbody.setLinearVelocity(new Vec3(0, 0, 0));
        if (this.launch) {
            this.rigidbody.applyLocalForce(new Vec3(0, 0, this.gunData.gunForce));
            this.rigidbody.applyForce(new Vec3(0, 1.2 * this.gunData.gunForce, 0));
            log("launch")
            return;
        }
        this.rigidbody.applyLocalForce(new Vec3(0, 0, this.gunData.gunForce));
    }

    playAudio(sound: AudioClip) {
        if (sound && Constants.sounds) {
            this.audioSource.playOneShot(sound);
        }

    }
    
}