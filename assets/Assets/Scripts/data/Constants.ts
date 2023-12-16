import { _decorator, Vec3 } from 'cc';
import { GameManager } from '../GameManager';

export class Constants {
    static gameManager:GameManager|null=null;
    static bulletLifeTime: number = 10;
    static gravityScale:number=-0.6; 
    static sounds:boolean=false;
    static level:number=1;
    
    
    static money:number=0;
    static sceneMoney:number=0;
    static bonusRate=0;
    static succesRate=0;

}


