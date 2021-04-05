import React, { useEffect } from 'react';
import { 
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const Split = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
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
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listSection: {
        flex: 5,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Split;