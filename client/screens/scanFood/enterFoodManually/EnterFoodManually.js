// UserInputForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Dropdown } from 'react-native-element-dropdown';
import {Dimensions} from 'react-native';
import axios from "axios";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const EnterFoodManually = ({navigation , route}) => {

  //all data about food are available here 
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {email} = route.params
  const {phone} = route.params
  const {ip} = route.params
  const {port} = route.params
  const {points} = route.params
  const {userNName} = route.params

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleDayChange = (text) => {
    // Add any validation logic if needed
    setDay(text);
  };
  const handleMonthChange = (text) => {
    // Add any validation logic if needed
    setMonth(text);
  };
  const handleYearChange = (text) => {
    // Add any validation logic if needed
    setYear(text);
  };

  const deleteReq = async ()=>{
    try{
      var deleteFood_url = `http://${ip}:${port}/api/auth/register/food/UserFood/registerFood`;
      const data = await axios.post(
        deleteFood_url , 
        {
            email: email,
            phone: phone ,
            deleteOrNot: true,
        }
    )

    }catch(error){
      console.log(error);
      Alert.alert("Your requests cant be processed!!!")
    }
  }

  const handleSubmit = async() => {
    // Add logic to handle form submission
    const currentYear = new Date().getFullYear();
    if (year.length<=4 || day.length<2 || month.length<2){
      alert(`Please enter the expiry date in : \n"01/01/2024" \nformat`)
    }
    if(name=="" || quantity=="" || weight=="" || day=="" || month=="" || year==""){
      alert(`please enter name, id, quantity, weight , day,month,year`)
    }else{
        console.log(port)
        try{
              var regFood_url = `http://${ip}:${port}/api/auth/register/food/UserFood/registerFood`;
              const data = await axios.post(
                  regFood_url , 
                  {
                      email: email,
                      phone: phone ,
                      foodName: name , 
                      quantity: quantity,
                      weight: weight,
                      expDate: `${day}/${month}/${year[2]+year[3]}`
                  }
              )
              //console.log("checking added or not: ", data.data.success)
              //console.log('Form submitted:', { name, id, quantity, weight , day,month,year});
              if(data.data.success){
                var foodFetch_url = `http://${ip}:${port}/api/auth/fetch/food/allFood/fetchFood`;
                const {data} = await axios.post(
                    foodFetch_url , 
                    {
                        email: email,
                        phone: phone
                    }
                );
                if(data.success){
                  navigation.navigate("MainInterface",{
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
                Alert.alert("please fill all the data!!!")
              }
        }catch(error){
          console.log(error)
        }
    };
  }
  return (
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>FoodFlow</Text>
        <SwitchSelector
          style={styles.switchSelector}
          options={[
            { label: 'Light', value: false },
            { label: 'Dark', value: true },
          ]}
          initial={isDarkMode ? 1 : 0}
          onPress={(value) => setIsDarkMode(value)}
        />
      </View>

      <View style={styles.middleInput}>
          <View style={styles.middleInputCard}>
              <View style={styles.areaBox}> 
                <View style={{
                  height: 50,
                  display: "flex",
                  justifyContent:"center",
                }}>
                  <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                  }}>FoodName:</Text>
                </View>
                <TextInput
                  style={{
                    height: 50,
                    borderColor: isDarkMode ? '#555555' : 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: 15,
                    paddingHorizontal: 15,
                    backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    width: windowWidth- (windowWidth/2.7)
                  }}
                  value={name}
                  onChangeText={(text) => setName(text)}
                  placeholder="Enter Food Name"
                />
              </View>

              <View style={styles.areaBox}>
                <View style={{
                  height: 50,
                  display: "flex",
                  justifyContent:"center",
                }}>
                  <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                  }}
                  >FoodID:</Text>
                </View>
                <TextInput
                  style={{
                    height: 50,
                    borderColor: isDarkMode ? '#555555' : 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: 15,
                    paddingHorizontal: 15,
                    backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    width: windowWidth- (windowWidth/2.7)
                  }}
                  value={id}
                  editable={false}
                  onChangeText={(text) => setId(text)}
                  placeholder="FoodId will be set by database!!!"
                  keyboardType='number-pad'
                />
              </View>

            <View style={styles.areaBox}>
              <View style={{
                height: 50,
                display: "flex",
                justifyContent:"center",
              }}>
                <Text style={{
                  fontSize: 14,
                  color: isDarkMode ? '#FFFFFF' : '#333333',
                  marginBottom: 5,
                }}
                >Quantity:</Text>
              </View>
              <TextInput
                style={{
                  height: 50,
                  borderColor: isDarkMode ? '#555555' : 'gray',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginBottom: 15,
                  paddingHorizontal: 15,
                  backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
                  color: isDarkMode ? '#FFFFFF' : '#333333',
                  width: windowWidth- (windowWidth/2.7)
                }}
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
                placeholder="Enter Food Quantity"
                keyboardType='number-pad'
              />
            </View>

            <View style={styles.areaBox}>
              <View style={{
                height: 50,
                display: "flex",
                justifyContent:"center",
              }}>
                <Text style={{
                  fontSize: 14,
                  color: isDarkMode ? '#FFFFFF' : '#333333',
                  marginBottom: 5,
                }}
                >Weight:</Text>
              </View>
              <TextInput
                style={{
                  height: 50,
                  borderColor: isDarkMode ? '#555555' : 'gray',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginBottom: 15,
                  paddingHorizontal: 15,
                  backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
                  color: isDarkMode ? '#FFFFFF' : '#333333',
                  width: windowWidth- (windowWidth/2.7)
                }}
                value={weight}
                onChangeText={(text) => setWeight(text)}
                placeholder="Enter Food Weight"
                keyboardType='number-pad'
              />
            </View>
          
            <View style={[styles.areaBox]}>
              <View style={{
                  height: 70,
                  display: "flex",
                  justifyContent:"center",
                }}>
                <Text style={{
                  fontSize: 14,
                  color: isDarkMode ? '#FFFFFF' : '#333333',
                  marginBottom: 5,
                }}
                >EXP Date:</Text>
              </View>
              <View style={styles.inp_container}>
                  <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                  }}>Day:</Text>
                  <TextInput
                    style={[styles.inputDate,{color: isDarkMode ? '#FFFFFF' : '#333333',}]}
                    keyboardType="numeric"
                    maxLength={2}
                    value={day}
                    onChangeText={handleDayChange}
                  />

                  <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                  }}>/Month:</Text>
                  <TextInput
                    style={[styles.inputDate,{color: isDarkMode ? '#FFFFFF' : '#333333',}]}
                    keyboardType="numeric"
                    maxLength={2}
                    value={month}
                    onChangeText={handleMonthChange}
                  />

                  <Text style={{
                    fontSize: 14,
                    color: isDarkMode ? '#FFFFFF' : '#333333',
                    marginBottom: 5,
                  }}>/Year:</Text>
                  <TextInput
                    style={[styles.inputDate,{color: isDarkMode ? '#FFFFFF' : '#333333',}]}
                    keyboardType="numeric"
                    maxLength={4}
                    value={year}
                    onChangeText={handleYearChange}
                  />
          </View>
            </View>
          </View>
      </View>
      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Edit</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  containerLight: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    width: windowWidth, 
    height:windowHeight
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    width: windowWidth, 
    height:windowHeight
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    height: 70,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  middleInput:{
    width:"100%",
    height: windowHeight-200,
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",

  },
  middleInputCard:{

  },
  areaBox:{
    display: "flex",
    justifyContent:"space-between",
    flexDirection:"row"
  },
  inp_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    height: 25,
  },
  inputDate: {
    borderBottomWidth: 1,
    width: 40,
    textAlign: 'center',
  },
  switchSelector: {
    width: 120,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EnterFoodManually;
