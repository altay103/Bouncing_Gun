import { _decorator, Canvas, Component, Node, RichText, view, Widget } from 'cc';
import { Constants } from './data/Constants';
const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {
    @property(RichText)
    moneyText: RichText | null = null;
    @property(RichText)
    levelText: RichText | null = null;
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
}


