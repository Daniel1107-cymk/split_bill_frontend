import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Session {
    static getValue = async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }
    static setValue = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return value;
        } catch (error) {
            return error;
        }
    }
    static removeValue = async (key) => {
        try {
            let keyValue = Session.getValue(key);
            if(keyValue !== null) {
                await AsyncStorage.removeItem(key);
                return keyValue;
            }
            return null;
        } catch (error) {
            return error;
        }
    }
}