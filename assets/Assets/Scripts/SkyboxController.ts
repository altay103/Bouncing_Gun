import { _decorator, Component, Material, MeshRenderer, Node, randomRange } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SkyboxController')
export class SkyboxController extends Component {
    @property([Material])
    materialList:Material[]=[];
    
    meshRenderer:MeshRenderer|null=null;
    onLoad(){
        this.meshRenderer=this.getComponent(MeshRenderer);
        this.meshRenderer.material=this.materialList[randomRange(0,this.materialList.length)];
    }

}


