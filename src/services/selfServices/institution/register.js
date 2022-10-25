const { default: gateway } = require("../gateway")

export const RegisterInstitution = async (data) => {
    try {
        const response = await gateway.post(`/edu-core/open/institution`, {
            data
          });

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