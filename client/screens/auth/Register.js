import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      userName: '',
      email: '',
      phoneNumber: '',
      password: '',
      loading: false,
    };
  }

  handleSubmit = async () => {
    const { name, userName, phoneNumber, email, password, loading } = this.state;

    if (!name || !userName || !phoneNumber || !email || !password) {
      Alert.alert('Please Fill All Fields');
      return;
    }

    this.setState({ loading: true });

    try {
      const reg_url = `http://${this.props.route.params.ip}:9090/api/auth/reg/user/register`;
      const { data } = await axios.post(reg_url, {
        name: name,
        user_name: userName,
        user_password: password,
        email: email,
        phone_number: phoneNumber,
      });

      if (data.success) {
        this.props.navigation.navigate('Login');
      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log('User failed to register from the frontend!!!');
    }

    this.setState({ loading: false });
  };

  render() {
    const { name, userName, email, phoneNumber, password, loading } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground blurRadius={1} source={require('../../assets/man2.png')} style={styles.imageDesign}>
          <View style={styles.innerDesign}>
            <Text style={styles.pageTitle}>Register</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text>Name</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Please Enter Your Name"
                value={name}
                onChangeText={(text) => this.setState({ name: text })}
              />

              <Text>User Name</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Please Enter Your User Name"
                value={userName}
                onChangeText={(text) => this.setState({ userName: text })}
              />

              <Text>Email</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Please Enter Your Email Address"
                autoCorrect={false}
                keyboardType="email-address"
                autoComplete="email"
                value={email}
                onChangeText={(text) => this.setState({ email: text })}
              />

              <Text>Phone Number</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Please Enter Your Phone Number"
                autoCorrect={false}
                keyboardType="phone-pad"
                autoComplete="tel"
                value={phoneNumber}
                maxLength={13}
                onChangeText={(text) => this.setState({ phoneNumber: text })}
              />

              <Text>Password</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Please Enter Your Password"
                secureTextEntry={true}
                autoComplete="password"
                value={password}
                onChangeText={(text) => this.setState({ password: text })}
              />

              <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit}>
                <Text style={styles.btnText}>{loading ? 'Please wait...' : 'Register'}</Text>
              </TouchableOpacity>

              <Text style={styles.linkText}>
                Already Registered? Please{' '}
                <Text
                  style={styles.loginLink}
                  onPress={() => {
                    this.props.navigation.navigate('Login', {
                      ip: this.props.route.params.ip,
                    });
                  }}
                >
                  LOGIN
                </Text>
              </Text>
            </View>
          </View>
          <Text style={styles.textDesign}>FoodFlow</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e1d5c9',
  },
  imageDesign: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDesign: {
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#000',
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e2225',
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#af9f85',
  },
  submitBtn: {
    backgroundColor: '#1e2225',
    height: 40,
    marginHorizontal: 25,
    marginTop: 20,
    borderRadius: 80,
    borderBottom: 20,
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '400',
  },
  linkText: {
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: 20,
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center',
  },
  loginLink: {
    color: 'red',
    fontStyle: 'normal',
    textDecorationLine: 'underline',
    textDecorationColor: '#000',
  },
  textDesign: {
    fontSize: 20,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: '#000000',
    letterSpacing: 2,
    paddingTop: 70,
    fontWeight: 'bold',
  },
});

export default Register;
