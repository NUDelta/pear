import Prompt from '../../components/Prompt';
import cards from '../cards';

class LinearInPrompt extends Prompt {
    constructor() {
        super();
        this._name = 'Linear In';
        this._signature = 'function linearIn(inner, outer)';
        this._constructor = 'LinearInPrompt';

        this._cardSet = [
            new cards.HashTableCard,
            new cards.HashTableCard,
            new cards.WhileCard,
            new cards.FunctionCard,
            new cards.StackCard,
            new cards.DoWhileCard,
            new cards.ConditionalCard,
            new cards.ConditionalCard,
            new cards.ConditionalCard,
            new cards.ObjectCard,
            new cards.ObjectCard,
            new cards.ArrayCard,
            new cards.ArrayCard,
            new cards.ForCard,
            new cards.SwitchCard
        ];

        this._info = {
            title: 'Linear In',
            description: 'Given two sorted arrays of integers, outer and inner, return true if all the numbers in inner appear in outer. The best solution makes only a single "linear" pass of both arrays, taking advantage of the fact that they are sorted',
            examples: 'Given inner = [3,5], outer = [2,3,4,5]\nReturn true' ,
        };

        this._tests = [
            {
                input: [[3,5],[2,3,4,5]],
                expected: true
            }, {
                input: [[33,45,47,50],[33,45,46,47,58]],
                expected: false
            }, {
                input: [[14,18],[14,18]],
                expected: true
            }, {
                input: [[3,5],[2,3,4]],
                expected: false
            }, {
                input: [[-3,8,9,11],[-3,2,3,4,5,8,9,10,11,12]],
                expected: true
            }, {
                input: [[3,4,4,4,4],[2,3,4,4,4,5,6,7]],
                expected: false
            }, {
                input: [[],[-10,10]],
                expected: true
            }
        ];

        // tests:
        //  check when either inner or outer is empty
        //  check when inner is longer than outer
        //  check when both inner and outer are long and exactly the same
        //  check when high integer repetition
        this._hidden_tests = [
            {
                input: [[],[1]],
                expected: true
            }, {
                input: [[1],[]],
                expected: false
            }, {
                input: [[-10,0,0,10],[-10,0]],
                expected: false
            }, {
                input: [[-1,0,1,2,3,4,5],[-1,0,1,2,3,4,5]],
                expected: true
            }, {
                input: [[0,0,0,0,0,1,2,2,2,2,2,2],[0,0,0,0,0,1,1,2,2,2,2,2,2]],
                expected: true
            }
        ];

        this._testResults = [];
        this._testRunTimestampMS = Date.now()
    }
}

export default LinearInPrompt;
