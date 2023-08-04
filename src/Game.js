import React, { useEffect, useState } from "react";
import ScoreTable from "./ScoreTable";
import { displayFlex } from "./helpers";
import Dice from "./Dice";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

export default function Game() {
    // all states
    const [dice, setDice] = useState(Array.from({ length: NUM_DICE }));
    const [locked, setLocked] = useState(Array(NUM_DICE).fill(false));
    const [rollsLeft, setRollsLeft] = useState(NUM_ROLLS);
    const [disableRule, setDisableRule] = useState(false);
    const [isGameEnd, setIsGameEnd] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [noRolls, setNoRolls] = useState(false);
    const [shake, setShake] = useState(false);
    const [scores, setScores] = useState({
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
    });

    // rolling the dice and making changes on the bases of rollesLeft and positions locked
    const roll = (evt) => {
        setDice(dice.map((d, i) => (locked[i] ? d : Math.ceil(Math.random() * 6))));

        // changing locked positions
        if (rollsLeft > 1) {
            setLocked(locked);
        } else {
            setNoRolls(true);
            setTimeout(() => {
                setLocked(Array(NUM_DICE).fill(true));
            }, 500);
        }
        setRollsLeft(rollsLeft - 1);
        setShake(true);
        setTimeout(() => {
            setShake(false);
        }, 500);
    };

    // toggling the die betweet active and disabled
    const toggleLocked = (idx) => {
        setLocked([...locked.slice(0, idx), !locked[idx], ...locked.slice(idx + 1)]);
    };

    // evaluating this ruleFn with the dice and score this rulename
    const doScore = (rulename, ruleFn) => {
        setScores({ ...scores, [rulename]: ruleFn(dice) });
        setLocked(Array(NUM_DICE).fill(false));
        setRollsLeft(NUM_ROLLS);
        if (noRolls === true && scores[rulename] === undefined) {
            setNoRolls(false);
        }
        rulename = rulename.toLowerCase();
        console.log(scores[rulename]);
        setTotalScore(totalScore + scores[rulename]);
    };

    // making changes at the dice area according to different situations
    const diceArea = () => {
        if (rollsLeft === NUM_ROLLS && noRolls === false) {
            return isGameEnd ? <h3 className="msg">Hope You Enjoyed Playing.!</h3> : <p className="msg">...Roll The Dices...</p>;
        } else {
            return <Dice noRolls={noRolls} dice={dice} shake={shake} locked={locked} handleClick={toggleLocked} />;
        }
    };

    // making changes at the Game-button-wrapper according to different situations
    const gameButtonWrapper = () => {
        if (shake) {
            return <button className="Game-reroll rolling">Rolling...</button>;
        } else {
            return noRolls ? (
                <marquee behavior="scroll" direction="left" loop="5" className="Game-reroll">
                    Choose any one rule below and play again.!
                </marquee>
            ) : (
                <button className="Game-reroll" disabled={locked.every((x) => x)} onClick={roll}>
                    {rollsLeft > 1 ? `${rollsLeft} Rerolls Left` : `${rollsLeft} Reroll Left`}
                </button>
            );
        }
    };

    // checking weather the game ended or not
    useEffect(() => {
        for (let key in scores) {
            if (scores[key] === undefined) {
                return;
            }
        }
        setIsGameEnd(true);
    }, [scores]);

    // disabling the rule rows
    if (rollsLeft === NUM_ROLLS && !disableRule) {
        setDisableRule(true);
    } else if (rollsLeft !== NUM_ROLLS && disableRule === true) {
        setDisableRule(false);
    }

    return (
        <div className="Game">
            <header className="Game-header">
                <h1 className="App-title">Yahtzee..!</h1>
                <section className="Game-dice-section">
                    {diceArea()}
                    <div className="Game-button-wrapper">
                        {isGameEnd ? (
                            <button className="Game-reroll rolling" onClick={() => window.location.reload()} style={{ cursor: "default" }}>
                                Restart the Game
                            </button>
                        ) : (
                            gameButtonWrapper()
                        )}
                    </div>
                </section>
            </header>
            <ScoreTable isGameEnd={isGameEnd} disableRule={disableRule} doScore={doScore} scores={scores} />
        </div>
    );
}
