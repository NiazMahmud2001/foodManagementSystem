//type: rnfe => to get react native template 
import { StyleSheet,View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import React, { useState } from "react";
import {Dimensions} from 'react-native';
import { BlurView } from 'expo-blur';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({navigation}) => {
    const [name, setName] = useState("")
    const [userName , serUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber , setPhoneNumber] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        try {
          setLoading(true);
          if (!name || !email || !password) {
            Alert.alert("Please Fill All Fields");
            setLoading(false)
            return;
          }
          setLoading(false);
          console.log("Register Data==> ", { name, email, password });
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
    };
    return (
    <View style={styles.container}>
        <ImageBackground  blurRadius={0.73} source={require("../../assets/man2.png")} style={styles.image_design_1}>
            <BlurView intensity={50} tint="regular" style={styles.inner_design}>
                <Text style={styles.pageTitle}>Register</Text>
                <View style = {{marginHorizontal: 20}}>
        
                    <Text>Name</Text>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder='Please Enter your Name'
                        value={name}
                        onChangeText={(text) =>{
                            setName(text)
                        }}
                    />
                    <Text>User Name</Text>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder='Please Enter your User Name'
                        value={userName}
                        onChangeText={(text) =>{
                            serUserName(text)
                        }}
                    />
        
                    <Text>Email</Text>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder='Please Enter you mail address'
                        autoCorrect= {false}
                        keyboardType="email-address"
                        autoComplete="email"
                        value={email}
                        onChangeText={(text)=>{
                            setEmail(text)
                        }}
                    />
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
                    {/*
                        //it is just to test that the code is working well or not
                        <Text>{JSON.stringify({ name, email, password })}</Text>
                    */}
                    <TouchableOpacity style={styles.submitBtn} onPress={()=>{handleSubmit()}}>
                        <Text style={styles.btnText}>
                            {loading? "Please wait..." : "Register"}
                            {/*this loading is useState*/}
                        </Text>
                    </TouchableOpacity>
        
                    <Text style={styles.linkText}>
                        Already Registered Please 
                        <Text 
                            style={styles.loginLink} 
                            onPress={()=>{
                                navigation.navigate("Login")
                            }}
                        > 
                            LOGIN 
                        </Text>
                    </Text>
                </View>
            </BlurView>
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
        textAlign: "center"
    }, 
    loginLink: {
        color: "red", 
        fontStyle: "normal",
        textDecorationLine: "underline",
        textDecorationColor: "#000",
    }
})

export default Register