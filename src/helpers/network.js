import axios from 'axios';
import { SERVER_DOMAIN } from '../constants/server';
import Session from './session';
import { errorHandler } from './errorHandler';

const axiosInstance = axios.create({
    baseURL: SERVER_DOMAIN,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = await Session.getValue("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

const getData = async (path) => {
    try {
        const response = await axiosInstance.get(path);
        return {
            success: response.status,
            data: response.data,
        }
    } catch (error) {
        return errorHandler(error);
    }
}

const postData = async (path, data) => {
    try {
        const response = await axiosInstance.post(path, data);
        return {
            success: response.status,
            data: response.data,
        }
    } catch (error) {
        return errorHandler(error);
    }
}

const putData = async (path, data) => {
    try {
        const response = await axiosInstance.put(path, data);
        return {
            success: response.status,
            data: response.data,
        }
    } catch (error) {
        return errorHandler(error);
    }
}

export {
    getData as get,
    postData as post,
    putData as put,
}