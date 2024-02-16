import { StyleSheet,View, Text, TextInput, TouchableOpacity, Alert, ImageBackground} from 'react-native'
import React, { useState } from "react";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginPhone = ({navigation}) => {
    const [phoneNumber , setPhoneNumber] = useState("")
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
    return (
    <View style={styles.container}>

        <ImageBackground source={require("../../assets/man2.png")} style={styles.image_design_1}>
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
                    Register Here
                </Text>

            </View>
        </ImageBackground>
    </View>
  )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", 
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
    }
})


export default LoginPhone