const { default: gateway } = require("../gateway")

export const login = async (data, nickname) => {
    try {
        const response = await gateway.post(`/registration/login`, {
            ...data
          });

        return response.data;
    } catch (reason) {
        if (reason.response) {
            const { data } = reason.response;
            return data;
        }
        return {
            error: "Problemas ao se conectar com o serviço",
            severity: 'error'
        }
    }
}