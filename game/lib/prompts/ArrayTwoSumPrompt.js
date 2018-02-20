import Prompt from '../../components/Prompt';
import cards from '../cards';

class ArrayTwoSumPrompt extends Prompt {
    constructor() {
        super();
        this._name = 'Array Two Sum';
        this._signature = 'function arrayTwoSum(nums, target)';
        this._constructor = 'ArrayTwoSumPrompt';

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
            new cards.ForCard,
            new cards.ForCard,
            new cards.SwitchCard
        ];

        this._info = {
            title: 'Array Two Sum',
            description: 'Given an unsorted array of numbers, return an array of the indices of two numbers such that they add up to a specific integer target.\nYou may assume that each input has exactly one solution, and you may not use the same element twice (i.e. you can\'t return an array with the same index twice).',
            examples: 'Given nums = [7, 2, 11, 15], target = 9\nBecause nums[0] + nums[1] = 7 + 2 = 9, return [0, 1]',
        };

        this._tests = [
            {
                input: [[2,4,11,1,0,33],37],
                expected: [1,5]
            }, {
                input: [[1,4,0,-1,3,19,2], 0],
                expected: [0,3]
            }, {
                input: [[10,13,12,13],26],
                expected: [1,3]
            }, {
                input: [[20, 40], 60],
                expected: [0,1]
            }, {
                input: [[75,65,85],150],
                expected: [1,2]
            }, {
                input: [[69,70,-1,110], 109],
                expected: [2,3]
            }, {
                input: [[67,68,69,70,71,72,73,74,85,85], 170],
                expected: [8,9]
            }
        ];

        // tests:
        //  check simple repetition
        //  check using multiple indices to add to target
        //  check solution being first and last
        //  check negative target
        this._hidden_tests = [
            {
                input: [[2,2],4],
                expected: [0,1]
            }, {
                input: [[1,1,1,1,2,3,1], 5],
                expected: [4,5]
            }, {
                input: [[10,13,12,-20],30],
                expected: [0,3]
            }, {
                input: [[10,13,12,-40],-30],
                expected: [0,3]
            }
        ];

        this._testResults = [];
        this._testRunTimestampMS = Date.now()
    }
}

export default ArrayTwoSumPrompt;
