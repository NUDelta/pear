import Card from '../../components/Card';
import { CARDS_SWITCH_CASE } from '../../constants/cards.js';
import { isSwitch, getAST } from '../../util';

class SwitchCard extends Card {
    constructor() {
        super();
        this.type = CARDS_SWITCH_CASE;
        this.title = 'Switch';
        this.implementation = `
switch(day) {
    case "Monday":
        break;
    case "Tuesday":
        break;
    default:
}`;
        this.example = '';
    }

    isInstanceOf(code) {
        const tree = getAST(code);
        return isSwitch(tree);
    }
}

export default SwitchCard;
