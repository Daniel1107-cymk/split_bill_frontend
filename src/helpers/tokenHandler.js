import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Token {
    static save(token, expire) {
        const tokenExpired = Date.now() + expire * 1000;
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("token_expired", tokenExpired.toString());
    }
  
    static isExpired() {
        const currentTime = Date.now();
        const tokenExpired = AsyncStorage.getItem("token_expired");
        return +currentTime >= +tokenExpired.toInt();
    }
  
    static removeToken() {
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("token_expired");
    }
  }