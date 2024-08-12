import axios from 'axios';

const AI_API = axios.create({
    baseURL: import.meta.env.VITE_AI_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const HISTORY_API = axios.create({
    baseURL: import.meta.env.VITE_HISTORY_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleApiBadRequest = (data) => {
    console.warn(data.message);
}

const handleApiError = (error) => {
    alert('API 호출 도중 에러가 발생하였습니다.')
    console.error('Response error:', error);
}

HISTORY_API.interceptors.response.use(
    res => res.data,
    error => {
        handleApiError(error)
        return Promise.reject(error);
    }
)


AI_API.interceptors.response.use(
    res => {
        const {data} = res
        if (data.code !== 200) {
            handleApiBadRequest(data)
        }

        return data;
    },
    error => {
        handleApiError(error)
        return Promise.reject(error);
    }
);

export {AI_API, HISTORY_API}
