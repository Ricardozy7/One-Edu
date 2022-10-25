import React, { memo } from 'react';
import MathJax from 'react-mathjax-preview';

const Math = ({ eq, inline }) => {
    return (
        <>
            {inline ? `\\(${eq}\\)` : `//${eq}//`}
        </>
    )
}

export const MathBlock = ({ content, index, ...rest }) => {
    return (
        <>
            <MathJax id={'math-block-'+index} math={content} {...rest}
            config={{
                tex: {
                    inlineMath: [
                        ['\\(', '\\)']
                    ],
                    displayMath: [
                        ['\\[', '\\]']
                    ],
                }
            }} />
        </>
    )
}

export default memo(Math);