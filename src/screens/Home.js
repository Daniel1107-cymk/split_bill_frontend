import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
// helper
import Token from '../helpers/tokenHandler';

const Home = ({ navigation }) => {

    const CheckToken = async () => {
        if(await Token.isExpired()) {
            navigation.navigate('Login');
        }
        console.log(await Token.isExpired())
    }

    useEffect(() => {
        CheckToken();
    }, []);

    return (
        <View></View>
    )
}

export default Home;