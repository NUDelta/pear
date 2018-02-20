import Prompt from '../../components/Prompt';
import cards from '../cards';

class ArraySequenceMatchPrompt extends Prompt {
    constructor() {
        super();
        this._name = 'Array Sequence Match';
        this._signature = 'function arraySequenceMatch(ls, sequence)';
        this._constructor = 'ArraySequenceMatchPrompt';

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
            title: 'Array Sequence Match',
            description: 'Given an array of numbers and a string sequence, return true if that sequence appears in the array, otherwise return false. You may assume that the array consists of single digit integers only, and that the string sequence is at least 1 character long',
            examples: 'Given ls = [7, 1, 2, 3, 1, 5], target = "123"\nReturn true\n\nGiven ls = [1,7,3,5], target = "135"\nReturn false' ,
        };

        this._tests = [
            {
                input: [[7,1,2,3,1,5],"1231"],
                expected: true
            }, {
                input: [[1,7,3,5],"135"],
                expected: false
            }, {
                input: [[5,5,5,9,5,9,4],"594"],
                expected: true
            }, {
                input: [[2, 0], "21"],
                expected: false
            }, {
                input: [[7,6,8,7,6,8],"76868"],
                expected: false
            }, {
                input: [[7,6,7,7,7,6], "776"],
                expected: true
            }, {
                input: [[1,2,3,4,5,3,2,2,4,4], "1"],
                expected: true
            }
        ];

        // hidden tests:
        //  empty array
        //  seq longer than array
        //  single char seq that doesn't exist in array
        //  nearly equivalent, similar to #2
        //  non integer sequence character
        //  restart seq index at a specific index (not 0 or 1)
        this._hidden_tests = [
            {
                input: [[],"123"],
                expected: false
            }, {
                input: [[2,0], "201"],
                expected: false
            }, {
                input: [[0,4],"1"],
                expected: false
            }, {
                input: [[7,6,7,7,7,6], "7677767"],
                expected: false
            }, {
                input: [[1,2,4,2,5,3,2,5,3,5,6,5], "1242i5"],
                expected: false
            }, {
                input: [[1,2,4,1,2,4,1,2,4,3], "1241243"],
                expected: true
            }
        ];

        this._testResults = [];
        this._testRunTimestampMS = Date.now()
    }
}

export default ArraySequenceMatchPrompt;
