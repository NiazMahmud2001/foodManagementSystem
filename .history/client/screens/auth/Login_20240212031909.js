import { StyleSheet,View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from "react";

const Login = ({navigation}) => {
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
    return (
    <View style={styles.container}>

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
                Register Here
            </Text>
            
        </View>
    </View>
  )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", 
        backgroundColor: "#FAFAFA",
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
        backgroundColor: "#e1d5c9",
        borderRadius: 10,
        marginTop: 10 , //marginTop(outside) => means "inputBox" k top a dika 10 px besi place dilam
        paddingLeft: 10, //paddingLeft(inside) => means "inputBox" k vitorer dika left side a 10px padding dea dilam
        color: "#fafafa"
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

export default Login