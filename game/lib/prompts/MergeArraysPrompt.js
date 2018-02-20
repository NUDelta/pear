import Prompt from '../../components/Prompt';
import cards from '../cards';

class MergeArraysPrompt extends Prompt {
    constructor() {
        super();
        this._name = 'Merge Arrays';
        this._signature = 'function mergeArrays(arr1, arr2)';
        this._constructor = 'MergeArraysPrompt';

        this._cardSet = [
            new cards.HashTableCard,
            new cards.HashTableCard,
            new cards.WhileCard,
            new cards.WhileCard,
            new cards.WhileCard,
            new cards.FunctionCard,
            new cards.StackCard,
            new cards.StackCard,
            new cards.DoWhileCard,
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
            new cards.ForCard,
            new cards.SwitchCard
        ];

        this._info = {
            title: 'Merge Arrays',
            description: 'Given two sorted arrays of integers, return one sorted array that includes all elements of both given arrays',
            examples: 'Given arr1 = [1,2,3,5], arr2 = [2,3,4,5]\nReturn [1,2,2,3,3,4,5,5] ' ,
        };

        this._tests = [
            {
                input: [[1,2,3,5],[2,3,4,5]],
                expected: [1,2,2,3,3,4,5,5]
            }, {
                input: [[-1,-1,0,2,3,5],[4,5]],
                expected: [-1,-1,0,2,3,4,5,5]
            }, {
                input: [[1],[4000,4001]],
                expected: [1,4000,4001]
            }, {
                input: [[],[60,81]],
                expected: [60,81]
            }, {
                input: [[1,1,1,1,1,2],[1,1]],
                expected: [1,1,1,1,1,1,1,2]
            }, {
                input: [[10],[-10,10]],
                expected: [-10,10,10]
            }, {
                input: [[3,4,5,6,10,166],[2,7,8,11,165,167]],
                expected: [2,3,4,5,6,7,8,10,11,165,166,167]
            }
        ];

        // tests:
        //  check second array empty
        //  check second array all larger
        //  check high repetition
        //  check first array all larger
        this._hidden_tests = [
            {
                input: [[1,2,3,5],[]],
                expected: [1,2,3,5]
            }, {
                input: [[-1,-1,0,2,3,5],[55,66,77]],
                expected: [-1,-1,0,2,3,5,55,66,77]
            }, {
                input: [[1,1,1,1,1,2,2,2],[1,1,2,2,3,3,3,3]],
                expected: [1,1,1,1,1,1,1,2,2,2,2,2,3,3,3,3]
            }, {
                input: [[10,11,12],[6,8]],
                expected: [6,8,10,11,12]
            },
        ];

        this._testResults = [];
        this._testRunTimestampMS = Date.now()
    }
}

export default MergeArraysPrompt;
