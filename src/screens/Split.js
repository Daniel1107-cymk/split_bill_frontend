import React, { useState, useEffect } from 'react';
import { 
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    View,
} from 'react-native';
import TesseractOcr, { LANG_INDONESIAN, LEVEL_LINE, LEVEL_BLOCK, useEventListener } from 'react-native-tesseract-ocr';
// component
import Camera from '../components/Camera';
// helper
import * as API from '../helpers/network';

const Split = () => {
    const [personCount, setPersonCount] = useState("");
    const [total, setTotal] = useState(0);
    const [progress, setProgress] = useState(0);
    const [flag, setFlag] = useState({
        isLoading: false,
        isShowCamera: false,
        calculateCompleted: false,
    });
    useEventListener('onProgressChange', (p) => {
        setProgress(p.percent);
    });

    const handleIsShowCamera = () => {
        setFlag(prevFlag => ({
            ...prevFlag,
            isShowCamera: !flag.isShowCamera,
        }));
    }

    const handleFailCalculate = () => {
        ToastAndroid.show(
            `Sorry, we couldn't find the total value, please try again!`,
            ToastAndroid.SHORT
        );
    }

    const handleReset = () => {
        setPersonCount("");
        setTotal(0);
        setFlag(prevFlag => ({
            isLoading: false,
            isShowCamera: false,
            calculateCompleted: false,
        }));
    }

    const submitBill = async (data) => {
        let newData = {
            total_people: personCount,
            grand_total: (data / personCount).toFixed(0),
        };
        const result = await API.post('bill', JSON.stringify(newData));
        if(result.success) {
            return ToastAndroid.show(
                "Data successfully added",
                ToastAndroid.SHORT
            );
        }
        ToastAndroid.show(
            "Data fail to upload",
            ToastAndroid.SHORT
        );
    }

    const handleTesseractOcr = async (path) => {
        if(personCount === "") {
            ToastAndroid.show(
                "Please input total people",
                ToastAndroid.SHORT
            );
            return
        }
        setFlag(prevFlag => ({
            ...prevFlag,
            isLoading: true,
        }));
        try {
            const options = {
                level: LEVEL_BLOCK
            };
            const recognizedText = await TesseractOcr.recognizeTokens(path, LANG_INDONESIAN, options);
            const arrSplittedLine = recognizedText[0].token.split('\n');
            for(let i=0; i < arrSplittedLine.length; i++) {
                if(arrSplittedLine[i].search("TOTAL") === 0) {
                    let strTotal = arrSplittedLine[i];
                    let intTotal = strTotal.replace(/\D/g, "");
                    setTotal(intTotal);
                    await submitBill(intTotal);
                    setFlag(prevFlag => ({
                        ...prevFlag,
                        isLoading: false,
                        calculateCompleted: true,
                    }));
                    return
                }
            }
            handleFailCalculate();
        } catch (err) {
            ToastAndroid.show(
                err,
                ToastAndroid.SHORT
            );
        }
        setFlag(prevFlag => ({
            ...prevFlag,
            isLoading: false,
        }));
        setProgress(0);
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            {!flag.isShowCamera
                ? <>
                    <View style={styles.bannerSection}>
                        <Text style={{color: 'black'}}>Person count:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPersonCount}
                            placeholder="Plese input number"
                            keyboardType="number-pad"
                            value={personCount}
                            editable={flag.calculateCompleted ? false : true}
                        />
                    </View>
                    <View style={styles.listSection}>
                        {total !== 0 &&
                            <View style={styles.listHeader}>
                                <TouchableOpacity  style={[styles.button, {width: '30%', alignSelf: 'flex-end'}]} onPress={handleReset}>
                                    <Text style={{color: 'white'}}>Reset</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {personCount !== "" && total === 0 &&
                            <>
                                {flag.isLoading
                                    ? <View style={styles.loadingSection}>
                                        <ActivityIndicator size="large" color="#03befc" />
                                        <Text>Calculating {progress}%</Text>
                                    </View>
                                    : <TouchableOpacity  style={styles.button} onPress={handleIsShowCamera}>
                                        <Text style={{color: 'white'}}>Launch Camera</Text>
                                    </TouchableOpacity>
                                }
                            </>
                        }
                        {flag.calculateCompleted &&
                            <View style={styles.resultContainer}>
                                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '700', marginVertical: 5,}}>Result</Text>
                                <Text style={styles.resultText}>Input Person : {personCount}</Text>
                                <Text style={styles.resultText}>Total : {total}</Text>
                                <Text style={styles.resultText}>Total Splitted : {(total / personCount).toFixed(0)}</Text>
                            </View>
                        }
                        
                    </View>
                </>
                : <Camera
                    handleIsShowCamera={handleIsShowCamera}
                    handleTesseractOcr={handleTesseractOcr}
                />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bannerSection: {
        flex: 1,
        margin: 20,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    listSection: {
        flex: 6,
        margin: 20,
        marginTop: 0,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listHeader: {
        position: 'absolute',
        height: 60,
        padding: 10,
        top: 0,
        left: 0,
        right: 0,
    },
    loadingSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    button: {
        height: 40,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#03befc",
    },
    resultContainer: {
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        padding: 20,
    },
    resultText: {
        fontWeight: '700',
        fontSize: 16,
        marginVertical: 5,
    }
})

export default Split;