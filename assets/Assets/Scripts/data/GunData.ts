import { _decorator, Component, Node, AudioClip, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GunData')
export class GunData extends Component {
    @property(Prefab)
    public bullet: Prefab | null = null;
    @property(Node)
    public muzzle: Node | null = null;
    @property(AudioClip)
    public gunSound: AudioClip | null = null;
    @property(AudioClip)
    public dropSound: AudioClip | null =null;
    @property(Number)
    gunRotationSpeed: number = 4;
    @property(Number)
    gunForce:number = 200;
    @property(Number)
    bulletSpeed: number = 4;
    @property(Number)
    recoil:number=20;
}

