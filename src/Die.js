import { useState } from "react";
import React from "react";
import "./Die.css";

export default function Die(props) {
    const {val, noRolls, idx, locked, shake} = props;
    
    // returns the number string if the prop matches
    const dice = () => {
        let value = val;
        if (value === 1) return "one";
        else if (value === 2) return "two";
        else if (value === 3) return "three";
        else if (value === 4) return "four";
        else if (value === 5) return "five";
        else if (value === 6) return "six";
    };

    // handling toggleLocked only then rerolls are left
    const handleClick = () => {
        if(noRolls === false) {
            props.handleClick(idx);
        }
    };

    return (
        <button className={locked ? "Die locked" : "Die permitShk"} style={noRolls ? {cursor: 'not-allowed'} : {cursor: 'pointer'}} onClick={handleClick}>
            <i className={shake ? `shake fa-solid fa-dice-${dice()}` : `fa-solid fa-dice-${dice()}`} style={{ color: "white" }}></i>
        </button>
    );
}
