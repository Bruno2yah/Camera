import { useRef, useState } from 'react';
import { StyleSheet } from "react-native";
import { View,Text, Pressable,Image} from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';



export default function App(){


    const [hasCameraPermission,setHasCameraPermisson] = useState(null);
    const [image,setimage] = useState(null);
    const [image64,setimage64] = useState(null);
    // const [type,setType] = useState(Camera.Constants.Type.front);
    // const [flash,setFlash] = useState(Camera.Constants.FlashMode.on);

    const cameraRef = useRef(null);

    const autorizar = () =>{
        (async () =>{
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermisson(cameraStatus.status=='granted');
        })();
    }
    const takePicture = async()=>{
        if(cameraRef.current){
            const options = {quality:0.5 , base64: true};
            const data = await cameraRef.current.takePictureAsync(options);

            setimage(data.base64)
            console.log(base64)
        }
        if(cameraRef.current){
          try {
            const options = {quality:0.5 , base64: true};
            const data = await cameraRef.current.takePictureAsync(options);

            setimage(data.uri)
            console.log(data)
          } catch (error) {
            console.log(error)
          }
        }
    }


    return (
    <View style={styles.container}>
       <View style={styles.boxCamera}>
            <CameraView style = {styles.camera}  ref={cameraRef}> 
            </CameraView>
       </View>

       <View style={styles.boxBotoes}>
            <View >
                <Pressable onPress={() => {autorizar()}} style={styles.botao}>
                    <Text style={styles.Text}>Autorizar foto</Text>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={() => {takePicture()}} style={styles.botao}>
                    <Text style={styles.Text}>Tirar foto</Text>
                </Pressable>
            </View>
       </View>

       <View style={styles.boxImg}>
            <View style={styles.Img}>
                <Image source={{uri:image}} style={styles.imgTirada} />
            </View>   
       </View>
    </View>  

    );
};



 const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxCamera:{
    flex:0.4,
    borderWidth:1,
    borderColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxBotoes:{
    flex:0.2,
    borderWidth:1,
    borderColor:'yellow',
   flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  boxImg:{
    flex:0.4,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'red',
  },
  Img:{
    width:'60%',
    height:'80%',
    borderWidth:1,
    borderRadius:'50%',
    overflow: 'hidden',
  },
  botao:{
    backgroundColor:'red',
    borderColor:'black',
    borderWidth:1,
    width:100,
    padding:4,
  },
  Text:{
    textAlign:"center",
  },
  camera: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 100,
    overflow: "hidden",
  },
  imgTirada: {
    width: '100%',
    height: '100%'
  }
})