import React, { useEffect } from 'react';
import { 
    SafeAreaView,
    ScrollView,
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
            <View style={styles.introductionSection}>
                <Text style={styles.title}>Introduction</Text>
                <View style={styles.introductionContent}>
                    <Text style={styles.content}>This is a split bill application.</Text>
                    <Text style={styles.content}>You can split a bill by taking picture of the receipt and it will calculate automatically.</Text>
                </View>
                <Text style={[styles.content, {fontWeight: '700'}]}>Develop by Flicc Team.</Text>
            </View>
            <ScrollView style={styles.instructionSection} showsVerticalScrollIndicator={false}>
                <Text style={[styles.title, {marginTop: 20}]}>Instruction</Text>
                <View style={styles.instructionContent}>
                    <Text>1. Go to split menu.</Text>
                    <Text>2. Input how many people you want to split.</Text>
                    <Text>3. Make sure the receipt have the total value.</Text>
                    <Text>4. Press camera button and take picture of the receipt.</Text>
                    <Text>5. Make sure the picture is clear and not blurry, if blurry you can retake by press X button.</Text>
                    <Text>6. Press check button if the image condition is good.</Text>
                    <Text>7. Wait until the calculation is complete.</Text>
                </View>
                {/* <Text style={[styles.title, {marginTop: 20}]}>Notes</Text>
                <Text style={{marginVertical: 5, fontWeight: '700', textAlign: 'center'}}>Calculation fails because several reason:</Text>
                <Text>1. Image is not well taken, ex: blurry.</Text>
                <Text>2. Cannot find the total value.</Text> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    introductionSection: {
        height: '25%',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 2,
    },
    introductionContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionSection: {
        flexDirection: 'column',
        marginTop: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 2,
    },
    instructionContent: {
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
    },
    content: {
        textAlign: 'center',
    }
})

export default Home;