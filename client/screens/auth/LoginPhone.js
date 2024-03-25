import { StyleSheet,View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import React, { useState } from "react";
import {Dimensions} from 'react-native';
import { BlurView } from 'expo-blur';
import axios from "axios";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const LoginPhone = ({navigation , route}) => {
    const [phoneNumber , setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const {ip} = route.params
    const {port} = route.params

    const handleSubmit = async () => {
        try {
          setLoading(true);
          if (!phoneNumber || !password) {
            Alert.alert("Please Fill All Fields");
            setLoading(false)
            return;
          }else{
            var reg_url = `http://${ip}:${port}/api/auth/login/phone/user/loginPhone`;
                const {data} = await axios.post(
                    reg_url , 
                    {
                        phone_number: phoneNumber,
                        user_password : password,
                    }
                )
                //console.log(data.message)
                //console.log(data.success)
                const points = data.message.points;
                const userNName = data.message.user_name;
                if(data.success){
                    var foodFetch_url = `http://${ip}:${port}/api/auth/fetch/food/allFood/fetchFood`;
                    const {data} = await axios.post(
                        foodFetch_url , 
                        {
                            email: "fromPhone",
                            phone: phoneNumber
                        }
                    )
                    if(data.success){
                        navigation.navigate("MainInterface" , {
                            email: "fromPhone",
                            phone: phoneNumber,  
                            ip: ip, 
                            port: port,
                            foodData: data.message,
                            points: points,
                            userNName: userNName
                        })
                    }else{
                        Alert.alert("Food fetching failed!!!")
                    }
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
            <View style={styles.txtImg_design_1}>
                <Image style={styles.logoImg} source={require('../../assets/man22.png')}/>
                <View style={styles.text_designTop}>
                    <Text style={styles.text_design}>FoodFlow</Text>
                </View>
            </View>
            <BlurView intensity={10} tint="dark" style={styles.inner_design}>
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

                    <View style={styles.bottomButtonCont}>
                        <TouchableOpacity style={styles.submitBtnBottomTxt} onPress={()=>{
                            navigation.navigate("Login" , {
                                ip:ip
                            })
                        }}>
                            <Text style={styles.linkText}> Login Email </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitBtnBottomTxt} onPress={()=>{
                            navigation.navigate("Register", {
                                ip: ip, 
                                port: port
                            })
                        }}>
                            <Text style={styles.linkText}> Sign Up </Text>
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
        height:190
    },
    logoImg:{
        width: 70,
        height:70,
        marginTop:20,
        marginLeft:5
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
    bottomButtonCont:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        marginTop:30,
    },
    submitBtnBottomTxt:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:"#009c10",
        width: 120, 
        borderRadius: 10
    },
    btnText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "400",
    },
    linkText: {
        backgroundColor: "transparent",
        fontSize: 15, 
        height : 40,
        width: 100,
        textAlign: "center",
        paddingTop: 7,
    },
    text_design:{
        fontSize: 21,
        textDecorationStyle: "solid",
        color: '#000000',
        letterSpacing: 2,
        fontWeight:"bold",
    },
    text_designTop:{
        height: 120,
        width: 150,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
})


export default LoginPhone