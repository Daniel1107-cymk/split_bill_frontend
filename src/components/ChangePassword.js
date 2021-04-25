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
import { useForm, Controller } from 'react-hook-form';
// helper
import * as API from '../helpers/network';

const ChangePassword = (props) => {
    const { control, handleSubmit, reset } = useForm();
    const [errors, setError] = useState({
        current_password: null,
        password: null,
        password_confirmation: null,
    });

    const onSubmit = async (data) => {
        const result = await API.post('change-password', JSON.stringify(data));
        if(result.success) {
            ToastAndroid.show(
                `Password changed successfully`,
                ToastAndroid.SHORT
            );
            props.handleShowChangePassword();
        } else {
            Object.keys(result.data.data).forEach(key => {
                key === 'current_password'
                ? setError(prevError => ({
                    ...prevError,
                    current_password: result.data.data[key][0],
                }))
                : key === 'password'
                ? setError(prevError => ({
                    ...prevError,
                    password: result.data.data[key][0],
                }))
                : key === 'password_confirmation'
                ? setError(prevError => ({
                    ...prevError,
                    password_confirmation: result.data.data[key][0],
                }))
                : null
            });
        }
        reset();
    }

    const errorHandler = (type) => {
        setError(prevError => ({
            ...prevError,
            current_password: type === "current_password" ? null : errors.current_password,
            password: type === "password" ? null : errors.password,
            password_confirmation: type === "password_confirmation" ? null : errors.password_confirmation,
        }))
    }

    const handleCancel = () => {
        reset();
        props.handleShowChangePassword();
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.title}>Change Password</Text>
                <Controller 
                    name="current_password"
                    control={control}
                    render={({ onChange, value }) => (
                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={(value) => {
                                onChange(value);
                                errorHandler("current_password")
                            }}
                            value={value}
                            placeholder="Current Password"
                        />
                    )}
                    defaultValue=""
                />
                {errors.current_password !== null && 
                    <View style={styles.textErrorWrapper}>
                        <Text style={styles.textError}>
                            {errors.current_password}
                        </Text>
                    </View>
                }
                <Controller 
                    name="password"
                    control={control}
                    render={({ onChange, value }) => (
                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={(value) => {
                                onChange(value);
                                errorHandler("password")
                            }}
                            value={value}
                            placeholder="New Password"
                        />
                    )}
                    defaultValue=""
                />
                {errors.password !== null && 
                    <View style={styles.textErrorWrapper}>
                        <Text style={styles.textError}>
                            {errors.password}
                        </Text>
                    </View>
                }
                <Controller 
                    name="password_confirmation"
                    control={control}
                    render={({ onChange, value }) => (
                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={(value) => {
                                onChange(value);
                                errorHandler("password_confirmation")
                            }}
                            value={value}
                            placeholder="Password Confirmation"
                        />
                    )}
                    defaultValue=""
                />
                {errors.password_confirmation !== null && 
                    <View style={styles.textErrorWrapper}>
                        <Text style={styles.textError}>
                            {errors.password_confirmation}
                        </Text>
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
                        onPress={handleSubmit(onSubmit)}
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

export default ChangePassword;