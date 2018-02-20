import Prompt from '../../components/Prompt';
import cards from '../cards';

class ValidParenthesesPrompt extends Prompt {
    constructor() {
        super();
        this._name = 'Valid Parentheses';
        this._signature = 'function validParentheses(str)';
        this._constructor = 'MergeArraysPrompt';

        this._cardSet = [
            new cards.HashTableCard(),
            new cards.HashTableCard(),
            new cards.WhileCard(),
            new cards.WhileCard(),
            new cards.FunctionCard(),
            new cards.QueueCard(),
            new cards.StackCard(),
            new cards.DoWhileCard(),
            new cards.ConditionalCard(),
            new cards.ConditionalCard(),
            new cards.ConditionalCard(),
            new cards.ObjectCard(),
            new cards.ObjectCard(),
            new cards.ArrayCard(),
            new cards.ArrayCard(),
            new cards.ArrayCard(),
            new cards.ForCard(),
            new cards.SwitchCard()
        ];

        this._info = {
            title: 'Valid Parentheses',
            description: 'Given a string containing some combination of the parentheses `()`, `[]`, `{}`, and the space character (\s), return whether that string contains a valid sequence of parens.',
            examples: 'Given: `()`\nReturn: true\n\nGiven: `(]`\nReturn: false'
        };

        this._tests = [
            {
                input: ['()'],
                expected: true
            }, {
                input: ['({[]})'],
                expected: true
            }, {
                input: ['{]'],
                expected: false
            }, {
                input: ['()[]{}'],
                expected: true
            }, {
                input: [' (({} {}) [])'],
                expected: true
            }, {
                input: ['(((()){})'],
                expected: false
            }, {
                input: ['{[]{{()}}}}}}}'],
                expected: false
            }
        ];

        // tests:
        //  check empty string
        //  check multiple spaces
        //  check against queue implementation
        //  check ending space character
        this._hidden_tests = [
            {
                input: [''],
                expected: true
            }, {
                input: ['[(  ) ]'],
                expected: true
            }, {
                input: ['{[}]'],
                expected: false
            }, {
                input: ['()[]{} '],
                expected: true
            }
        ];

        this._testResults = [];
        this._testRunTimestampMS = Date.now();
    }
}

export default ValidParenthesesPrompt;
