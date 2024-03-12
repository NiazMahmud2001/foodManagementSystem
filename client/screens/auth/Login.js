import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import Loader1 from "../loader/Loader1";
import axios from "axios";
import { Dropdown } from 'react-native-element-dropdown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userType: "",
            easeLoader: true,
            email: "",
            password: "",
            loading: false,
            value: null,
        };

        //this.ip = "192.168.70.35";
        this.ip = "172.29.22.18";
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ easeLoader: false });
        }, 8000);
    }

    handleSubmit = async () => {
        try {
            this.setState({ loading: true });

            const { email, password, userType } = this.state;

            if (!email || !password) {
                Alert.alert("Please Fill All Fields");
                this.setState({ loading: false });
                return;
            } else {
                console.log("userType: ", userType);
                if (userType === "User") {
                    var reg_url = `http://${this.ip}:9090/api/auth/login/email/user/loginMail`;
                    console.log(email , password)
                    const { data } = await axios.post(
                        reg_url,
                        {
                            email: email,
                            user_password: password,
                        }
                    );
                    console.log("status of login: ", data);
                    if(data.success){
                        this.props.navigation.navigate("MainInterface");
                    }else{
                        Alert.alert(data.message)
                    }
                } else {
                    var reg_url = `http://${this.ip}:9090/api/auth/login/email/volunteer/loginMailVol`;
                    console.log(email , password)
                    const { data } = await axios.post(
                        reg_url,
                        {
                            email: email,
                            user_password: password,
                        }
                    );
                    console.log("status of login: ", data);
                    if(data.success){
                        //console.log(data.volID , data.orgName)
                        this.props.navigation.navigate("VolInterface", {
                            volId: data.volID,
                            orgName: data.orgName
                        });
                    }else{
                        Alert.alert(data.message)
                    }
                }
        
                this.setState({ loading: false });
                console.log("login mail Data==> ", { email, password });
            }

            this.setState({ loading: false });
            console.log("login mail Data==> ", { email, password });
        } catch (error) {
            this.setState({ loading: false });
            Alert.alert(error.response.data.message);
            console.log(error.response.data.message);
            console.log("user failed to login mail from front end!!!");
        }
    };

    render() {
        const { navigation } = this.props;
        const { easeLoader, email, password, loading, userType, value } = this.state;

        const useType = [
            { key: '1', value: 'User' },
            { key: '2', value: 'Volunteer' },
        ];

        return (
            <>
                <View style={styles.container}>
                    <ImageBackground blurRadius={1} source={require("../../assets/man2.png")} style={styles.image_design_1}>
                        <BlurView intensity={0} tint="light" style={styles.inner_design}>
                            <Text style={styles.pageTitle}>Login</Text>
                            <View style={{ marginHorizontal: 20 }}>
                                <Text>Email</Text>
                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="Please enter your Email"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoComplete="email"
                                    value={email}
                                    onChangeText={(text) => {
                                        this.setState({ email: text });
                                    }}
                                />
                                <Text>Password</Text>
                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="Please enter your password"
                                    secureTextEntry={true}
                                    autoComplete="password"
                                    value={password}
                                    onChangeText={(text) => {
                                        this.setState({ password: text });
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
                                            this.setState({ value: item.value });
                                            if (item.value === "User") {
                                                this.setState({ userType: "User" });
                                            } else {
                                                this.setState({ userType: "Volunteer" });
                                            }
                                        }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.submitBtn} onPress={() => { this.handleSubmit(); }}>
                                    <Text style={styles.btnText}>
                                        {loading ? "Please wait..." : "Login"}
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={styles.linkText}
                                    onPress={() => {
                                        navigation.navigate("LoginPhone", {
                                            ip: this.ip
                                        });
                                    }}
                                >
                                    Login With Phone number
                                </Text>
                                <Text
                                    style={styles.linkText}
                                    onPress={() => {
                                        navigation.navigate("Register", {
                                            ip: this.ip
                                        });
                                    }}
                                >
                                    Sign Up
                                </Text>
                            </View>
                        </BlurView>
                        <Text style={styles.text_design}>FoodFlow</Text>
                    </ImageBackground>
                </View>
                {easeLoader ? <Loader1 /> : null}
            </>
        );
    }
}

const styles = StyleSheet.create({
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
});

export default Login;
