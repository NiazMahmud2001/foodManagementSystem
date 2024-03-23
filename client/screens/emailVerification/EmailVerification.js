import { StyleSheet,View, Text, TextInput, TouchableOpacity, Alert, ImageBackground} from 'react-native'
import React, { useState } from "react";
import {Dimensions} from 'react-native';
import { BlurView } from 'expo-blur';
import Loader1 from "../loader/Loader1";
import time_loader from "../loader/Loader1"
import axios from "axios";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const EmailVerification = ({navigation , route}) => {
    
    const {name} = route.params
    const {user_name} = route.params
    const {user_password} = route.params
    const {email} = route.params
    const {phone_number} = route.params
    const {ip} = route.params
    const {veriCode} = route.params
    
    const [verifypass, setVerifyPass] = useState("");
    const [easeLoader , setEraseLoader] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleSubmit = async () => {
        if(!name || !user_name || !phone_number ||!email || !user_password) {
            Alert.alert("Please Fill All Fields");
            return;
        }else{
            setLoading(true);
            console.log("Register Data==> ", { name, email, user_password });
            try{
                if(verifypass == veriCode){
                    var reg_url = `http://${ip}:9090/api/auth/reg/user/register`;
                    const {data} = await axios.post(
                        reg_url , 
                        {
                            name: name,
                            user_name : user_name,
                            user_password: user_password,
                            email: email, 
                            phone_number: phone_number
                        }
                    )
                    //console.log(data.message)
                    console.log(data.success)
                    if(data.success){
                        navigation.navigate("Login")
                    }else{
                        Alert.alert(data.message)
                    }
                }else{
                    Alert.alert("Wrong verification code")
                }
            }catch(error){
                Alert.alert(error.response.data.message)
                console.log(error.response.data.message)
                console.log("user failed to register from front end!!!")
            }
            setLoading(false)
        }
    };

    return (
    <>
    <View style={styles.container}>
        <ImageBackground  blurRadius={1} source={require("../../assets/man2.png")} style={styles.image_design_1}>
            <BlurView intensity={0} tint="light" style={styles.inner_design}>
                <View style={{display:"flex", justifyContent:"center" , alignItems:"center", flexDirection:"column" , width: windowWidth , height: windowHeight/3}}>
                    <View style={styles.titlePart}>
                        <Text style={{fontSize: 13 , textDecorationLine: "underline"}}>verification Code has been sent to your Email</Text>
                    </View>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder = "  Please enter verification code"
                        autoCorrect= {false}
                        value={verifypass}
                        onChangeText={(text)=>{
                            setVerifyPass(text)
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit Code</Text>
                </TouchableOpacity>
            </BlurView>
            <Text style={styles.text_design}>FoodFlow</Text>
        </ImageBackground>
    </View>
    {easeLoader ? <Loader1 />: null }
    </>
    )
}

var styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth,  
        height: windowHeight,
        backgroundColor: "#FAFAFA",
    },
    image_design_1:{
        resizeMode: "cover", //cover , contain , stretch, 
        width: windowWidth/2,  
        height: windowHeight/2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
     text_design:{
        fontSize: 20,
        textDecorationStyle: "solid",
        textDecorationLine:'underline' ,
        color: '#000000',
        letterSpacing: 2,
        paddingTop: 70,
        fontWeight:"bold",
    },
    titlePart:{
        width: windowWidth-50,
        height: windowHeight/5,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection : "column",
    },
    inner_design:{
        width: windowWidth-50,  
        height: windowHeight/1.7,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor:"#000",
        display: "flex",
        alignItems: "center",
        justifyContent:"space-between",
        flexDirection:"column"
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1e2225"
    },
    inputBox: {
        height: 40, 
        width: windowWidth-90,
        marginBottom: 20,
        backgroundColor: "#dddddd",
        borderRadius: 10,
        marginTop: 40 , 
        color: "#af9f85",
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: windowWidth-80,
        marginBottom: 50,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 13,
    },
})

export default EmailVerification