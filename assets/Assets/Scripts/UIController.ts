import { _decorator, Button, Component, log, RichText, Sprite, SpriteFrame, Animation, Node } from 'cc';
import { Constants } from './data/Constants';
import { GameState } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {
    @property(RichText)
    moneyText: RichText | null = null;
    @property(RichText)
    levelText: RichText | null = null;
    @property(SpriteFrame)
    soundOn: SpriteFrame | null = null;
    @property(SpriteFrame)
    soundOff: SpriteFrame | null = null;
    @property(Button)
    soundButton: Button | null = null;
    @property(RichText)
    rateText: RichText | null = null;
    @property(RichText)
    skipText: RichText | null = null;
    @property(Node)
    cursor: Node | null = null;
    @property(RichText)
    succesText:RichText|null=null;
    onLoad() {
        this.setMoneyText()
        this.setLevelText()
        this.setSoundButton()

    }
    update(dt: number): void {
        this.setRateText();
        this.setSkipButton();
        this.setSuccesRate()
    }
    onClickReward(){
        Constants.money+=(100*Constants.succesRate*Constants.bonusRate);
        Constants.gameManager.curState=GameState.nextLevel;
    }
    onClickSkip(){
        Constants.money+=(100 * Constants.bonusRate);
        Constants.gameManager.curState=GameState.nextLevel;
    }
    setSuccesRate() {
        if (Math.abs(this.cursor.position.x) > 244) {
            Constants.succesRate = 2;
        } else if (Math.abs(this.cursor.position.x) > 100) {
            Constants.succesRate = 5;
        } else {
            Constants.succesRate = 3;
        }
        if((Constants.succesRate*Constants.bonusRate*100)>=1000){
            this.succesText.string=((100*Constants.succesRate*Constants.bonusRate)/1000).toString()+"K";
        }else{
            this.succesText.string=(100*Constants.succesRate*Constants.bonusRate).toString();
        }
        
    }
    setSkipButton() {
        if ((100 * Constants.bonusRate) >= 1000) {
            this.skipText.string = ((100 * Constants.bonusRate) / 1000).toString();
            this.skipText.string += "K";
        } else {
            this.skipText.string = (100 * Constants.bonusRate).toString();
        }
    }
    setRateText() {
        this.rateText.string = "x" + Constants.bonusRate.toString()
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
    setSoundButton() {
        if (Constants.sounds) {
            this.soundButton.getComponent(Sprite).spriteFrame = this.soundOn;
        } else {
            this.soundButton.getComponent(Sprite).spriteFrame = this.soundOff;
        }
    }
    onClickSound() {
        Constants.sounds = !Constants.sounds;
        this.setSoundButton();
    }

}


