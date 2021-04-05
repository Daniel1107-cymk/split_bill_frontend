import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
// helper
import Token from '../helpers/tokenHandler';

const Home = ({ navigation }) => {

    useEffect(() => {
        if(Token.isExpired() === true) {
            navigation.navigate('Login');
        }
    }, []);

    return (
        <View></View>
    )
}

export default Home;