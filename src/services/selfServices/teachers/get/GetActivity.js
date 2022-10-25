const { default: gateway } = require("../../gateway")

export const GetActivity = async (id) => {
    try {
        const response = await gateway.get(`activities/lists/${id}`);
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