const { default: gateway } = require("../../gateway")

export const UpdateLabels = async ({
    idActivity,
    data
}) => {
    try {
        const response = await gateway.put(`activities/${idActivity}`, data);
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
