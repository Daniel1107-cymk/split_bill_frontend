import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
//component
import ChangePassword from '../components/ChangePassword';
// helper
import Token from '../helpers/tokenHandler';
import * as API from '../helpers/network';
//icon
import IonIcons from '@expo/vector-icons/Ionicons';

const Profile = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [billData, setBillData] = useState([]);
    const [isShowChangePassword, setIsShowChangePassword] = useState(false);

    const getProfileData = async () => {
        const result = await API.get('me');
        if(result.success) {
            setUserData(result.data.data);
        }
    }

    const handleShowChangePassword = () => {
        setIsShowChangePassword(!isShowChangePassword);
    }

    const getBillData = async () => {
        const result = await API.get('bill');
        if(result.success) {
            setBillData(result.data.data);
        }
    }

    const Logout = async () => {
        await Token.removeToken();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    useEffect(() => {
        getProfileData();
        getBillData();
        // eslint-disable-next-line
    }, [])

    return (
        <SafeAreaView style={{flex: 1, padding: 20,}}>
            <View style={styles.profileSection}>
                <View style={{flex: 1.3}}>
                    <IonIcons name={"person-circle-outline"} color="#000" size={100} style={styles.profilePicture} />
                </View>
                <View style={styles.profileDetailContainer}>
                    <View style={{width: '100%'}}>
                        {userData !== null &&
                            <>
                                <Text style={{fontSize: 20}}>{userData.full_name}</Text>
                                <Text>{userData.email}</Text>
                                <TouchableOpacity
                                    onPress={handleShowChangePassword}
                                    style={styles.changePasswordButton}
                                >
                                    <Text style={{color: 'gray'}}>Change Password</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                    <TouchableOpacity
                        onPress={Logout}
                        style={styles.logoutButton}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>History</Text>
            {billData.length > 0
                ? (
                    <ScrollView style={styles.historySection}>
                        <View style={styles.historyDetailContainer}>
                            <Text>Commodo et pariatur officia labore labore Lorem eiusmod ullamco adipisicing qui officia amet voluptate incididunt.</Text>
                        </View>
                        <View style={styles.historyDetailContainer}>
                            <Text>Commodo et pariatur officia labore labore Lorem eiusmod ullamco adipisicing qui officia amet voluptate incididunt.</Text>
                        </View>
                        <View style={styles.historyDetailContainer}>
                            <Text>Commodo et pariatur officia labore labore Lorem eiusmod ullamco adipisicing qui officia amet voluptate incididunt.</Text>
                        </View>
                        <View style={styles.historyDetailContainer}>
                            <Text>Commodo et pariatur officia labore labore Lorem eiusmod ullamco adipisicing qui officia amet voluptate incididunt.</Text>
                        </View>
                        <View style={styles.historyDetailContainer}>
                            <Text>Commodo et pariatur officia labore labore Lorem eiusmod ullamco adipisicing qui officia amet voluptate incididunt.</Text>
                        </View>
                        <View style={styles.historyDetailContainer}>
                            <Text>Commodo et pariatur officia labore labore Lorem eiusmod ullamco adipisicing qui officia amet voluptate incididunt.</Text>
                        </View>
                    </ScrollView>
                    ) 
                : (
                    <View style={styles.emptyHistorySection}>
                        <Text>No History</Text>
                    </View>
                )
            }
            {isShowChangePassword && <ChangePassword handleShowChangePassword={handleShowChangePassword} />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 24,
    },
    profileSection: {
        height: '30%',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    profilePicture: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    profileDetailContainer: {
        flex: 3,
        padding: 10,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    emptyHistorySection: {
        flex: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    historySection: {
        height: '80%',
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    historyDetailContainer: {
        height: 100,
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'gray',
    },
    logoutButton: {
        backgroundColor: '#03befc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 40,
        borderRadius: 5,
    },
    changePasswordButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
    },
    logoutText: {
        color: 'white',
    },
})

export default Profile;