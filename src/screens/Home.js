import React, { useEffect } from 'react';
import { 
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
// helper
import Token from '../helpers/tokenHandler';

const Home = ({ navigation }) => {
    const CheckToken = async () => {
        if(await Token.isExpired()) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }

    useEffect(() => {
        CheckToken();
    }, []);

    return (
        <SafeAreaView style={{flex: 1, padding: 20}}>
            <View style={styles.bannerSection}>
                <Text>Banner Section</Text>
            </View>
            <View style={styles.listSection}>
                <Text>List Section</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bannerSection: {
        flex: 2,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listSection: {
        flex: 3,
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Home;