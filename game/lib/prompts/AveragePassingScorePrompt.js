import Prompt from '../../components/Prompt';
import cards from '../cards';

class AveragePassingScorePrompt extends Prompt {
    constructor() {
        super();
        this._name = 'Average Passing Score';
        this._signature = 'function averagePassingScore(scores)';
        this._constructor = 'AveragePassingScorePrompt';

        this._cardSet = [
            new cards.HashTableCard,
            new cards.WhileCard,
            new cards.WhileCard,
            new cards.FunctionCard,
            new cards.StackCard,
            new cards.DoWhileCard,
            new cards.ConditionalCard,
            new cards.ConditionalCard,
            new cards.ConditionalCard,
            new cards.ObjectCard,
            new cards.ObjectCard,
            new cards.ObjectCard,
            new cards.ArrayCard,
            new cards.ArrayCard,
            new cards.ArrayCard,
            new cards.ForCard,
            new cards.SwitchCard
        ];

        this._info = {
            title: 'Average Passing Score',
            description: 'Given a list of scores, return the average among the passing scores. A passing score is any score greater than or equal to 70. If the list is empty or does not include any passing scores return 0. Note: all numbers in Javascript are floats.',
            examples: 'Given: [60,70,80,90]\nReturn: 80\n\nGiven: [15,33,84,55,90,100]\nReturn: 91.33333333333333'
        };

        this._tests = [
            {
                input: [[60,70,80,90]],
                expected: 80
            }, {
                input: [[15,33,84,55,90,100]],
                expected: 91.33333333333333
            }, {
                input: [[]],
                expected: 0
            }, {
                input: [[20, 40, 69, 10]],
                expected: 0
            }, {
                input: [[20,50,85,65,75]],
                expected: 80
            }, {
                input: [[69,70,-1,110]],
                expected: 90
            }, {
                input: [[67,68,69,70,71,72,73,74,75,75]],
                expected: 72.85714285714286
            }
        ];

        // tests:
        //  check simple, single element array
        //  check single element array that doesn't fit specs
        //  check no upper bound assumption of 100
        this._hidden_tests = [
            {
                input: [[70]],
                expected: 70
            }, {
                input: [[69]],
                expected: 0
            }, {
                input: [[1000,2000]],
                expected: 1500
            }
        ];

        this._testResults = [];
        this._testRunTimestampMS = Date.now();
    }
}

export default AveragePassingScorePrompt;
