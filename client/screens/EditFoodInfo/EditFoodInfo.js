// UserInputForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Alert} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Dropdown } from 'react-native-element-dropdown'
import {Dimensions} from 'react-native'
import axios from "axios";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const EditFoodInfo = ({navigation, route}) => {
    const {nameIntFace} = route.params
    const {idIntFace} = route.params
    const {expDateIntFace} = route.params
    const {quantityIntFace} = route.params
    const {weightIntFace} = route.params
    const {keyIntFace} = route.params
    const {email} = route.params
    const {phone} = route.params
    const {ip} = route.params
    const {port} = route.params
    const {points} = route.params
    const {userNName} = route.params

    //all data about food are available here 
    const [name, setName] = useState(nameIntFace);
    const [id, setId] = useState(idIntFace);
    const [quantity, setQuantity] = useState(quantityIntFace);
    const [weight, setWeight] = useState(weightIntFace);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [day, setDay] = useState(expDateIntFace[0]+expDateIntFace[1]);
    const [month, setMonth] = useState(expDateIntFace[3]+expDateIntFace[4]);
    const [year, setYear] = useState(expDateIntFace[6]+expDateIntFace[7]);


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
        if(keyIntFace != '0'){
            try{
                Alert.alert("Please confirm to Dete that food","",[
                    {
                        text: 'Cancel',
                        onPress: async () => {
                            var again_fechFood = `http://${ip}:${port}/api/auth/fetch/food/allFood/fetchFood`;
                            const {data} = await axios.post(
                                again_fechFood , 
                                {
                                    email: email,
                                    phone: phone
                                }
                            )
                            if(data.success){
                                console.log(data.message)
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
                        },
                    },
                    {
                        text: 'OK', 
                        onPress: async () => {
                            var deleteFood_url = `http://${ip}:${port}/api/auth/delete/food/api/deleteFood/deleteFood`;
                            const {data} = await axios.post(
                                deleteFood_url , 
                                {
                                    uName: userNName,
                                    deleteOrNot: true,
                                    foodId: idIntFace,
                                    foodKey: keyIntFace,
                                }
                            )
                            console.log(data)
                            if(data.success){
                                var again_fechFood = `http://${ip}:${port}/api/auth/fetch/food/allFood/fetchFood`;
                                const {data} = await axios.post(
                                    again_fechFood , 
                                    {
                                        email: email,
                                        phone: phone
                                    }
                                )
                                if(data.success){
                                    console.log(data.message)
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
                                Alert.alert("Deletion process failed, please try again!!!")
                            }
                        }
                    }
                ])
            }catch(error){
                console.log(error);
                Alert.alert("Your requests cant be processed!!!")
                var again_fechFood = `http://${ip}:${port}/api/auth/fetch/food/allFood/fetchFood`;
                const {data} = await axios.post(
                    again_fechFood , 
                    {
                        email: email,
                        phone: phone
                    }
                )
                if(data.success){
                    console.log(data.message)
                    navigation.navigate("MainInterface",{
                        email: email,
                        phone: phone, 
                        ip: ip, 
                        port: port,
                        foodData: data.message,
                        points: points,
                        userNName: userNName
                    })
                }else{
                    Alert.alert("Food fetching failed!!!")
                }
            }
        }else{
            Alert.alert("Your requests cant be processed!!!")
                var again_fechFood = `http://${ip}:${port}/api/auth/fetch/food/allFood/fetchFood`;
                const {data} = await axios.post(
                    again_fechFood , 
                    {
                        email: email,
                        phone: phone
                    }
                )
                if(data.success){
                    console.log(data.message)
                    navigation.navigate("MainInterface",{
                        email: email,
                        phone: phone, 
                        ip: ip, 
                        port: port,
                        foodData: data.message,
                        points: points,
                        userNName: userNName
                    })
                }else{
                    Alert.alert("Food fetching failed!!!")
                }
        }
    }

    const handleSubmit =  () => {
        // Add logic to handle form submission
        if(day<0 || day>31){
            alert(`please enter correct Date!!`)
        }else if(month<=0 || month>12){
            alert(`please enter correct month!!!`)
        }else if (year<=18|| year>99){
            alert(`please enter correct year!!!`)
        }else{
            Alert.alert("Please Confirm Info: ",`\nname:${name},\nid: ${id}, \nQuantity: ${quantity}, \nWeight: ${weight} ,\nExp_Date : ${day}/${month} /${year}` , [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log("I want to edit again!!!")
                    },
                },
                {
                    text: 'OK', 
                    onPress: async () => {
                        var editFood_url = `http://${ip}:${port}/api/auth/fetch/foodEdit/edit_foods/edit_Food`;
                        const {data} = await axios.post(
                            editFood_url , 
                            {
                                foodName: name,
                                foodId: id,
                                quantity: quantity,
                                weight: weight,
                                expDate: `${day}/${month}/${year}`,
                                email: email,
                                phone: phone,
                                beforeFoodName: nameIntFace,
                                beforeFoodId: idIntFace,
                                beforeQuantity: quantityIntFace,
                                beforeWeight: weightIntFace,
                                beforeExpDate: expDateIntFace
                            }
                        )
                        console.log(data.message)
                        if(data.success){
                            var again_fechFood = `http://${ip}:${port}/api/auth/fetch/food/allFood/fetchFood`;
                            const {data} = await axios.post(
                                again_fechFood , 
                                {
                                    email: email,
                                    phone: phone
                                }
                            )
                            if(data.success){
                                console.log(data.message)
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
                            Alert.alert("Food data can not be updated!!!")
                        }
                    },
                }]
            )
        }
    };
    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
        <View style={styles.headerContainer}>
            <Text style={[styles.headerText , {color: isDarkMode ? '#FFFFFF' : '#333333',}]}>FoodFlow</Text>
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
                    onChangeText={(text) => setId(text)}
                    placeholder="Enter Food ID"
                    keyboardType='number-pad'
                    editable={false}
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
                    value={quantity.toString()}
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
                    value={weight.toString()}
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

        <View style={{display: "flex", flexDirection:"row" ,justifyContent: "space-between"}}>
            <TouchableOpacity style={styles.submitButton} onPress={deleteReq}>
                <Text style={styles.submitButtonText}>Remove Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Edit</Text>
            </TouchableOpacity>
      </View>
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
    width: windowWidth/2-50
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EditFoodInfo;
