import { StyleSheet,View, Text, TextInput, TouchableOpacity, Alert, ImageBackground} from 'react-native'
import React, { useState } from "react";
import {Dimensions} from 'react-native';
import { BlurView } from 'expo-blur';
import Loader1 from "../loader/Loader1";
import time_loader from "../loader/Loader1"


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {

    const [easeLoader , setEraseLoader] = useState(true)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        try {
          setLoading(true);
          if (!email || !password) {
            Alert.alert("Please Fill All Fields");
            setLoading(false)
            return;
          }
          setLoading(false);
          console.log("Register Data==> ", {email, password });
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
    };

    setTimeout(()=>{
        setEraseLoader(false)
    }, 8000)

    return (
    <>
    <View style={styles.container}>
        <ImageBackground  blurRadius={0.73} source={require("../../assets/man2.png")} style={styles.image_design_1}>
            <BlurView intensity={50} tint="regular" style={styles.inner_design}>
                <Text style={styles.pageTitle}>Login</Text>
                <View style = {{marginHorizontal: 20}}>

                    <Text>Email</Text>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder = "Please enter your Email"
                        autoCorrect= {false}
                        keyboardType="email-address"
                        autoComplete="email"
                        value={email}
                        onChangeText={(text)=>{
                            setEmail(text)
                        }}
                    />

                    <Text>Password</Text>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder = "Please enter your password"
                        secureTextEntry={true}
                        autoComplete="password"
                        value={password}
                        setValue={setPassword}
                        onChangeText={(text)=>{
                            setPassword(text)
                        }}
                    />
                    {/*
                        //it is just to test that the code is working well or not
                        <Text>{JSON.stringify({ name, email, password })}</Text>
                    */}
                    <TouchableOpacity style={styles.submitBtn} onPress={()=>{handleSubmit()}}>
                        <Text style={styles.btnText}>
                            {loading? "Please wait..." : "Login"}
                            {/*this loading is useState*/}
                        </Text>
                    </TouchableOpacity>

                    <Text 
                        style={styles.linkText} 
                        onPress={()=>{
                            navigation.navigate("LoginPhone")
                        }}
                    >
                        Login With Phone number
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
            <Text style={styles.text_design}>Food Waste Management System</Text>
        </ImageBackground>
    </View>
    {easeLoader ? <Loader1 />: null }
    </>
  )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", 
        backgroundColor: "#FAFAFA",
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
        fontSize: 15,
        textDecorationStyle: "solid",
        textDecorationLine:'underline' ,
        color: '#000000',
        letterSpacing: 1,
        paddingTop: 70
    }
})

export default Login