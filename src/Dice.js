import React from "react";
import Die from "./Die";
import "./Dice.css";

export default function Dice(props) {
    return (
        <div className="Dice">
            {props.dice.map((d, idx) => (
                <Die noRolls={props.noRolls} handleClick={props.handleClick} val={d} shake={props.shake} locked={props.locked[idx]} idx={idx} key={idx} />
            ))}
        </div>
    );
}
