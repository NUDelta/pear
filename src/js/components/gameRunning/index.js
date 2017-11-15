import React, { Component } from 'react';

import InfoHeader from '../../containers/infoHeader';
import Editor from '../../containers/editor';
import Hand from '../hand';
import Prompt from '../../containers/prompt';
import limitEval from '../../util/limitEval';
import { myTurn } from '../../../../game/util';
import { MOVE_DISCARD, MOVE_CONSUME, MOVE_WRITE } from '../../../../game/constants/move';

export default class GameRunning extends Component {
    constructor(props) {
        super(props);
        this.bracketsRe = /^\[|\]$/g;
        this.state = {
            testResults: null,
            moveSelect: null
        };
    }

    getMe = () => {
        const { players, me } = this.props;
        for (let player of players) {
            if (player.id === me.id) {
                return player;
            }
        }
    }

    getPartner = () => {
        const { players, me } = this.props;
        for (let player of players) {
            if (player.id !== me.id) {
                return player;
            }
        }
    }

    getPartnersHand = () => {
        return this.getPartner().hand;
    }

    getMyHand = () => {
        return this.getMe().hand;
    }

    handleRunCode = () => {
        const { prompt } = this.props;

        let results = [];
        for (let i = 0; i < prompt._tests.length; i++) {
            let test = prompt._tests[i];
            const fn = `(${ prompt._signature }{${ this.editorElement.doc.getValue() + '\n' }})(${ JSON.stringify(test.input).replace(this.bracketsRe, '') })`;
            limitEval(fn, (done, val) => {
                if (!done) {
                    results.push({
                        passed: false,
                        input: test.input,
                        output: "Error: test timed out",
                        expected: test.expected
                    });
                } else {
                    results.push({
                        passed: val === test.expected,
                        input: test.input,
                        output: val,
                        expected: test.expected
                    });
                }

                if (i === prompt._tests.length - 1) {
                    this.setState({ testResults: results });
                }
            });
        }
    }

    handleDiscardMoveClick = () => {
        this.setState({
            moveSelect: MOVE_DISCARD
        });
    }

    handleConsumeMoveClick = () => {
        this.setState({
            moveSelect: MOVE_CONSUME
        });
    }

    handleCardClick = card => {
        const { stream } = this.props;
        const { moveSelect } = this.state;

        switch (moveSelect) {
            case MOVE_CONSUME:
                stream.sendAction({
                    type: moveSelect,
                    card
                });
                break;
            case MOVE_DISCARD:
                stream.sendAction({
                    type: moveSelect,
                    card
                });
                break;
            default: 
                return;
        }

        this.setState({
            moveSelect: null
        });
    }

    handleCancelAction = () => {
        this.setState({
            moveSelect: null
        });
    }

    render() {
        const { me, game, gameId, stream, players } = this.props;
        const { testResults, moveSelect } = this.state;
        let numTestsPassed = testResults ? testResults.filter(result => result.passed).length : null;

        return (
            <div className="flex flex-column vh-100 relative overflow-hidden">
                <InfoHeader />
                <div className="flex mw8 center mb6">
                    <div className="w-50 pt3 ph3 pb6 aspect-ratio-object overflow-scroll">
                        <Prompt />
                        { testResults &&
                            <div className="pa3 br2 bg-pear-near-white">
                                <p className="b">
                                    { numTestsPassed === testResults.length ? '✅' : '⚠️'} { numTestsPassed } out of { testResults.length } tests passed!
                                </p>
                                { testResults.filter(result => !result.passed).map((result, i) => (
                                    <div className="bg-pear-yellow mv2 pa3 br2" key={ i }>
                                        <p className="code lh-copy mv0">Input: { JSON.stringify(result.input).replace(this.bracketsRe, '') }</p>
                                        <p className="code lh-copy mv0">Got: { JSON.stringify(result.output) }</p>
                                        <p className="code lh-copy mv0">Expected: { JSON.stringify(result.expected) }</p>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="w-50 pt3 ph3 pb6 aspect-ratio-object overflow-scroll">
                        <Editor
                            gameId={ gameId }
                            getEditor={ editor => this.editorElement = editor }
                        />
                    </div>
                    <div className="absolute right--2 top-4 slide-left-3 flex flex-column">
                        { myTurn(me, game, players) &&
                            <div className="flex flex-column">
                                <p className="f6 silver mv0">ACTIONS</p>
                                <input
                                    type="button"
                                    className="db mv1 input-reset ba bg-pear-blue b--pear-blue pa3 br2 white pointer slide-left-1"
                                    value="Write Code"
                                    onClick={ this.handleRunCode }
                                />
                                <input
                                    type="button"
                                    className="db mv1 input-reset ba bg-pear-purple b--pear-purple pa3 br2 white pointer slide-left-1"
                                    value="Consume Card"
                                    onClick={ this.handleConsumeMoveClick }
                                />
                                <input
                                    type="button"
                                    className="db mv1 input-reset ba bg-pear-yellow b--pear-yellow pa3 br2 near-black pointer slide-left-1"
                                    value="Discard Card"
                                    onClick={ this.handleDiscardMoveClick }
                                />
                            </div>
                        }
                        <p className="f6 silver mt4 mb0">RUN</p>
                        <input
                            type="button"
                            className="db mv1 input-reset ba bg-pear-near-white b--pear-light-gray pa3 br2 silver pointer slide-left-1"
                            value="Run Code"
                            onClick={ this.handleRunCode }
                        />
                    </div>
                </div>
                <div className={`absolute absolute--fill bg-near-black ${ moveSelect ? 'o-60 z-999' : 'o-0 z-0 dn' }`}></div>
                <div>
                    <div className="absolute bottom--2 w-50 left-0 z-9 ph2 flex flex-column self-end">
                        <p className="silver f6 mv2 pa2 br2 dib bg-pear-near-white self-end ba b--pear-light-gray">{ `${ this.getPartner().name }'s hand` }</p>
                        <div className="flex flex-row-reverse">
                            <Hand cards={ this.getPartnersHand() } />
                        </div>
                    </div>
                    <div className="absolute bottom--2 w-50 right-0 z-999 ph2 flex flex-column">
                        <div className="flex justify-between">
                            <p className="pear-near-white f6 mv2 pa2 br2 dib bg-pear-blue self-start ba b--pear-blue">Your hand</p>
                            { moveSelect &&
                                <input
                                    type="button"
                                    className="db mv1 input-reset ba bg-red b--red pa3 br2 near-white pointer"
                                    value="Cancel Action"
                                    onClick={ this.handleCancelAction }
                                />
                            }
                        </div>
                        <div className="flex">
                            <Hand
                                cards={ this.getMyHand() }
                                handleCardClick={ moveSelect ? this.handleCardClick : null }
                            />
                        </div>
                    </div>
                </div>
            </div>   
        );
    }
}
