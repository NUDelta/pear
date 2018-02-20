import Prompt from '../../components/Prompt';
import cards from '../cards';

class CanBalancePrompt extends Prompt {
    constructor() {
        super();
        this._name = 'Can Balance';
        this._signature = 'function canBalance(arr)';
        this._constructor = 'CanBalancePrompt';

        this._cardSet = [
            new cards.HashTableCard,
            new cards.HashTableCard,
            new cards.WhileCard,
            new cards.FunctionCard,
            new cards.FunctionCard,
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
            new cards.ForCard,
            new cards.SwitchCard
        ];

        this._info = {
            title: 'Can Balance',
            description: 'Given a non-empty array of integers, return true if there is a place to split the array so that the sum of the numbers on one side equal the sum of the numbers on the other side. Note: both sides of the split must contain at least one element of the original array',
            examples: 'Given arr = [1,1,1,2,1]\nReturn true, because when split to [1,1,1] and [2,1],\n both sides sum up to 3.' ,
        };

        this._tests = [
            {
                input: [[1,1,1,2,1]],
                expected: true
            }, {
                input: [[2,3,4,5]],
                expected: false
            }, {
                input: [[14,14]],
                expected: true
            }, {
                input: [[1]],
                expected: false
            }, {
                input: [[5,2,3,4]],
                expected: true
            }, {
                input: [[3,4,4,4,4,1,2]],
                expected: true
            }, {
                input: [[-10,3,5,20,8,10]],
                expected: true
            }
        ];

        // tests:
        //  check that split is exclusive
        //  check that split isn't first or last index
        //  check heavily uneven split
        //  check exclusive, check index incrementation
        this._hidden_tests = [
            {
                input: [[1,2,1]],
                expected: false
            }, {
                input: [[-10,0,0,10]],
                expected: false
            }, {
                input: [[-10,0,0,10,-10,5,4,2,1]],
                expected: true
            }, {
                input: [[1,1,1,1,1]],
                expected: false
            }
        ];

        this._testResults = [];
        this._testRunTimestampMS = Date.now()
    }
}

export default CanBalancePrompt;
