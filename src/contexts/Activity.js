import React, { createContext, useContext, useEffect, useState } from "react";

import { Modelo1 } from "views/pages/exercicios/outputsActivities/cabecalho-modelo-1";
import { alphabet } from "views/utilities/alphabet";

export const ActivityManager = createContext({});
const useActivity = () => useContext(ActivityManager);

export const ActivityProvider = ({ children }) => {
    const [ListActivity, setListActivity] = useState([])
    const [ListActivitySelected, setListActivitySelected] = useState(null)
    const [Question, setQuestion] = useState([])
    const [cabecalho, setCabecalho] = useState([])
    const [QuestionItems, setQuestionItems] = useState({
        id: null,
        item: []
    })

    const [contentActivity, setContentActivity] = useState(Modelo1({
        name: 'Sociedade de Ensino Superior Estacio de Sá',
        logo: 'https://logodownload.org/wp-content/uploads/2014/12/estacio-logo-1.png'
    }))

    useEffect(() => {
        const QuestionSelected = Question.filter(e => e.activity_id === ListActivitySelected.id)
        if (QuestionSelected.length > 0) {

            
            let ContentState = Modelo1({
                name: 'Sociedade de Ensino Superior Estacio de Sá',
                logo: 'https://logodownload.org/wp-content/uploads/2014/12/estacio-logo-1.png'
            })
            QuestionSelected.sort((a, b) => a.index - b.index).map((quest) => {
               
                quest.content?.sort((a, b) => a.index - b.index).map((e, index) => {
                    if(quest.id !== e.quest_id){
                        return
                    }
                    if (e.type === 'image') {
                        ContentState = `${ContentState} <br/> <div 
                             style="display: flex; 
                             justify-content: ${e?.content?.position};">
                             <img 
                         src="${e.content?.value}"
                             style="width: ${e.content?.width}px; 
                             height: ${e.content?.height}px" />
                             </div>`
                    }
                    if (e.type === 'text') {
                        ContentState = `${ContentState} <br/> 
                        ${e?.content}
                        
                        `
                    }
                    if (e.type === 'Verdadeiro/falso') {
                        e.content?.values.map((e) => {
                            ContentState = `${ContentState} <br/> 
                            <div style="display: flex; flex-direction: row; align-items: center;">
                            <span>(ㅤ)</span>
                            <div style="margin-left: 2px;">${e?.value}</div>
                            </div> 
                            `
                        })
                    }
                    if (e.type === 'objetiva') {
                        e.content.values?.map((a, index) => {
                            ContentState = `${ContentState} <br/> 
                            <div style="display: flex; flex-direction: row; align-items: center; gap: 3px">
                            ${e.typeAnswer === 'ball' ? `
                            <span
                                style="height: 15px; width: 15px; border: solid 1px black; border-radius: 50%;"
                            ></span>
                            `
                                    : e.typeAnswer === 'lettersParentheses' || e.typeAnswer === 'lettersPoint' ?
                                        ` <p style="margin: 0px; font-size: 1rem; font-weight: 400; line-height: 1.334em; font-family: Roboto,sans-serif;">
                                ${alphabet[index]} ${e.typeAnswer === 'lettersParentheses' ? ')' : "."}
                            </p>`
                                        :
                                        `
                            <p  style="margin: 0px; font-size: 1rem; font-weight: 400; line-height: 1.334em; font-family: Roboto,sans-serif;">
                               ${index + 1}${e.typeAnswer === 'numberParentheses' ? ')' : "."}
                            </p>
                            `
                                }
                                <div style="margin-left: 5px;">${a?.value}</div>
                            </div> 
                            `
                        })
                    }
                    if (e.type === 'dissertativa') {
                        {
                            [...Array(e.content?.values ? parseInt(e.content?.values) : 0)].map((x, i) =>
                                ContentState = `${ContentState} <br/> 
                            <div style="width: 100%; height: 1px; background-color: #333333"; margin-top: 32px;></div>
                            `
                            )
                        }

                    } if (e.type === 'Colunas') {
                        console.log(e.content)
                        e.content.values?.map((a, index) => {
                            ContentState = `${ContentState} <div style="display: flex; flex-direction: row; width: 100%;  font-size: 20px;  margin-top: 15px;">
                            <div style="width: 50%;">
                                (${index + 1}) ${a?.value} 
                            </div>
                            <div>
                                (  ) ${a?.value2}
                            </div>
                        </div>`
                        })
                        
                    }
                })

            })

            setContentActivity(ContentState)
    }},[Question, QuestionItems])

    return (
        <ActivityManager.Provider value={{
            ListActivity, 
            setListActivity,
            ListActivitySelected, 
            setListActivitySelected,
            Question, 
            setQuestion,
            QuestionItems, 
            setQuestionItems,
            contentActivity,
            setContentActivity,
            cabecalho, 
            setCabecalho
        }}>
            {children}
        </ActivityManager.Provider>
    )
}

export default useActivity;