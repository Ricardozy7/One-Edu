import axios from "axios";

const gateway = axios.create({
    baseURL:  window.ENV.API_URL,
});

async function intercepter(config) {
    const token = localStorage.getItem('@onetkn');
    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
}

gateway.interceptors.request.use(intercepter);
gateway.interceptors.response.use(e => e, async reject => {
    if (reject.response?.status === 401) {
        const token = localStorage.getItem('@onetkn');
        // if (token) {
        //     localStorage.removeItem('@onetkn');
        //     document.location.reload();
        // }
    }
    return Promise.reject(reject);
})

export default gateway;