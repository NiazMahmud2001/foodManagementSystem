import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import axios from "axios";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class LoginPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
      loading: false,
    };
  }

  handleSubmit = async () => {
    const { navigation, route } = this.props;
    const { ip } = route.params;

    try {
      this.setState({ loading: true });

      const { phoneNumber, password } = this.state;

      if (!phoneNumber || !password) {
        Alert.alert("Please Fill All Fields");
        this.setState({ loading: false });
        return;
      } else {
        const reg_url = `http://{ip}:9090/api/auth/login/phone/user/loginPhone`;
        const { data } = await axios.post(
          reg_url,
          {
            phone_number: phoneNumber,
            user_password: password,
          }
        );

        console.log(data.success);

        if (data.success) {
          navigation.navigate("MainInterface");
        } else {
          Alert.alert(data.message);
        }
      }

      this.setState({ loading: false });
      console.log("Register Data==> ", { phoneNumber, password });
    } catch (error) {
      this.setState({ loading: false });
      Alert.alert(error.response.data.message);
      console.log(error.response.data.message);
      console.log("user failed to register from front end!!!");
    }
  };

  render() {
    const { navigation, route } = this.props;
    const { ip } = route.params;
    const { phoneNumber, password, loading } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground blurRadius={1} source={require("../../assets/man2.png")} style={styles.image_design_1}>
          <BlurView intensity={0} tint="light" style={styles.inner_design}>
            <Text style={styles.pageTitle}>Login</Text>
            <View style={{ marginHorizontal: 20 }}>

              <Text>Phone Number</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Please enter your Phone number"
                autoCorrect={false}
                keyboardType="phone-pad"
                autoComplete="tel"
                value={phoneNumber}
                maxLength={13}
                onChangeText={(text) => {
                  this.setState({ phoneNumber: text });
                }}
              />

              <Text>Password</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Please enter password"
                secureTextEntry={true}
                autoComplete="password"
                value={password}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />
              <TouchableOpacity style={styles.submitBtn} onPress={() => { this.handleSubmit() }}>
                <Text style={styles.btnText}>
                  {loading ? "Please wait..." : "Login"}
                </Text>
              </TouchableOpacity>

              <Text
                style={styles.linkText}
                onPress={() => {
                  navigation.navigate("Login", {
                    ip: ip
                  });
                }}
              >
                Login With Email
              </Text>
              <Text
                style={styles.linkText}
                onPress={() => {
                  navigation.navigate("Register", {
                    ip: ip
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  image_design_1: {
    resizeMode: "cover",
    width: windowWidth,
    height: windowHeight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  inner_design: {
    width: windowWidth - 50,
    height: windowHeight / 1.9,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: "#000",
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
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85"
  },
  submitBtn: {
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
  text_design: {
    fontSize: 20,
    textDecorationStyle: "solid",
    textDecorationLine: 'underline',
    color: '#000000',
    letterSpacing: 2,
    paddingTop: 70,
    fontWeight: "bold",
  }
});

export default LoginPhone;
