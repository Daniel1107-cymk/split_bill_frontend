import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const Profile = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.headerSection}>
                <Text>Profile Section</Text>
            </View>
            <View style={styles.historySection}>
                <Text>History Section</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerSection: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    historySection: {
        flex: 3,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Profile;