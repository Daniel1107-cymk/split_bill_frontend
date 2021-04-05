import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Token {
    static async save(token, expire) {
        const tokenExpired = Date.now() + expire * 1000;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("token_expired", tokenExpired.toString());
    }
  
    static async isExpired() {
        const currentTime = Date.now();
        const tokenExpired = await AsyncStorage.getItem("token_expired");
        return +currentTime >= +tokenExpired;
    }
  
    static async removeToken() {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("token_expired");
    }
  }