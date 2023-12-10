import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CloudController')
export class CloudController extends Component {
    @property(Prefab)
    mCloud:Prefab|null=null;

    clouds:Prefab[]=null;
    onLoad(){
        
    }
}


