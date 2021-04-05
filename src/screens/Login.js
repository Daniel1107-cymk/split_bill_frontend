import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet, 
    View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
// helper
import * as API from '../helpers/network';
import Token from '../helpers/tokenHandler';

const Login = ({ navigation }) => {
    const { control, handleSubmit, reset } = useForm();
    const [errors, setError] = useState({
        email: null,
        password: null,
    });

    const onSubmit = async (data) => {
        const result = await API.post('login', JSON.stringify(data));
        if(!result.success) {
            const error = result.data;
            if (error !== null) {
                Object.keys(error.data).forEach((key) => {
                    key === 'email' 
                    ?   setError(prevError => ({
                            ...prevError,
                            email: error.data[key][0],
                        }))
                    :   setError(prevError => ({
                        ...prevError,
                            password: error.data[key][0],
                        }))
                });
                return;
            }
        }
        reset();
        const { access_token, expires_in } = result.data.data;
        Token.save(access_token, expires_in);

        navigation.navigate("Home");
    }

    const errorHandler = (type) => {
        setError(prevError => ({
            ...prevError,
            email: type === "email" ? null : errors.email,
            password: type === "password" ? null : errors.password,
        }))
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.title}>Sign In</Text>
                <Controller 
                    name="email"
                    control={control}
                    render={({field:{ onChange, value }}) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => {
                                onChange(value);
                                errorHandler("email")
                            }}
                            value={value}
                            placeholder="Email"
                        />
                    )}
                    defaultValue=""
                />
                {errors.email !== null && (
                    <View style={styles.textErrorWrapper}>
                        <Text style={styles.textError}>
                            {errors.email}
                        </Text>
                    </View>
                )}
                <Controller 
                    name="password"
                    control={control}
                    render={({field:{ onChange, value }}) => (
                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={(value) => {
                                onChange(value);
                                errorHandler("password")
                            }}
                            value={value}
                            placeholder="Password"
                        />
                    )}
                    defaultValue=""
                />
                {errors.password !== null && (
                    <View style={styles.textErrorWrapper}>
                        <Text style={styles.textError}>
                            {errors.password}
                        </Text>
                    </View>
                )}
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={{color: '#03befc'}}>Doesn't have an account?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white"
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
        justifyContent: "space-between", 
        width: "100%",
        marginTop: 5,
    },
    button: {
        width: 100,
        height: 40,
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

export default Login