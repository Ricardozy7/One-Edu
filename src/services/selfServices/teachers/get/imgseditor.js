const { default: gateway } = require("../../gateway")

export const imagesEditor = async ({ file }) => {
    try {
        const response = await gateway.post(`/assets`, file);
        return response.data;
    } catch (reason) {
        if (reason.response) {
            const { data } = reason.response;
            data.severity = 'error';

            return data;
        }
        return {
            error: "Problemas ao se conectar com o serviço",
            severity: 'error'
        }
    }
}