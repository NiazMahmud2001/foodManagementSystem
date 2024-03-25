import { StyleSheet,View, Text, TextInput, TouchableOpacity, Alert,Image, ImageBackground} from 'react-native'
import React, { useState } from "react";
import {Dimensions} from 'react-native';
import { BlurView } from 'expo-blur';
import Loader1 from "../loader/Loader1";
import time_loader from "../loader/Loader1"
import axios from "axios";
import { Dropdown } from 'react-native-element-dropdown';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation , route}) => {

    const [userType , setUserType] = useState("")
    const [easeLoader , setEraseLoader] = useState(true)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState();

    //var ip = "10.255.252.30";
    //var ip = "192.168.70.35";
    var ip = "192.168.70.89";
    //var ip = "172.29.22.18";
    //var ip = "172.29.45.90";
    var port = "9090"

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!email || !password) {
              Alert.alert("Please Fill All Fields");
              setLoading(false)
              return;
            }else{
                console.log("userType: ", userType);
                if (userType == "User"){
                    var reg_url = `http://${ip}:${port}/api/auth/login/email/user/loginMail`;
                    const {data} = await axios.post(
                        reg_url , 
                        {
                            email: email,
                            user_password : password,
                        }
                    )
                    console.log(data.message)
                    const points = data.message.points;
                    const userNName = data.message.user_name;
                    console.log("status of login: ", data)
                    if(data.success){
                        var foodFetch_url = `http://${ip}:${port}/api/auth/fetch/food/allFood/fetchFood`;
                        const {data} = await axios.post(
                            foodFetch_url , 
                            {
                                email: email,
                                phone: "fromMail"
                            }
                        )
                        //console.log("data got1: " ,data.message)
                        if(data.success){
                            navigation.replace("MainInterface",{
                                email: email,
                                phone: "fromMail", 
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
                }else{
                    console.log("vol call!!!")
                    var reg_url = `http://${ip}:9090/api/auth/login/email/volunteer/loginMailVol`;
                    const {data} = await axios.post(
                        reg_url , 
                        {
                            email: email,
                            user_password : password,
                        }
                    )
                    //console.log(data.message)
                    console.log("status of login: ", data)
                    if(data.success){
                        //console.log(data.volID , data.orgName)
                        navigation.replace("VolInterface", {
                            volId: data.volID,
                            orgName: data.orgName, 
                            ip: ip, 
                            port: port
                        })
                        //console.log("asdf")
                    }else{
                        Alert.alert(data.message)
                    }
                }
            }
            setLoading(false);
            console.log("login mail Data==> ", {email, password });
        } catch (error) {
            setLoading(false);
            Alert.alert(error.response.data.message)
            console.log(error.response.data.message)
            console.log("user failed to login mail from front end!!!")
        }
    };
    const useType = [
        {key:'1', value:'User'},
        {key:'2', value:'Volunteer'},
    ]

    setTimeout(()=>{
        setEraseLoader(false)
    }, 8000)

    return (
    <>
    <View style={styles.container}>
        <View style={styles.txtImg_design_1}>
            <Image style={styles.logoImg} source={require('../../assets/man22.png')}/>
            <View style={styles.text_designTop}>
                <Text style={styles.text_design}>FoodFlow</Text>
            </View>
        </View>
        <View>
            <BlurView intensity={10} tint="dark" style={styles.inner_design}>
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
                    <View style={styles.canScanOrMan}>
                        <Dropdown
                            style={styles.dropdown_scan}
                            containerStyle={styles.dropdownBox_style}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            backgroundColor={"rgba(0,0,0,0.3)"}
                            data={useType}
                            maxHeight={150}
                            labelField="value"
                            valueField="key"
                            value={value}
                            placeholder={"Select User Type"}
                            onChange={(item) => {
                                setValue(item.value)
                                if (item.value == "User"){
                                    setUserType("User")
                                }else{
                                    setUserType("Volunteer")
                                }
                            }}
                        />
                    </View>
                    <TouchableOpacity style={styles.submitBtn} onPress={()=>{handleSubmit()}}>
                        <Text style={styles.btnText}>
                            {loading? "Please wait..." : "Login"}
                            {/*this loading is useState*/}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.bottomButtonCont}>
                        <TouchableOpacity style={styles.submitBtnBottomTxt} onPress={()=>{
                            navigation.navigate("LoginPhone", {
                                ip: ip, 
                                port: port
                            })
                        }}>
                            <Text style={styles.linkText}> Login Phone </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitBtnBottomTxt} onPress={()=>{
                            navigation.navigate("Register" , {
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
    </View>
    {easeLoader ? <Loader1 />: null }
    </>
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
        //blur view
        width: windowWidth-50,  
        height: windowHeight/1.7,
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
        color: "#ffffff",
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
    text_designTop:{
        height: 120,
        width: 150,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    text_design:{
        fontSize: 21,
        textDecorationStyle: "solid",
        color: '#000000',
        letterSpacing: 2,
        fontWeight:"bold",
    },
    canScanOrMan:{
        width: 320, 
        height: 38,
        borderRadius: 5,
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        marginBottom: 16,
        marginTop: 15,
    },
    dropdown_scan: {
        height: 45,
        width:"100%",
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
    },
    dropdownBox_style:{
        fontSize: 12,
        borderRadius: 10,
    },
    placeholderStyle: {
        fontSize: 13,
    },
    selectedTextStyle: {
        fontSize: 13,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        //search input styling
        height: 35,
        fontSize: 13,
    },
})

export default Login