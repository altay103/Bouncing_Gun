import { _decorator, Button, Component, RichText, Sprite, SpriteFrame } from 'cc';
import { Constants } from './data/Constants';
const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {
    @property(RichText)
    moneyText: RichText | null = null;
    @property(RichText)
    levelText: RichText | null = null;
    @property(SpriteFrame)
    soundOn:SpriteFrame|null=null;
    @property(SpriteFrame)
    soundOff:SpriteFrame|null=null;
    @property(Button)
    soundButton:Button|null=null;
    onLoad() {
        this.setMoneyText()
        this.setLevelText()
    }
    setMoneyText() {
        if (Constants.money > 1000) {
            this.moneyText.string = (Constants.money / 1000).toString();
            this.moneyText.string += "K";
        } else {
            this.moneyText.string = Constants.money.toString();
        }
    }
    setLevelText() {
        this.levelText.string = "LVL "
        this.levelText.string += Constants.level.toString();
    }
    setSoundButton(){
        if(Constants.sounds){
            this.soundButton.getComponent(Sprite).spriteFrame=this.soundOn;
        }else{
            this.soundButton.getComponent(Sprite).spriteFrame=this.soundOff;
        }
    }
    onClickSound(){
        Constants.sounds=!Constants.sounds;
        this.setSoundButton();
    }
}


