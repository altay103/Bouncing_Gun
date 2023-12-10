import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property(Vec3)
    defaultDistance: Vec3 | null = null;
    @property(Vec3)
    defaultRotation: Vec3 | null = null;
    @property(Node)
    target: Node | null = null;
    @property(Number)
    smoothSpeed:number=1;

    start() {
        this.node.setRotationFromEuler(this.defaultRotation);

        if (this.target) {
            this.node.setPosition(new Vec3(this.target.position.x + this.defaultDistance.x,
                this.target.position.y + this.defaultDistance.y,
                this.target.position.z + this.defaultDistance.z));
        }
    }

    update(deltaTime: number) {
        if (!this.target) {
            return;
        }
        const targetPosition = new Vec3(this.target.position.x + this.defaultDistance.x,
            this.target.position.y + this.defaultDistance.y,
            this.target.position.z + this.defaultDistance.z);
        const currentPosition=this.node.position;
        this.node.setPosition(currentPosition.lerp(targetPosition,this.smoothSpeed));
        this.node.setRotationFromEuler(this.defaultRotation);

    }
}


