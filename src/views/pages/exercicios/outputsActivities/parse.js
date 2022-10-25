import React from "react";
import JsxParser from "react-jsx-parser";
import { MathBlock } from "components/editor/Math";
import { useState, memo } from "react";


const Read = ({ choose }) => {
    const [equation, setEquation] = useState("");


    return (
        <>
            <article className={'question-card'}>
                <JsxParser components={{ MathBlock }} jsx={`<MathBlock content='${choose}' index="8-2" />`} />
            </article>
        </>
    )
}

export default memo(Read)