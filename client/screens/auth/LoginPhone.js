import { StyleSheet,View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import React, { useState } from "react";
import {Dimensions} from 'react-native';
import { BlurView } from 'expo-blur';
import axios from "axios";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const LoginPhone = ({navigation}) => {
    const [phoneNumber , setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        try {
          setLoading(true);
          if (!phoneNumber || !password) {
            Alert.alert("Please Fill All Fields");
            setLoading(false)
            return;
          }else{
            var reg_url = "http://192.168.70.89:9090/api/auth/login/phone/user/loginPhone";
                const {data} = await axios.post(
                    reg_url , 
                    {
                        phone_number: phoneNumber,
                        user_password : password,
                    }
                )
                //console.log(data.message)
                console.log(data.success)
                if(data.success){
                    navigation.navigate("MainInterface")
                }else{
                    Alert.alert(data.message)
                }
          }
          setLoading(false);
          console.log("Register Data==> ", {phoneNumber, password });
        } catch (error) {
            setLoading(false);
            Alert.alert(error.response.data.message)
            console.log(error.response.data.message)
            console.log("user failed to register from front end!!!")
        }
    };
    return (
    <View style={styles.container}>
        <ImageBackground  blurRadius={1} source={require("../../assets/man2.png")} style={styles.image_design_1}>
            <BlurView intensity={0} tint="light" style={styles.inner_design}>
                <Text style={styles.pageTitle}>Login</Text>
                <View style = {{marginHorizontal: 20}}>
        
                    <Text>Phone Number</Text>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder = "Please enter you Phone number"
                        autoCorrect= {false}
                        keyboardType="phone-pad"
                        autoComplete="tel"
                        value={phoneNumber}
                        maxLength = {13} 
                        onChangeText={(text)=>{
                            setPhoneNumber(text)
                        }}
                    />
        
                    <Text>Password</Text>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder = "Please enter password"
                        secureTextEntry={true}
                        autoComplete="password"
                        value={password}
                        setValue={setPassword}
                        onChangeText={(text)=>{
                            setPassword(text)
                        }}
                    />
                    <TouchableOpacity style={styles.submitBtn} onPress={()=>{handleSubmit()}}>
                        <Text style={styles.btnText}>
                            {loading? "Please wait..." : "Login"}
                            {/*this loading is useState*/}
                        </Text>
                    </TouchableOpacity>
        
                    <Text 
                        style={styles.linkText} 
                        onPress={()=>{
                            navigation.navigate("Login")
                        }}
                    >
                        Login With Email
                    </Text>
                    <Text 
                        style={styles.linkText} 
                        onPress={()=>{
                            navigation.navigate("Register")
                        }}
                    >
                        Sign Up
                    </Text>
        
                </View>
            </BlurView>
            <Text style={styles.text_design}>FoodFlow</Text>
        </ImageBackground>
    </View>
  )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", 
        backgroundColor: "#e1d5c9",
    },
    image_design_1:{
        resizeMode: "cover", //cover , contain , stretch, 
        width: windowWidth,  
        height: windowHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    inner_design:{
        width: windowWidth-50,  
        height: windowHeight/1.9,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor:"#000",
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1e2225"
    },
    inputBox: {
        height: 40, 
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 10 , //marginTop(outside) => means "inputBox" k top a dika 10 px besi place dilam
        paddingLeft: 10, //paddingLeft(inside) => means "inputBox" k vitorer dika left side a 10px padding dea dilam
        color: "#af9f85"
    },
    submitBtn:{
        backgroundColor: "#1e2225",
        height: 40,
        marginHorizontal: 25,
        marginTop: 20, 
        borderRadius: 80,
        borderBottom: 20,
        justifyContent: "center"
    },
    btnText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "400",
    },
    linkText: {
        backgroundColor: "transparent",
        width: "100%", 
        marginTop: 20,
        fontSize: 15, 
        justifyContent: "center", 
        textAlign: "center",
        textDecorationLine: "underline",
        textDecorationColor: "#000",
    },
    text_design:{
        fontSize: 20,
        textDecorationStyle: "solid",
        textDecorationLine:'underline' ,
        color: '#000000',
        letterSpacing: 2,
        paddingTop: 70,
        fontWeight:"bold",
    }
})


export default LoginPhone