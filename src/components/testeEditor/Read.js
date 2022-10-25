import React from "react";
import JsxParser from "react-jsx-parser";
import { MathBlock } from "../editor/Math";
// import EquationEditor from "equation-editor-react";
import { useState, memo } from "react";
const Read = ({ choose }) => {
    const [equation, setEquation] = useState("");

    // const activity = a();
    // function a() {
    //     let _activity = JSON.parse(createMathMark(choose));
    //     if (typeof _activity.choices === 'object') {
    //         _activity.choices = _activity.choices.join(';;');
    //     }
    //     _activity.correct = parseInt(_activity.correct);
    //     return _activity;
    // }
    // function createMathMark(text: string) {
    //     let match = text.replace(/{\$/g, '\\\\(');
    //     match = match.replace(/\$}/g, '\\\\)');
    //     console.log(match);
    //     return  match;
    // }

    return (
        <>
            <article className={'question-card'}>
                {/* @ts-ignore */}
                <JsxParser components={{ MathBlock }} jsx={`<MathBlock content='${choose}' index="8-2" />`} />
            </article>
        </>
    )
}

export default memo(Read)