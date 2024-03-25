//type: rnfe => to get react native template 
import { StyleSheet,View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import React, { useState } from "react";
import {Dimensions} from 'react-native';
import { BlurView } from 'expo-blur';
import axios from "axios";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({navigation, route}) => {
    const [name, setName] = useState("")
    const [userName , serUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber , setPhoneNumber] = useState("")
    const [loading, setLoading] = useState(false)

    const {ip} = route.params

    const handleSubmit = async () => {
        if(!name || !userName || !phoneNumber ||!email || !password) {
            Alert.alert("Please Fill All Fields");
            return;
        }else{
            setLoading(true);
            console.log("Register Data==> ", { name, email, password });
            try{
                var reg_url = `http://${ip}:9090/api/auth/verify/mail/verifyMailDegit`;
                const {data} = await axios.post(
                    reg_url , 
                    {
                        email: email, 
                        phone_number: phoneNumber
                    }
                )
                //console.log(data.message)
                console.log(data.success)
                if(data.success){
                    //navigation.navigate("Login")
                    navigation.navigate("EmailVerification",{
                        name: name,
                        user_name : userName,
                        user_password: password,
                        email: email, 
                        phone_number: phoneNumber,
                        ip: ip,
                        veriCode: data.message
                    })
                }else{
                    Alert.alert(data.message)
                }
            }catch(error){
                Alert.alert(error.response.data.message)
                console.log(error.response.data.message)
                console.log("user failed to register from front ends!!!")
            }
            setLoading(false)
        }
    };
    return (
    <View style={styles.container}>
            <View style={styles.txtImg_design_1}>
                <Image style={styles.logoImg} source={require('../../assets/man22.png')}/>
                <View style={styles.text_designTop}>
                    <Text style={styles.text_design}>FoodFlow</Text>
                </View>
            </View>
            <BlurView intensity={10} tint="dark" style={styles.inner_design}>
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
                    
                    <View style={{display: "flex" ,flexDirection:"row" , width: windowWidth-100 , marginTop: 25, marginBottom:20}}>
                        <Text style={styles.linkText}>
                            Already Registered Please
                        </Text>
                        <TouchableOpacity style={styles.submitBtnBottomTxt} onPress={()=>{
                            navigation.navigate("Login",{
                                ip: ip
                            })
                        }}>
                            <Text style={styles.linkTexts}> Login </Text>
                        </TouchableOpacity> 
                    </View>
                </View> 
            </BlurView>
    </View>
  )
}

var styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: windowWidth,
        height: windowHeight,
        backgroundColor:"#FAFAFA",
    },
    txtImg_design_1:{
        //background image 
        resizeMode: "cover", //cover , contain , stretch, 
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        flexDirection:"row",
        width: windowWidth,
        height:130
    },
    logoImg:{
        width: 70,
        height:70,
        marginTop:20,
        marginLeft:5
    },
    text_designTop:{
        height: 120,
        width: 150,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
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
        marginTop: 20,
        fontSize: 15, 
        justifyContent: "center", 
        textAlign: "center",
        marginRight: 10,
        marginBottom: 10
    }, 
    innerLinkText:{
        backgroundColor: "green",
        height: 20,
        width: 120, 
    },
    loginLink: {
        color: "red", 
        fontStyle: "normal",
        textDecorationLine: "underline",
        textDecorationColor: "#000",
    },
    submitBtnBottomTxt:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:"#009c10",
        width: 100, 
        height: 40,
        borderRadius: 10,
        marginTop: 10
    },
    text_design:{
        fontSize: 21,
        textDecorationStyle: "solid",
        color: '#000000',
        letterSpacing: 2,
        fontWeight:"bold",
    },
    linkTexts: {
        backgroundColor: "transparent",
        fontSize: 15, 
        height : 40,
        width: 100,
        textAlign: "center",
        paddingTop: 7,
    },
})

export default Register