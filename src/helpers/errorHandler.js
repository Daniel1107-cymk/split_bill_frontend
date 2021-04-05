import { ToastAndroid } from 'react-native';

export const errorHandler = (error) => {
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const { status, data } = error.response;

    switch (status) {
        case 401:
            showToast("You are not authorized, please login!");
            return {
                success: false,
                data: null,
                redirect: true,
                status: 401,
            }
        case 403:
            // do something when you're unauthorized to access a resource
            console.log("unauthorized", error);
            break;
        case 404:
            // do something when you're unauthorized to access a resource
            showToast("You are not authorized, please login!");
            return {
                success: false,
                data: data,
                redirect: true,
                status: 401,
            }
        case 422:
            return {
                success: false,
                data: data,
                redirect: false,
                status: 422,
            };
        case 500:
            console.log("server error", error);
            break;
        default:
            showToast("Network connection problem, please try again!");
            return {
                success: false,
                data: null,
                redirect: true,
            };
    }
}