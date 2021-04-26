import React, { useState, useEffect } from 'react';
import {
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet, 
    View,
} from 'react-native';
// helper
import * as API from '../helpers/network';

const UpdateProfile = (props) => {
    const [fullname, setFullname] = useState(props.fullname);

    const onSubmit = async () => {
        if(fullname === "") {
            return
        }
        const data = {
            full_name: fullname,
        }
        const result = await API.post('update-profile', JSON.stringify(data));
        if(result.success) {
            ToastAndroid.show(
                `Fullname changed successfully`,
                ToastAndroid.SHORT
            );
            props.getProfileData();
            props.handleShowUpdateProfile();
        };
    }

    const handleCancel = () => {
        props.handleShowUpdateProfile();
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <TextInput 
                    style={styles.input}
                    onChangeText={setFullname}
                    defaultValue={fullname}
                    placeholder="Full Name"
                />
                {fullname === "" && 
                    <View style={styles.textErrorWrapper}>
                        <Text style={styles.textError}>Field cannot be empty</Text>
                    </View>
                }
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancel}
                    >
                        <Text style={{color: 'gray'}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={onSubmit}
                    >
                        <Text style={{color: 'white'}}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
        marginTop: 5,
    },
    cancelButton: {
        height: 40,
        marginRight: 10,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
    saveButton: {
        height: 40,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#03befc",
    },
    textErrorWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start", 
        width: "100%",
        marginBottom: 5,
    },
    textError: {
        color: "red",
    }
})

export default UpdateProfile;