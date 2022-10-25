import JsxParser from "react-jsx-parser";
import { MathBlock } from "./Math";
import { useState, memo } from "react";
import { Grid } from "@mui/material";
const Read = ({ choose, ...rest }) => {
    const [equation, setEquation] = useState("y=x");
    return (
        <Grid {...rest}>
            <JsxParser components={{ MathBlock }} jsx={`<MathBlock content='${choose}'/>`} />
            {/* <EquationEditor
                value={equation}
                onChange={setEquation}
                autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
                autoOperatorNames="sin cos tan"
            /> */}
            {/* <p >
                <code>{equation}</code>
            </p> */}
        </Grid>
    )
}
export default memo(Read);
