import { _decorator, Component, find, log, Node, RigidBody, Vec3 } from 'cc';
import { GunData } from './data/GunData';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {
    rigidbody: RigidBody | null = null;

    onLoad() {
        this.rigidbody=this.getComponent(RigidBody);
        const bulletSpeed:number=find("Gun").children[0].getComponent(GunData).bulletSpeed;
        this.rigidbody.setLinearVelocity(this.node.up.multiplyScalar(bulletSpeed));
    }


}


