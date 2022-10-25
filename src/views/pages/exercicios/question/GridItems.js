import Editor from "components/editor";
import ImageEditor from "components/imageEditor";
import { useState, memo, useEffect } from "react";
import Essay from "./essay";
import TrueAndFalseQuestion from "./trueAndFalse";

import { Grid } from "@mui/material"
import Objective from "./objective ";

const GridItems = ({
    item,
    EditQuestion,
    TaskSelected,
    index,
    deleteQuestion,
}) => {

    useEffect(() => {
        console.log( item.type)
    },[])

    return (
            <Grid onMouseDown={(e) => e.stopPropagation()}  xs={11.5}>
                {
                    item.type === "text" ?
                        <Editor
                            TextQuestion={item}
                            TaskSelected={TaskSelected}
                            EditQuestion={EditQuestion}
                            key={item.id}
                            index={index}
                            DeleteMe={deleteQuestion}
                        />
                        :
                        item.type === "image" ?
                            <ImageEditor
                                imgsQuestion={item}
                                TaskSelected={TaskSelected}
                                EditQuestion={EditQuestion}
                                index={index}
                            />
                            :
                            item.type === 'Verdadeiro/falso' ?
                                <TrueAndFalseQuestion /> :
                                item.type === 'dissertativa' ?
                                    <Essay /> :
                                    item.type === 'objetiva' ? 'teste' :
                                    null
                }

            </Grid>
    )
}

export default memo(GridItems);
