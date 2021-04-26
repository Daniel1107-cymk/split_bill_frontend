import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View, ToastAndroid, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
//icon
import IonIcons from '@expo/vector-icons/Ionicons';

const Cameras = props => {
  const cameraRef = useRef(null);
  const type = Camera.Constants.Type.back;
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [ImageUri, setImageUri] = useState(null);

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
        setImageUri(result.uri);
        setIsShowConfirm(true);
      }
    } else {
      ToastAndroid.show(
        'Sorry, please try again!',
        ToastAndroid.SHORT
      );
    }
  }

  const ImageConfirm = () => {
    props.handleIsShowCamera();
    props.handleTesseractOcr(ImageUri);
  }

  const pickImage = async () => {
    ToastAndroid.show(
      'Sorry, this feature cannot be use in a moment!',
      ToastAndroid.SHORT
    );
    return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      let uri = result.uri.replace('file:/', '');
      props.handleIsShowCamera();
      props.handleTesseractOcr(uri);
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
      {isShowConfirm
        ? <View style={styles.camera}>
            <Image source={{uri: ImageUri}} style={styles.imageConfirm} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'transparent'}]}
                onPress={() => setIsShowConfirm(false)}
              >
                <IonIcons name={"close-circle-outline"} color="#fff" size={60} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'transparent'}]}
                onPress={ImageConfirm}
              >
                <IonIcons name={"checkmark-circle-outline"} color="#fff" size={60} />
              </TouchableOpacity>
            </View>
          </View>
        : <Camera 
            style={styles.camera} 
            type={type} 
            ratio={"16:9"} 
            onCameraReady={handleOnCameraReady}
            ref={cameraRef}
            flashMode="off"
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
      }
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
  imageConfirm: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.15,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
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