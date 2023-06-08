import React, { useState, useEffect } from "react";
import "./RuleRow.css";

export default function RuleRow(props) {
    const [totalScore, setTotalScore] = useState(0);
    const { score, doScore, rule, disableRule, name } = props;

    return (
        <tr className={`RuleRow RuleRow-${score === undefined ? "active" : "disabled"}`} style={!disableRule ? { cursor: "" } : { cursor: "not-allowed" }} onClick={(disableRule || score !== undefined) ? "" : doScore}>
            <td className="RuleRow-name">{props.name}</td>
            {score === undefined ? <td className="RuleRow-score">{rule}</td> : <td className="RuleRow-score">{score}</td>}
        </tr>
    );
}
