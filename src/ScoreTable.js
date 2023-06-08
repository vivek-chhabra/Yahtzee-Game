import { ones, twos, threes, fours, fives, sixes, threeOfKind, fourOfKind, fullHouse, smallStraight, largeStraight, yahtzee, chance } from "./Rules";
import RuleRow from "./RuleRow";
import React from "react";
import "./ScoreTable.css";

export default function ScoreTable(props) {
    const { scores, doScore, disableRule } = props;

    // finding total score
    const getTotal = () => {
        let totalScore = 0;
        for (let key in scores) {
            if (scores[key]) totalScore += scores[key];
        }
        return totalScore;
    };

    return (
        <div className="ScoreTable">
            <section className="ScoreTable-section">
                <table cellSpacing="0">
                    <tbody>
                        <RuleRow disableRule={disableRule} name="Ones" rule="1 point per 1" score={scores.ones} doScore={(evt) => doScore("ones", ones.evalRoll)} />
                        <RuleRow disableRule={disableRule} name="Twos" rule="2 points per 2" score={scores.twos} doScore={(evt) => doScore("twos", twos.evalRoll)} />
                        <RuleRow disableRule={disableRule} name="Threes" rule="3 points per 3" score={scores.threes} doScore={(evt) => doScore("threes", threes.evalRoll)} />
                        <RuleRow disableRule={disableRule} name="Fours" rule="4 points per 4" score={scores.fours} doScore={(evt) => doScore("fours", fours.evalRoll)} />
                        <RuleRow disableRule={disableRule} name="Fives" rule="5 points per 5" score={scores.fives} doScore={(evt) => doScore("fives", fives.evalRoll)} />
                        <RuleRow disableRule={disableRule} name="Sixes" rule="6 points per 6" score={scores.sixes} doScore={(evt) => doScore("sixes", sixes.evalRoll)} />
                    </tbody>
                </table>
            </section>
            <section className="ScoreTable-section ScoreTable-section-lower">
                <table cellSpacing="0">
                    <tbody>
                        <RuleRow disableRule={disableRule} score={scores.threeOfKind} name="Three of Kind" rule="Sum all dice if 3 are the same" doScore={(evt) => doScore("threeOfKind", threeOfKind.evalRoll)} />
                        <RuleRow disableRule={disableRule} score={scores.fourOfKind} name="Four of Kind" rule="Sum all dice if 4 are the same" doScore={(evt) => doScore("fourOfKind", fourOfKind.evalRoll)} />
                        <RuleRow disableRule={disableRule} score={scores.fullHouse} name="Full House" rule="25 points for a full house" doScore={(evt) => doScore("fullHouse", fullHouse.evalRoll)} />
                        <RuleRow disableRule={disableRule} score={scores.smallStraight} name="Small Straight" rule="30 points for a small straight" doScore={(evt) => doScore("smallStraight", smallStraight.evalRoll)} />
                        <RuleRow disableRule={disableRule} score={scores.largeStraight} name="Large Straight" rule="40 points for a large straight" doScore={(evt) => doScore("largeStraight", largeStraight.evalRoll)} />
                        <RuleRow disableRule={disableRule} score={scores.yahtzee} name="Yahtzee" rule="50 points for yahtzee" doScore={(evt) => doScore("yahtzee", yahtzee.evalRoll)} />
                        <RuleRow disableRule={disableRule} score={scores.chance} name="Chance" rule="Summm of all dice" doScore={(evt) => doScore("chance", chance.evalRoll)} />
                    </tbody>
                </table>
            </section>
            <div className="total-score Game-header">Total Score: {getTotal()}</div>
        </div>
    );
}
