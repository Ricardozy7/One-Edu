export function toCashBR(value, likeArray) {
    const values = value.toString().split('.');
    const currency = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const cents = values.length === 2 ? (values[1].length === 1 ? values[1] + '0' : values[1]) : '00';
    if (!likeArray) {
        return `R$ ${currency},${cents}`;
    }
    return [currency, cents];
}

export function convertDate(date, type, seconds, normated) {
    if (type === 'date') {
        const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        const day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();
        const year = date.getFullYear().toString();
        if (normated) {
            return `${year}-${month}-${day}`;
        }
        return `${day}/${month}/${year}`;
    } else {
        const hour = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
        if (seconds) {
            const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString()
            return `${hour}:${minutes}:${seconds}`;
        }
        return `${hour}:${minutes}`;
    }
}


export function getLegibleDate(date, minutes) {
    const dateDay = date.getDate()
    const day = dateDay < 10 ? '0' + dateDay.toString() : dateDay.toString();
    return `${day} de ${monthsMin[date.getMonth()]} de ${date.getFullYear()}${minutes ? ` às ${convertDate(date, 'hour', true)}` : ''}`;
}

export const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto',
    'setembro', 'outubro', 'novembro', 'dezembro']
export const monthsMin = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago',
    'set', 'out', 'nov', 'dez']


export function welcome() {
    const hour = (new Date()).getHours();
    return (hour >= 5 && hour < 12) ? 'Bom dia' : (hour >= 12 && hour < 18 ? 'Boa tarde' : 'Boa noite');
}

export function genPassword() {
    return '123456';
}

export function toCapitalize(name) {
    return name[0].toUpperCase() + name.toLowerCase().slice(1);
}

export const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
export const states = {
    AC: 'Acre',
    AL: 'Alagoas',
    AP: 'Amapá',
    AM: 'Amazonas',
    BA: 'Bahia',
    CE: 'Ceará',
    DF: 'Distrito Federal',
    ES: 'Espírito Santo',
    GO: 'Goiás',
    MA: 'Maranhão',
    MT: 'Mato Grosso',
    MS: 'Mato Grosso do Sul',
    MG: 'Minas Gerais',
    PA: 'Pará',
    PB: 'Paraíba',
    PR: 'Paraná',
    PE: 'Pernambuco',
    PI: 'Piauí',
    RJ: 'Rio de Janeiro',
    RN: 'Rio Grande do Norte',
    RS: 'Rio Grande do Sul',
    RO: 'Rondônia',
    RR: 'Roraima',
    SC: 'Santa Catarina',
    SP: 'São Paulo',
    SE: 'Sergipe',
    TO: 'Tocantins',
}



export const StateUf = uf => {
    let UF = 'AC'
    switch (uf) {
        case 'AC':
           UF = ufs[0]
            break
        case 'AL':
           UF = ufs[1]
            break
        case 'AP':
           UF = ufs[2]
            break
        case 'AM':
           UF = ufs[3]
            break
        case 'BA':
           UF = ufs[4]
            break
        case 'CE':
           UF = ufs[5]
            break
        case 'DF':
           UF = ufs[6]
            break
        case 'ES':
           UF = ufs[7]
            break
        case 'GO':
           UF = ufs[8]
            break
        case 'MA':
           UF = ufs[9]
            break
        case 'MT':
           UF = ufs[10]
            break
        case 'MS':
           UF = ufs[11]
            break
        case 'MG':
           UF = ufs[12]
            break
        case 'PA':
           UF = ufs[13]
            break
        case 'PB':
           UF = ufs[14]
            break
        case 'PR':
           UF = ufs[15]
            break
        case 'PE':
           UF = ufs[16]
            break
        case 'PI':
           UF = ufs[17]
            break
        case 'RJ':
           UF = ufs[18]
            break
        case 'RS':
           UF = ufs[19]
            break
        case 'RO':
           UF = ufs[20]
            break
        case 'RR':
           UF = ufs[21]
            break
        case 'SC':
           UF = ufs[22]
            break
        case 'SP':
           UF = ufs[23]
            break
        case 'SE':
           UF = ufs[24]
            break
        case 'TO':
           UF = ufs[25]
            break
        default:
            UF = states
            break
        }
        return UF
}



export function generateUUID() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export const cpfMask = value => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1x.$2')
        .replace(/(\d{4})(\d)/, 'xxx.$2')
        .replace(/(\d{3})(\d{1,2})/, 'xxx-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

export const cpfMaskVisible = value => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

export const cnpjMask = (value) => {
    return value
        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}

export function formatarMoeda(elemento) {
    var valor = elemento.value;

    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    elemento.value = valor;
}
