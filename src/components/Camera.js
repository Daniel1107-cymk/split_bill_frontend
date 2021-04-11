import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ToastAndroid, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
//icon
import IonIcons from '@expo/vector-icons/Ionicons';

const Cameras = props => {
  const cameraRef = useRef(null);
  const type = Camera.Constants.Type.back;
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestPermissionsAsync();
      const galleryPermisson = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(cameraPermission.status === 'granted');
      if (galleryPermisson.status !== 'granted') {
        ToastAndroid.show(
          'Sorry, we need camera roll permissions to make this work!',
          ToastAndroid.SHORT
        );
      }
    })();
  }, []);

  const handleOnCameraReady = () => {
    setIsCameraReady(true);
  }

  const captureImage = async () => {
    if(cameraRef !== null) {
      if(isCameraReady) {
        const result = await cameraRef.current.takePictureAsync();
        props.handleTesseractOcr(result.uri);
        props.handleIsShowCamera();
      }
    } else {
      ToastAndroid.show(
        'Sorry, please try again!',
        ToastAndroid.SHORT
      );
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      props.handleTesseractOcr(result.uri);
      props.handleIsShowCamera();
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type} 
        ratio={"16:9"} 
        onCameraReady={handleOnCameraReady}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'white'}]}
            onPress={pickImage}
          >
            <IonIcons name={"image-outline"} color="#000" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={captureImage}
          >
            <Text>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'transparent'}]}
            onPress={props.handleIsShowCamera}
          >
            <IonIcons name={"close-circle-outline"} color="#fff" size={60} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flex: 0.15,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default Cameras;