export function Modelo1({
    name, 
    logo
}) {
    return `
<div style="color: #000;">
    <div style="width: 100%;display: flex;flex-direction: row;">
        <div style="width: 145px; height: 125px;">
            <img style="width: 100%; height: 100% ;"
                src="${logo}" />
        </div>
        <div style="width: 100%;margin-left: 5px;">
            <div
                style="width: calc(100%);  font-size: 14px; display: flex; align-items: center; padding: 3px; height: 40px; border: solid 1px #000;">
                ${name}
            </div>
            <div style="    width: 100%;
            display: flex;
            flex-direction: row;">
                <div
                    style="width: 70%;margin-top: 2px; padding: 3px; font-size: 14px; display: flex; align-items: center; padding: 3px; height: 40px; border: solid 1px #000;">
                    nome:
                </div>
                <div
                    style="width: 30%; margin-top: 2px;
                        margin-left: 2px;  font-size: 14px; display: flex; align-items: center; padding: 3px; height: 40px; border: solid 1px #000;">
                    data:
                </div>
            </div>
            <div style="    width: 100%;
            display: flex;
            flex-direction: row;">
                <div
                    style="    width: 20%;
                    margin-top: 2px;     font-size: 14px; display: flex; align-items: center; padding: 3px; height: 40px; border: solid 1px #000;">
                    ano:
                </div>
                <div
                    style="    width: 20%;
                    margin-top: 2px;
                    margin-left: 2px;     font-size: 14px; display: flex; align-items: center; padding: 3px; height: 40px; border: solid 1px #000;">
                    turma/sala:
                </div>
                <div
                    style="    width: 30%;
                    margin-top: 2px;
                    margin-left: 2px;     font-size: 14px; display: flex; align-items: center; padding: 3px; height: 40px; border: solid 1px #000;">
                    disciplina/sala:
                </div>
                <div
                    style="  width: 30%;
                    margin-top: 2px;
                    margin-left: 2px;     font-size: 14px; display: flex; align-items: center; padding: 3px; height: 40px; border: solid 1px #000;">
                    professor:
                </div>
            </div>
        </div>
    </div>
    <div style="padding: 2px;">
        <div style="width: calc(100% + 6px);
            height: 113px;
            font-size: 13px;
            display: flex;
            align-items: flex-start;
            margin-top: 2px;
            margin-left: -2px;
            display: flex;
            padding: 3px;
            border: solid 1px #000;">
            Instruções:
        </div>
        <div style="padding: 2px;">
            <div style="width: calc(100% + 8px);
                padding: 2px;
                font-size: 13px;
                display: flex;
                align-items: center;
                margin-top: 2px;
                margin-left: -4px;      font-size: 14px;
                display: flex;
                align-items: center;
                padding: 3px;
                height: 40px;
                border: solid 1px #000;">
                Boa Prova!
            </div>
        </div>

</div>
`
}