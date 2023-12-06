import { _decorator, Component, Node, AudioClip, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GunData')
export class GunData extends Component {
    @property(Prefab)
    public bullet: Prefab | null = null;
    @property(Node)
    public muzzle: Node | null = null;
    @property(Number)
    public bulletSpeed: number = 200;
    @property(AudioClip)
    public gunSound: AudioClip | null = null;
}


