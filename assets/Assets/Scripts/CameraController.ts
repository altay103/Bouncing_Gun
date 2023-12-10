import { _decorator, Component, director, geometry, Graphics, log, Material, MeshRenderer, Node, PhysicsSystem, Vec3 } from 'cc';
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
    @property(Node)
    gun:Node|null=null;
    @property(Material)
    normalMat:Material|null=null;
    @property(Material)
    transMat:Material|null=null;

    hitWall:Node=null;
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
        this.raycastWall();

        
    }
    
    raycastWall() {
        const startPos = this.gun.getWorldPosition();
        const startDir = new Vec3(-1,0,0);
        const worldRay = new geometry.Ray(startPos.x, startPos.y, startPos.z, startDir.x, startDir.y, startDir.z);
        // Raycast işlemi
        const bResult = PhysicsSystem.instance.raycast(worldRay,0xFFFFFFFF,0.5);
        
        if (bResult) {
            const results = PhysicsSystem.instance.raycastResults;
            let control=false;
            for(let i=0;i<results.length;i++){
                if(results[i].collider.node.name.includes("Wall")){
                    this.hitWall = results[i].collider.node;
                    this.hitWall.getComponent(MeshRenderer).material = this.transMat;
                    control=true;
                    break;
                }
            }
            if(!control){
                if (this.hitWall) {
                    this.hitWall.getComponent(MeshRenderer).material = this.normalMat;
                    this.hitWall = null;
                }
            }

        } else {
            if (this.hitWall) {
                this.hitWall.getComponent(MeshRenderer).material = this.normalMat;
                this.hitWall = null;
            }
        }
        /*const startPos:Vec3 = this.node.getWorldPosition();
        const stopPos = this.gun.getWorldPosition();
        const worldRay = new geometry.Ray();
       
        let graphics:Graphics=this.getComponent(Graphics)
        const hit = PhysicsSystem.instance.raycast(worldRay);
       
        if (hit) {
            log("hit");
    
            const results = PhysicsSystem.instance.raycastResults;
            results.sort((a, b) => a.distance - b.distance);
    
            // Eğer mevcut hitWall null değilse ve yeni hit olan node aynı değilse, eski hitWall'ın materialini normalMat olarak ayarla.
            if (this.hitWall && this.hitWall !== results[0].collider.node) {
                this.hitWall.getComponent(MeshRenderer).material = this.normalMat;
            }
    
            if (results[0].collider.node.name.includes("Wall")) {
                
            }
        } else {
            // Eğer mevcut hitWall null değilse, materialini normalMat olarak ayarla.
            if (this.hitWall) {
                this.hitWall.getComponent(MeshRenderer).material = this.normalMat;
                this.hitWall = null;
            }
        }*/
    }
}


