import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const window = Dimensions.get('window');

const Result = (props) => {
    return (
        <View style={styles.overlayContainer}>
            <View style={styles.resultContainer}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '700', marginVertical: 5,}}>Result</Text>
                    <Text style={styles.resultText}>Input Person : {props.personCount}</Text>
                    <Text style={styles.resultText}>Total : {props.total}</Text>
                    <Text style={styles.resultText}>Total Splitted : {(props.total / props.personCount).toFixed(0)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={props.handleReset}>
                        <Text style={styles.buttonText}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        paddingHorizontal: 20,
    },
    resultContainer: {
        width: '100%',
        height: window.height * 30 / 100,
        backgroundColor: 'white',
        elevation: 2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 5,
        padding: 20,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: '30%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#03befc',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
    },
    resultText: {
        fontWeight: '700',
        fontSize: 16,
        marginVertical: 5,
    }
})

export default Result;